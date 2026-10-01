import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { validateAndSanitizeContactInput } from '../utils/validation.js';
import { sendContactEmail } from '../utils/emailService.js';

const router = Router();

/**
 * Rate Limiter for Contact Endpoint:
 * - Production: 5 requests per 15 minutes per IP (prevents spam and mail server abuse)
 * - Development: 50 requests per 15 minutes per IP (permits local testing)
 */
const contactRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: process.env.NODE_ENV === 'production' ? 5 : 50,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages sent from this IP address. Please wait 15 minutes before trying again.',
  },
});

/**
 * POST /api/contact
 * Handles contact form submissions with safe logging and real email delivery.
 */
router.post('/', contactRateLimiter, async (req, res) => {
  console.log('[Contact] Request received');

  try {
    const clientIp = req.ip || req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // 1. Validate and Sanitize Inputs
    console.log('[Contact] Validating request');
    const validationResult = validateAndSanitizeContactInput(req.body);

    if (!validationResult.isValid) {
      console.warn('[Contact] Validation failed:', Object.keys(validationResult.errors).join(', '));
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please check the provided inputs.',
        errors: validationResult.errors,
      });
    }

    // 2. Anti-spam Honeypot Check:
    // Bots automatically populate hidden fields; return silent success without sending email.
    if (validationResult.isSpam) {
      console.warn(`[Contact] Spam detected via honeypot field from IP: ${clientIp}. Silently dropping request.`);
      return res.status(200).json({
        success: true,
        message: 'Message sent successfully.',
      });
    }

    // 3. Send email via configured SMTP (Gmail)
    console.log('[Contact] Sending email');
    const deliveryResult = await sendContactEmail({
      name: validationResult.sanitized.name,
      email: validationResult.sanitized.email,
      subject: validationResult.sanitized.subject,
      message: validationResult.sanitized.message,
      clientIp,
    });

    console.log(`[Contact] Email sent successfully (Message ID: ${deliveryResult.messageId})`);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully.',
      deliveryId: deliveryResult.messageId,
      previewUrl: deliveryResult.previewUrl || undefined,
    });
  } catch (error) {
    // FIX 4: Safe error logging - NEVER log passwords, secrets, or tokens
    console.error('[Contact] Email sending failed:', error.message || 'Unknown error');

    return res.status(500).json({
      success: false,
      message: 'Unable to send message. Please try again later or contact directly at nileshkhatik700@gmail.com.',
    });
  }
});

export default router;
