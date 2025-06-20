import { Router } from "express";
import logger from "../config/logger.js";
import { waitlistSchema } from '../validators/waitlistSchema.js';
import { companyController } from "../controllers/companyController.js";
import { personalController } from "../controllers/personalController.js";
import rateLimiter from "../middlewares/rateLimiter.js";
import isDisposableEmail from "../middlewares/disposableMail.js";

const waitlistRouter = Router();

waitlistRouter.post('/', rateLimiter ,async (req, res) => {
  const result = waitlistSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: 'Invalid form submission',
    });
  }

  const { formType } = result.data;

  if(isDisposableEmail(result.data.email)){
    return res.status(400).json({
      error: 'Disposable emails not allowed',
    });
  }

  try {
    if (formType === 'personal') {
      return await personalController(req, res, result.data);
    }
    if (formType === 'company') {
      return await companyController(req, res, result.data);
    }
  } catch (error) {
    logger.error({ error }, 'Error handling waitlist submission');
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default waitlistRouter;
