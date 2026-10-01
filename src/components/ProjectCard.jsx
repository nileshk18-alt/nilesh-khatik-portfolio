import React from 'react';
import { ExternalLink, Github, Sparkles, TrendingUp, Car } from 'lucide-react';

/**
 * Reusable Project Card Component
 * 
 * Accurately implements the Figma project card layout:
 * - Graphic visual banner with project-relevant accent
 * - Category badge (e.g. MERN + AI)
 * - Concise, truthful bullet points from resume
 * - Technology tags
 * - Accessible external link buttons
 * 
 * Time Complexity: O(1) rendering per card, O(k) for tech tags (k < 10)
 * Space Complexity: O(1) auxiliary space
 */
export default function ProjectCard({ project }) {
  const {
    id,
    title,
    subtitle,
    tagline,
    badge,
    technologies,
    points,
    githubUrl,
    liveDemoUrl,
  } = project;

  // Determine visual icon and decorative tone based on project id
  const isFinance = id === 'Tradesense-ai';

  return (
    <article className="group bg-white rounded-2xl border border-warm-border hover:border-brand-300 hover:shadow-card-hover transition-all duration-300 flex flex-col overflow-hidden">
      {/* Visual Header / Banner */}
      <div className={`relative h-48 sm:h-52 w-full p-6 flex flex-col justify-between overflow-hidden ${
        isFinance 
          ? 'bg-gradient-to-br from-amber-500/10 via-brand-500/5 to-warm-cardMuted border-b border-warm-border'
          : 'bg-gradient-to-br from-zinc-800/10 via-zinc-900/5 to-warm-cardMuted border-b border-warm-border'
      }`}>
        {/* Subtle decorative grid/graph lines */}
        <div 
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#18181B 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
          aria-hidden="true"
        />

        {/* Top bar with Badge and Icon */}
        <div className="relative z-10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-brand-600 shadow-sm border border-brand-100">
            <Sparkles className="w-3 h-3 text-brand-500" aria-hidden="true" />
            {badge}
          </span>
          <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm border border-warm-border flex items-center justify-center text-ink-title group-hover:text-brand-500 transition-colors">
            {isFinance ? (
              <TrendingUp className="w-5 h-5" aria-hidden="true" />
            ) : (
              <Car className="w-5 h-5" aria-hidden="true" />
            )}
          </div>
        </div>

        {/* Banner Title Preview */}
        <div className="relative z-10">
          <span className="text-xs uppercase tracking-wider text-ink-muted font-medium block">
            Academic Project
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-ink-title tracking-tight mt-0.5">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-ink-muted line-clamp-1 mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
        <div>
          <p className="text-sm text-ink-body font-medium leading-relaxed mb-4">
            {tagline}
          </p>

          {/* Bullet points from resume */}
          <ul className="space-y-2 mb-6">
            {points.map((pt, idx) => (
              <li key={idx} className="flex items-start text-xs sm:text-sm text-ink-muted leading-relaxed">
                <span className="text-brand-500 mr-2 mt-1 shrink-0 font-bold">•</span>
                <span>{pt}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5 pt-4 border-t border-warm-border mb-5">
            {technologies.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-warm-cardMuted text-ink-body border border-warm-borderSubtle"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex items-center justify-between pt-2">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors group/link"
              aria-label={`Explore ${title} on GitHub`}
            >
              <span>Explore</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-ink-body bg-white border border-warm-border hover:border-brand-300 hover:text-brand-600 transition-all"
            >
              <Github className="w-3.5 h-3.5" aria-hidden="true" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
