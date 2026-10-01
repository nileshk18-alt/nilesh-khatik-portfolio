import React from 'react';

/**
 * Reusable Accessible Button Component
 * 
 * Supports both button actions and anchor links with consistent styling.
 * Preserves the Figma primary orange style and clean outlined secondary style.
 * 
 * Time Complexity: O(1) rendering
 * Space Complexity: O(1) auxiliary memory
 */
export default function Button({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'outline'
  size = 'md',        // 'sm' | 'md' | 'lg'
  href,
  download,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  target,
  rel,
  ariaLabel,
  icon: Icon,
  iconPosition = 'right',
}) {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed disabled:pointer-events-none';

  const variants = {
    // Exact primary brand coral button from Figma
    primary:
      'bg-brand-500 hover:bg-brand-600 text-white shadow-subtle hover:shadow-card focus-visible:outline-brand-500',
    // Elegant warm outlined button from Figma
    secondary:
      'bg-warm-card hover:bg-warm-cardMuted text-ink-title border border-warm-border hover:border-warm-borderSubtle focus-visible:outline-brand-500',
    outline:
      'bg-transparent hover:bg-brand-50 text-brand-600 border border-brand-200 hover:border-brand-400 focus-visible:outline-brand-500',
    ghost:
      'bg-transparent hover:bg-warm-cardMuted text-ink-body hover:text-ink-title focus-visible:outline-brand-500',
  };

  const sizes = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3 gap-2.5',
  };

  const combinedClasses = `${baseStyles} ${variants[variant] || variants.primary} ${sizes[size] || sizes.md} ${className}`;

  if (href) {
    const isExternal = href.startsWith('http') || href.startsWith('//');
    return (
      <a
        href={href}
        download={download}
        className={combinedClasses}
        target={target || (isExternal ? '_blank' : undefined)}
        rel={rel || (isExternal ? 'noopener noreferrer' : undefined)}
        aria-label={ariaLabel}
      >
        {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
        <span>{children}</span>
        {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      aria-label={ariaLabel}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" aria-hidden="true" />}
    </button>
  );
}
