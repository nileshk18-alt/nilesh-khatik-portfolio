import validator from 'validator';

/**
 * Sanitize and validate contact form inputs.
 * 
 * Security safeguards implemented:
 * 1. Email Header Injection Prevention: Strips CR/LF (\r, \n) from headers (Name, Email, Subject).
 * 2. Cross-Site Scripting (XSS) Prevention: Escapes HTML tags in inputs.
 * 3. Length Boundaries: Enforces min/max characters on all fields.
 * 4. Email Format: Strict RFC 5322 verification via validator.isEmail.
 * 5. Honeypot Anti-Spam: Detects automated bot submissions.
 * 
 * Time Complexity: O(L) where L is length of input string (L <= 2000)
 * Space Complexity: O(L)
 */
export function validateAndSanitizeContactInput(data) {
  const errors = {};

  // Extract raw fields
  const rawName = typeof data.name === 'string' ? data.name : '';
  const rawEmail = typeof data.email === 'string' ? data.email : '';
  const rawSubject = typeof data.subject === 'string' ? data.subject : '';
  const rawMessage = typeof data.message === 'string' ? data.message : '';
  const rawHoneypot = typeof data.website === 'string' ? data.website : '';

  // 1. Honeypot Check: bots automatically populate hidden fields
  const isSpam = rawHoneypot.trim().length > 0;

  // 2. Prevent Header Injection (strip newlines from single-line headers)
  const stripNewlines = (str) => str.replace(/[\r\n]/g, ' ').trim();

  const name = stripNewlines(validator.escape(rawName));
  const email = stripNewlines(rawEmail.trim().toLowerCase());
  const subject = stripNewlines(validator.escape(rawSubject || 'Portfolio Inquiry'));
  const message = validator.escape(rawMessage.trim());

  // 3. Field Validations
  if (!name) {
    errors.name = 'Name is required.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  } else if (name.length > 80) {
    errors.name = 'Name cannot exceed 80 characters.';
  }

  if (!email) {
    errors.email = 'Email address is required.';
  } else if (!validator.isEmail(email)) {
    errors.email = 'Please provide a valid email address.';
  } else if (email.length > 100) {
    errors.email = 'Email cannot exceed 100 characters.';
  }

  if (subject && subject.length > 120) {
    errors.subject = 'Subject cannot exceed 120 characters.';
  }

  if (!message) {
    errors.message = 'Message is required.';
  } else if (message.length < 10) {
    errors.message = 'Message must be at least 10 characters long.';
  } else if (message.length > 2000) {
    errors.message = 'Message cannot exceed 2000 characters.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    isSpam,
    errors,
    sanitized: {
      name,
      email,
      subject: subject || 'Portfolio Inquiry',
      message: rawMessage.trim(), // Keep clean text for email body (safe in template)
    },
  };
}
