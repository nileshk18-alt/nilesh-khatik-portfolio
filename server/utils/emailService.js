import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

let cachedTransporter = null;

/**
 * Configure and return the Nodemailer transporter.
 * Strictly respects USE_ETHEREAL:
 * - If USE_ETHEREAL=false (default): Uses real Gmail SMTP and NEVER falls back to Ethereal.
 * - If USE_ETHEREAL=true: Uses Ethereal test inbox for development.
 * 
 * Never exposes credentials to frontend code.
 */
export async function getTransporter() {
  if (cachedTransporter) {
    return cachedTransporter;
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    USE_ETHEREAL,
  } = process.env;

  const isEtherealEnabled = String(USE_ETHEREAL).toLowerCase() === 'true';

  // 1. If USE_ETHEREAL is explicitly true, initialize test account
  if (isEtherealEnabled) {
    console.log('[Email] USE_ETHEREAL=true detected. Initializing Ethereal test account...');
    const testAccount = await nodemailer.createTestAccount();
    cachedTransporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
    cachedTransporter.isEthereal = true;
    console.log('[Email] Ethereal test account ready: %s', testAccount.user);
    return cachedTransporter;
  }

  // 2. Real SMTP configuration (USE_ETHEREAL is false)
  // Strip any accidental spaces from App Password (e.g., Google App Passwords shown in 4-letter groups)
  const cleanPass = (SMTP_PASS || '').replace(/\s+/g, '');
  const cleanUser = (SMTP_USER || '').trim();

  if (!cleanUser || !cleanPass) {
    throw new Error('SMTP credentials are missing in .env. Please set SMTP_USER and SMTP_PASS.');
  }

  const host = (SMTP_HOST || 'smtp.gmail.com').trim();
  const port = parseInt(SMTP_PORT || '587', 10);
  const isSecure = String(SMTP_SECURE).toLowerCase() === 'true' || port === 465;

  console.log(`[Email] Gmail SMTP configuration loaded (Host: ${host}, Port: ${port}, User: ${cleanUser})`);

  // Configure transport for Gmail / standard SMTP
  if (host.includes('gmail.com')) {
    cachedTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: cleanUser,
        pass: cleanPass,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });
  } else {
    cachedTransporter = nodemailer.createTransport({
      host,
      port,
      secure: isSecure,
      auth: {
        user: cleanUser,
        pass: cleanPass,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });
  }

  cachedTransporter.isEthereal = false;
  return cachedTransporter;
}

/**
 * Startup SMTP Connection Verification (FIX 5).
 * Tests connectivity and authentication on server startup.
 * Non-blocking: will never crash the server if network or credentials are temporarily unavailable.
 */
export async function verifySmtpConnection() {
  try {
    const isEthereal = String(process.env.USE_ETHEREAL).toLowerCase() === 'true';
    if (isEthereal) {
      console.log('[Email] Running in test mode (USE_ETHEREAL=true)');
      return;
    }

    const transporter = await getTransporter();
    await transporter.verify();
    console.log('[Email] Gmail SMTP connection verified successfully. Ready to send emails.');
  } catch (error) {
    // Report clear, safe diagnostics without terminating the server
    console.warn('[Email Warning] Gmail SMTP verification failed:', error.message);
    console.warn('[Email Warning] Please verify 2-Step Verification and your Google App Password in .env.');
  }
}

/**
 * Send contact form submission email to Nilesh Khatik.
 * 
 * @param {Object} data - Sanitized contact data { name, email, subject, message }
 * @param {string} clientIp - Client IP address
 * @returns {Promise<Object>} Delivery confirmation details
 */
export async function sendContactEmail({ name, email, subject, message, clientIp }) {
  const recipient = (process.env.RECIPIENT_EMAIL || 'nileshkhatik700@gmail.com').trim();
  const senderEmail = (process.env.SMTP_FROM || process.env.SMTP_USER || recipient).trim();
  const transporter = await getTransporter();

  // Subject requirement: "Portfolio Contact: [Visitor Subject]"
  const formattedSubject = `Portfolio Contact: ${subject}`;

  // Plain text body requirement
  const textBody = `New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
Sent via Nilesh Khatik Developer Portfolio Contact Form
Client IP: ${clientIp || 'Unknown'}
Date: ${new Date().toISOString()}
`;

  // Clean, professional HTML body matching portfolio aesthetics
  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #FFFDF7; color: #18181B; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #EFEBE0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.04); }
    .header { background: #FF5C35; color: #ffffff; padding: 20px 24px; }
    .header h2 { margin: 0; font-size: 20px; font-weight: 700; }
    .content { padding: 24px; }
    .field { margin-bottom: 16px; }
    .label { font-size: 11px; font-weight: 700; text-transform: uppercase; color: #71717A; letter-spacing: 0.5px; }
    .value { font-size: 15px; font-weight: 600; color: #18181B; margin-top: 4px; }
    .message-box { background: #FAF7EE; border: 1px solid #EFEBE0; border-radius: 12px; padding: 16px; font-size: 14px; line-height: 1.6; color: #3F3F46; white-space: pre-wrap; margin-top: 6px; }
    .footer { padding: 16px 24px; background: #FAF7EE; border-top: 1px solid #EFEBE0; font-size: 12px; color: #71717A; text-align: center; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📬 New Contact Form Submission</h2>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Email</div>
        <div class="value"><a href="mailto:${email}" style="color: #FF5C35; text-decoration: none;">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${subject}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
      </div>
    </div>
    <div class="footer">
      Sent from your portfolio website at <strong>${new Date().toLocaleString()}</strong>.<br/>
      Click <strong>Reply</strong> in your email client to respond directly to <strong>${name}</strong> (${email}).
    </div>
  </div>
</body>
</html>
`;

  // Build mail options:
  // - from: Authenticated user address (required by Gmail SMTP)
  // - to: Nilesh's inbox (nileshkhatik700@gmail.com)
  // - replyTo: Visitor's email address so Nilesh can click Reply
  const mailOptions = {
    from: `"${name} (Portfolio)" <${senderEmail}>`,
    to: recipient,
    replyTo: `"${name}" <${email}>`,
    subject: formattedSubject,
    text: textBody,
    html: htmlBody,
  };

  const info = await transporter.sendMail(mailOptions);

  if (transporter.isEthereal) {
    const previewUrl = nodemailer.getTestMessageUrl(info);
    return {
      accepted: info.accepted,
      messageId: info.messageId,
      previewUrl,
      isEthereal: true,
    };
  }

  return {
    accepted: info.accepted,
    messageId: info.messageId,
    isEthereal: false,
  };
}
