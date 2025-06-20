import { Personal } from "../models/Personal.js";
import logger from "../config/logger.js";
import { Resend } from "resend";
import { RESEND_API_KEY } from "../config/constants.js";
import { buildWaitlistEmail } from "../emails/waitlistEmail.js";

const resend = new Resend(RESEND_API_KEY);

export const personalController = async (req, res, data) => {
  try {
    const existing = await Personal.findOne({ email: data.email });

    if (existing) {
      return res
        .status(409)
        .json({ error: "Already registered for waitlist" });
    }

    const saved = await Personal.create({
      name: data.name,
      email: data.email,
      occupancy: data.occupancy,
    });

    await resend.emails.send({
      from: "Waitlist <no-reply@svwen.com>",
      to: data.email,
      subject: "You’ve joined the waitlist!",
      html: buildWaitlistEmail({
        name: data.name,
        message: `Thanks for joining the wailtlist of Mail Pilot as a <strong>${data.occupancy}</strong>. We'll keep you updated as we launch. For now,`,
      }),
    });

    return res.status(201).json({ message: "Successfully joined waitlist" });
  } catch (error) {
    logger.error({ error }, "Failed to process personal waitlist entry");
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
