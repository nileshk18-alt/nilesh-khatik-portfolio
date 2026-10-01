/**
 * Contact & Communication Utility Functions
 * 
 * Centralized, production-grade helpers to construct direct Gmail Compose 
 * and WhatsApp messaging URLs without relying on the OS default mail application (mailto:).
 * 
 * All user inputs are safely encoded using encodeURIComponent() to handle:
 * spaces, &, ?, #, /, +, quotes, emojis, and multiline formatting.
 * 
 * Time Complexity: O(n) where n is total character length of parameters
 * Space Complexity: O(n) for the constructed URL string
 */

/**
 * Builds a direct Gmail Compose URL in the browser.
 * Format: https://mail.google.com/mail/?view=cm&fs=1&to=EMAIL&su=SUBJECT&body=BODY
 * 
 * @param {Object} options
 * @param {string} options.to - Recipient email address
 * @param {string} [options.subject=''] - Email subject line
 * @param {string} [options.body=''] - Pre-filled email body text
 * @returns {string} Fully encoded Gmail compose URL
 */
export const createGmailComposeLink = ({ to = '', subject = '', body = '' } = {}) => {
  const recipient = String(to || '').trim();
  const su = String(subject || '').trim();
  const text = String(body || '').trim();

  return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&su=${encodeURIComponent(su)}&body=${encodeURIComponent(text)}`;
};

/**
 * Builds a formatted body and creates a Gmail Compose link for contact form inquiries.
 * 
 * @param {Object} options
 * @param {string} options.name - Sender's name
 * @param {string} options.email - Sender's email
 * @param {string} options.subject - Inquiry subject
 * @param {string} options.message - Inquiry message
 * @param {string} options.recipient - Target portfolio owner email
 * @returns {string} Fully encoded Gmail compose URL
 */
export const createContactGmailLink = ({ name = '', email = '', subject = '', message = '', recipient = '' } = {}) => {
  const body = [
    `Name: ${String(name || '').trim()}`,
    `Email: ${String(email || '').trim()}`,
    ``,
    `Message:`,
    `${String(message || '').trim()}`,
  ].join('\n');

  return createGmailComposeLink({
    to: recipient,
    subject: String(subject || '').trim(),
    body,
  });
};

/**
 * Formats a clean, readable text template for WhatsApp inquiries.
 * 
 * @param {Object} options
 * @param {string} options.name - Sender's name
 * @param {string} options.email - Sender's email
 * @param {string} options.subject - Inquiry subject
 * @param {string} options.message - Inquiry message
 * @returns {string} Plain text formatted message
 */
export const createWhatsAppMessage = ({ name = '', email = '', subject = '', message = '' } = {}) => {
  const trimmedSubject = String(subject || '').trim();
  
  const lines = [
    `Hello Nilesh,`,
    ``,
    `Name: ${String(name || '').trim()}`,
    `Email: ${String(email || '').trim()}`,
    trimmedSubject ? `Subject: ${trimmedSubject}` : null,
    ``,
    `Message:`,
    `${String(message || '').trim()}`,
  ].filter(line => line !== null);

  return lines.join('\n');
};

/**
 * Builds a direct WhatsApp click-to-chat URL with pre-filled message text.
 * 
 * @param {Object} options
 * @param {string} options.phone - Clean digits phone number (e.g. '919511866805')
 * @param {string} options.message - Text message to pre-fill
 * @returns {string} Fully encoded WhatsApp URL
 */
export const createWhatsAppLink = ({ phone = '', message = '' } = {}) => {
  const cleanPhone = String(phone || '').replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message || '')}`;
};

// Aliases for convenience
export const createContactWhatsAppMessage = createWhatsAppMessage;
export const createContactWhatsAppLink = createWhatsAppLink;

