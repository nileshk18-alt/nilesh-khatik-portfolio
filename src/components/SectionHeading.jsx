import React from 'react';

/**
 * Reusable Section Heading Component
 * 
 * Matches the Figma design:
 * 1. Upper category tag in brand coral uppercase (e.g. "ABOUT ME", "FEATURED PROJECTS")
 * 2. Large bold title with optional highlight styling
 * 3. Concise supporting subtitle/description
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export default function SectionHeading({
  tag,
  title,
  highlightText,
  subtitle,
  centered = false,
  className = '',
}) {
  return (
    <div className={`mb-10 md:mb-14 ${centered ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl'} ${className}`}>
      {tag && (
        <span className="inline-block text-xs font-semibold tracking-wider text-brand-500 uppercase mb-2">
          {tag}
        </span>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-ink-title leading-tight">
        {title}{' '}
        {highlightText && (
          <span className="text-brand-500 font-bold">{highlightText}</span>
        )}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-ink-muted leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
