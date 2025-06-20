export const buildWaitlistEmail = ({ name, message }) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #ffffff; padding: 40px; border-radius: 12px; border: 1px solid #eee;">
    <div style="text-align: center;">
      <h1 style="color: #007848; margin-bottom: 10px;">Welcome to the Waitlist 🎉</h1>
      <p style="font-size: 16px; color: #000000;">We're excited to have you with us!</p>
    </div>

    <div style="margin-top: 30px;">
      <p style="font-size: 16px; color: #000000;">Hi <strong>${name}</strong>,</p>
      <p style="font-size: 16px; color: #000000;">
        ${message}
      </p>
    </div>

    <div style="margin: 30px 0; text-align: center;">
      <a href="https://yourdomain.com" style="display: inline-block; padding: 12px 24px; background-color: #007848; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: bold;">
        Visit Our Website
      </a>
    </div>

    <div style="text-align: center; margin: 20px 0;">
      <span style="font-size: 14px; color: #000000;">
        📸 Follow us on Instagram
        <a href="https://instagram.com/trysvwen" target="_blank" style="color: #007848; font-weight: bold; text-decoration: none;">
          @trysvwen
        </a>
      </span>
    </div>

    <hr style="border: none; border-top: 1px solid #ddd; margin: 40px 0;" />

    <p style="font-size: 12px; color: #666; text-align: center;">
      You’re receiving this email because you joined the waitlist at <strong>Svwen</strong>.<br />
      Contact us at <b>info@svwen.com</b>
    </p>
  </div>
`;
