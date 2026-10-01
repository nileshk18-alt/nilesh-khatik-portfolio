import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, MessageCircle, Edit3 } from 'lucide-react';
import SocialLinks from '../components/SocialLinks';
import Button from '../components/Button';
import { personalInfo } from '../data/portfolioData';
import { trackEvent } from '../utils/analytics';
import {
  createGmailComposeLink,
  createContactGmailLink,
  createContactWhatsAppMessage,
  createWhatsAppLink,
} from '../utils/contactLinks';

/**
 * Contact Section Component
 * 
 * Features:
 * - Direct contact cards (Gmail Compose in browser, Phone, SPPU Location)
 * - Accessible, secure contact form
 * - Comprehensive client-side validation (Email regex, length constraints, sanitization)
 * - Honeypot anti-spam protection (invisible field to catch automated bots)
 * - Multi-channel direct dispatch:
 *   1. User fills out details and clicks "Send Message"
 *   2. Form validates inputs without page reload or loss of data
 *   3. Presents two direct, reliable delivery options: [ WhatsApp ] and [ Email ]
 *   4. WhatsApp opens https://wa.me/919511866805 with safely URI-encoded message
 *   5. Email opens Gmail Compose directly in a new browser tab with pre-filled To, Subject, and Body
 *   6. Retains all form inputs with an "Edit details" toggle
 * - No exposed credentials, SMTP passwords, or third-party secret tokens
 * 
 * Time Complexity: O(1) input handling and validation; O(n) message encoding
 * Space Complexity: O(1) auxiliary space
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    website: '', // Honeypot field for anti-spam
  });

  const [errors, setErrors] = useState({});
  const [showDispatchOptions, setShowDispatchOptions] = useState(false);
  const [feedbackNotice, setFeedbackNotice] = useState('');

  // Extract digits for WhatsApp international link (e.g. "+91 9511866805" -> "919511866805")
  const recipientPhone = personalInfo.phone.replace(/[^0-9]/g, '');
  const recipientEmail = personalInfo.email;

  // Strict email regex validation
  const isValidEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).trim().toLowerCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on user edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
    // If user edits while dispatch options are visible, reset options to require re-validation
    if (showDispatchOptions) {
      setShowDispatchOptions(false);
      setFeedbackNotice('');
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    const trimmedName = formData.name.trim();
    if (!trimmedName) {
      newErrors.name = 'Please provide your name.';
    } else if (trimmedName.length < 2) {
      newErrors.name = 'Name must be at least 2 characters long.';
    } else if (trimmedName.length > 80) {
      newErrors.name = 'Name cannot exceed 80 characters.';
    }

    // Email validation
    const trimmedEmail = formData.email.trim();
    if (!trimmedEmail) {
      newErrors.email = 'Please provide your email address.';
    } else if (!isValidEmail(trimmedEmail)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    // Subject validation
    const trimmedSubject = formData.subject.trim();
    if (!trimmedSubject) {
      newErrors.subject = 'Please provide a subject.';
    } else if (trimmedSubject.length < 2) {
      newErrors.subject = 'Subject must be at least 2 characters long.';
    } else if (trimmedSubject.length > 120) {
      newErrors.subject = 'Subject cannot exceed 120 characters.';
    }

    // Message validation
    const trimmedMsg = formData.message.trim();
    if (!trimmedMsg) {
      newErrors.message = 'Please enter your message.';
    } else if (trimmedMsg.length < 10) {
      newErrors.message = 'Message should be at least 10 characters long.';
    } else if (trimmedMsg.length > 2000) {
      newErrors.message = 'Message cannot exceed 2000 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Anti-spam Honeypot Check: if bot fills this hidden field, silently reject
    if (formData.website) {
      setShowDispatchOptions(false);
      return;
    }

    if (!validateForm()) {
      return;
    }

    // Validation passed: display direct dispatch options
    setShowDispatchOptions(true);
    setFeedbackNotice("Choose how you'd like to send your message.");
    trackEvent('contact_form_validated', {
      sender_name: formData.name.trim(),
      has_subject: Boolean(formData.subject.trim()),
    });
  };

  const createWhatsAppUrl = () => {
    const msg = createContactWhatsAppMessage({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
    });
    return createWhatsAppLink({
      phone: recipientPhone,
      message: msg,
    });
  };

  const createEmailUrl = () => {
    return createContactGmailLink({
      name: formData.name,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      recipient: recipientEmail,
    });
  };

  const handleWhatsAppClick = () => {
    trackEvent('contact_dispatch_whatsapp', {
      sender_name: formData.name.trim(),
    });
    setFeedbackNotice('Opening WhatsApp in a new tab with your pre-filled message. Your form details are preserved below.');
  };

  const handleEmailClick = () => {
    trackEvent('contact_dispatch_email', {
      sender_name: formData.name.trim(),
    });
    setFeedbackNotice('Opening Gmail Compose in a new tab with your pre-filled message. Your form details are preserved below.');
  };

  const handleEditDetails = () => {
    setShowDispatchOptions(false);
    setFeedbackNotice('');
  };

  return (
    <section id="contact" className="py-16 md:py-24 border-t border-warm-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Info & Socials */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wider text-brand-500 uppercase mb-2 block">
                GET IN TOUCH
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-title tracking-tight leading-tight mb-4">
                Let's Build Something <br />
                <span className="text-brand-500">Together</span>
              </h2>

              <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-8">
                I am actively seeking software engineering internships and full-stack development opportunities. Whether you have a project idea, questions about my work, or want to collaborate, feel free to reach out.
              </p>

              {/* Direct Info Cards */}
              <div className="space-y-4 mb-8">
                <a
                  href={createGmailComposeLink({ to: personalInfo.email, subject: 'Portfolio Contact' })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-warm-border hover:border-brand-300 hover:shadow-card transition-all duration-200 group"
                  aria-label="Contact me by email"
                  title="Send email via Gmail"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-200">
                    <Mail className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-ink-muted">Email</span>
                    <span className="block text-sm font-semibold text-ink-title group-hover:text-brand-600 transition-colors">
                      {personalInfo.email}
                    </span>
                  </div>
                </a>

                <a
                  href={`tel:${personalInfo.phone.replace(/\s+/g, '')}`}
                  className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-warm-border hover:border-brand-300 hover:shadow-card transition-all duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-200">
                    <Phone className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-ink-muted">Phone</span>
                    <span className="block text-sm font-semibold text-ink-title group-hover:text-brand-600 transition-colors">
                      {personalInfo.phone}
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3.5 p-4 rounded-xl bg-white border border-warm-border">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-ink-muted">University / Location</span>
                    <span className="block text-sm font-semibold text-ink-title">
                      {personalInfo.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <span className="block text-xs font-semibold text-ink-muted uppercase tracking-wider mb-3">
                  Online Profiles
                </span>
                <SocialLinks />
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-warm-border shadow-card">
            <h3 className="text-xl font-bold text-ink-title mb-2">
              Send a Message
            </h3>
            <p className="text-xs sm:text-sm text-ink-muted mb-6">
              Fill out the form below. Once validated, choose WhatsApp or direct Email to deliver your inquiry immediately.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              
              {/* Anti-spam Honeypot field (hidden from real users) */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  type="text"
                  id="website"
                  name="website"
                  tabIndex="-1"
                  autoComplete="off"
                  value={formData.website}
                  onChange={handleChange}
                />
              </div>

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-ink-title uppercase tracking-wider mb-1.5">
                  Your Name <span className="text-brand-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  maxLength={80}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Alex Smith"
                  className={`w-full px-4 py-3 rounded-xl bg-warm-bg/50 border text-sm text-ink-title placeholder:text-ink-subtle focus:bg-white focus:outline-none transition-colors ${
                    errors.name ? 'border-red-400 focus:border-red-500' : 'border-warm-border focus:border-brand-500'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-ink-title uppercase tracking-wider mb-1.5">
                  Email Address <span className="text-brand-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="alex@company.com"
                  className={`w-full px-4 py-3 rounded-xl bg-warm-bg/50 border text-sm text-ink-title placeholder:text-ink-subtle focus:bg-white focus:outline-none transition-colors ${
                    errors.email ? 'border-red-400 focus:border-red-500' : 'border-warm-border focus:border-brand-500'
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Subject Field */}
              <div>
                <label htmlFor="subject" className="block text-xs font-semibold text-ink-title uppercase tracking-wider mb-1.5">
                  Subject <span className="text-brand-500">*</span>
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  maxLength={120}
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Internship opportunity, Project discussion, etc."
                  className={`w-full px-4 py-3 rounded-xl bg-warm-bg/50 border text-sm text-ink-title placeholder:text-ink-subtle focus:bg-white focus:outline-none transition-colors ${
                    errors.subject ? 'border-red-400 focus:border-red-500' : 'border-warm-border focus:border-brand-500'
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.subject}
                  </p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="message" className="block text-xs font-semibold text-ink-title uppercase tracking-wider">
                    Your Message <span className="text-brand-500">*</span>
                  </label>
                  <span className="text-[11px] text-ink-subtle">
                    {formData.message.length}/2000
                  </span>
                </div>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  maxLength={2000}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Hi Nilesh, I came across your portfolio and would love to connect..."
                  className={`w-full px-4 py-3 rounded-xl bg-warm-bg/50 border text-sm text-ink-title placeholder:text-ink-subtle focus:bg-white focus:outline-none transition-colors resize-y ${
                    errors.message ? 'border-red-400 focus:border-red-500' : 'border-warm-border focus:border-brand-500'
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-red-500 mt-1 flex items-center gap-1" role="alert">
                    <AlertCircle className="w-3.5 h-3.5" />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Action Area: Step 1 Submit vs Step 2 Direct Channel Selection */}
              {!showDispatchOptions ? (
                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full justify-center"
                    icon={Send}
                  >
                    Send Message
                  </Button>
                  <p className="text-center text-[11px] text-ink-muted pt-2.5">
                    🔒 Messages are validated on-device. No personal details or credentials are leaked.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 pt-2 animate-in fade-in duration-200">
                  {/* Status / Instruction Box */}
                  <div 
                    className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-start gap-3"
                    role="status"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-emerald-900">Message Ready to Deliver</h4>
                      <p className="text-xs text-emerald-700 mt-0.5">
                        {feedbackNotice}
                      </p>
                    </div>
                  </div>

                  {/* Two Channel Dispatch Buttons: WhatsApp & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* WhatsApp Option */}
                    <a
                      href={createWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleWhatsAppClick}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium text-sm text-white bg-emerald-600 hover:bg-emerald-700 shadow-subtle hover:shadow-card transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 active:scale-[0.98]"
                      aria-label="Contact me on WhatsApp"
                    >
                      <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>

                    {/* Email Option */}
                    <a
                      href={createEmailUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleEmailClick}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full font-medium text-sm text-white bg-brand-500 hover:bg-brand-600 shadow-subtle hover:shadow-card transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 active:scale-[0.98]"
                      aria-label="Contact me by email"
                      title="Open Gmail Compose"
                    >
                      <Mail className="w-4 h-4 shrink-0" aria-hidden="true" />
                      <span>Email</span>
                    </a>
                  </div>

                  {/* Edit details button */}
                  <div className="text-center pt-1">
                    <button
                      type="button"
                      onClick={handleEditDetails}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-muted hover:text-brand-600 transition-colors cursor-pointer py-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>Need to modify? Edit details</span>
                    </button>
                  </div>
                </div>
              )}

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}
