import React from 'react';
import { Github, Linkedin, Mail, Phone } from 'lucide-react';
import { socialLinks, personalInfo } from '../data/portfolioData';

/**
 * Reusable Social & Contact Links Component
 * 
 * Secure external links with rel="noopener noreferrer".
 * Accessible icon buttons with tooltips / aria-labels.
 * 
 * Time Complexity: O(n) single pass over social links list (n <= 4)
 * Space Complexity: O(1) auxiliary space
 */
export default function SocialLinks({
  showLabels = false,
  variant = 'icon-only', // 'icon-only' | 'cards' | 'inline'
  className = '',
}) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'github':
        return <Github className="w-4 h-4" aria-hidden="true" />;
      case 'linkedin':
        return <Linkedin className="w-4 h-4" aria-hidden="true" />;
      case 'mail':
        return <Mail className="w-4 h-4" aria-hidden="true" />;
      case 'phone':
        return <Phone className="w-4 h-4" aria-hidden="true" />;
      default:
        return null;
    }
  };

  if (variant === 'cards') {
    return (
      <div className={`space-y-3 ${className}`}>
        {socialLinks.map((item) => (
          <a
            key={item.name}
            href={item.url}
            target={item.url.startsWith('http') ? '_blank' : undefined}
            rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-warm-border hover:border-brand-300 hover:shadow-subtle transition-all duration-200 group"
          >
            <div className="w-9 h-9 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0 group-hover:bg-brand-500 group-hover:text-white transition-colors duration-200">
              {getIcon(item.icon)}
            </div>
            <div className="overflow-hidden">
              <span className="block text-xs font-medium text-ink-muted">
                {item.name}
              </span>
              <span className="block text-sm font-semibold text-ink-title truncate group-hover:text-brand-600 transition-colors">
                {item.label}
              </span>
            </div>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {socialLinks.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target={item.url.startsWith('http') ? '_blank' : undefined}
          rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
          aria-label={`${item.name}: ${item.label}`}
          title={`${item.name}: ${item.label}`}
          className="w-10 h-10 rounded-full bg-white border border-warm-border hover:border-brand-300 hover:bg-brand-50 text-ink-body hover:text-brand-500 flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
        >
          {getIcon(item.icon)}
          {showLabels && <span className="sr-only">{item.name}</span>}
        </a>
      ))}
    </div>
  );
}
