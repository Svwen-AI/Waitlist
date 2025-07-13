import { Company } from "../models/Company.js";
import logger from "../config/logger.js";
import { Resend } from "resend";
import { RESEND_API_KEY } from "../config/constants.js";
import { buildWaitlistEmail } from "../emails/waitlistEmail.js";

const resend = new Resend(RESEND_API_KEY);

export const companyController = async (req, res, data) => {
  try {
    const existing = await Company.findOne({ email: data.email });

    if (existing) {
      return res
        .status(409)
        .json({ error: "Already registered for waitlist" });
    }

    const saved = await Company.create({
      name: data.name,
      email: data.email,
      companyName: data.companyName,
      teamSize: data.teamSize,
    });

    const mail = await resend.emails.send({
      from: "Waitlist <no-reply@svwen.com>",
      to: data.email,
      subject: "You’ve joined the waitlist!",
      html: buildWaitlistEmail({
        name: data.name,
        message: `Thanks for joining the Svwen Mail waitlist on the behalf of <strong>${data.companyName}</strong>. We'll update you soon on the launch. For now,`,
      }),
    });

    return res.status(201).json({ message: "Successfully joined waitlist" });
  } catch (error) {
    logger.error({ error }, "Failed to process company waitlist entry");
    console.error(error)
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
