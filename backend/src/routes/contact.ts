import { Router, Request, Response } from 'express';
import { Resend } from 'resend';

const router = Router();

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'majf2704@gmail.com';
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'onboarding@resend.dev';

router.post('/', async (req: Request, res: Response) => {
  try {
    if (!RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not configured');
      return res.status(500).json({ error: 'Email service not configured' });
    }

    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const resend = new Resend(RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: CONTACT_FROM_EMAIL,
      to: [CONTACT_TO_EMAIL],
      subject: `[Portafolio] ${subject}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0c0f0f; border-radius: 16px; overflow: hidden; border: 1px solid rgba(0,255,194,0.15);">
          <div style="background: linear-gradient(135deg, #00ffc2 0%, #00e1ab 100%); padding: 24px 32px;">
            <h1 style="margin: 0; font-size: 20px; color: #003828; font-weight: 700;">Nuevo mensaje de contacto</h1>
          </div>
          <div style="padding: 32px;">
            <div style="margin-bottom: 24px; padding: 16px; background: rgba(255,255,255,0.04); border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
              <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #00ffc2; font-weight: 600;">De</p>
              <p style="margin: 0; font-size: 16px; color: #e2e2e2; font-weight: 500;">${name}</p>
              <p style="margin: 4px 0 0; font-size: 14px; color: #83958c;">${email}</p>
            </div>
            <div style="margin-bottom: 24px; padding: 16px; background: rgba(255,255,255,0.04); border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
              <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #00ffc2; font-weight: 600;">Asunto</p>
              <p style="margin: 0; font-size: 16px; color: #e2e2e2;">${subject}</p>
            </div>
            <div style="padding: 16px; background: rgba(255,255,255,0.04); border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
              <p style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #00ffc2; font-weight: 600;">Mensaje</p>
              <p style="margin: 0; font-size: 15px; color: #e2e2e2; line-height: 1.7; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
          <div style="padding: 16px 32px; border-top: 1px solid rgba(255,255,255,0.06); text-align: center;">
            <p style="margin: 0; font-size: 12px; color: #3a4a43;">Enviado desde tu portafolio</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.json({ success: true, messageId: data?.id });
  } catch (error) {
    console.error('Contact route error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
