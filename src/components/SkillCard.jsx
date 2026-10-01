import React from 'react';
import { Code, Layout, Server, Database, Wrench } from 'lucide-react';

/**
 * Reusable Skill Card / Category Component
 * 
 * Displays categorized technical skills with clear visual hierarchy.
 * 
 * Time Complexity: O(k) per category where k is skill count in category (k <= 6)
 * Space Complexity: O(1)
 */
export default function SkillCard({ categoryData }) {
  const { category, shortTitle, skills } = categoryData;

  const getCategoryIcon = (name) => {
    switch (name) {
      case 'PROGRAMMING':
        return <Code className="w-4 h-4 text-brand-500" aria-hidden="true" />;
      case 'FRONTEND':
        return <Layout className="w-4 h-4 text-brand-500" aria-hidden="true" />;
      case 'BACKEND':
        return <Server className="w-4 h-4 text-brand-500" aria-hidden="true" />;
      case 'DATABASE':
        return <Database className="w-4 h-4 text-brand-500" aria-hidden="true" />;
      case 'TOOLS & CONCEPTS':
        return <Wrench className="w-4 h-4 text-brand-500" aria-hidden="true" />;
      default:
        return <Code className="w-4 h-4 text-brand-500" aria-hidden="true" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-warm-border hover:border-brand-200 hover:shadow-card transition-all duration-200 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-50 flex items-center justify-center">
              {getCategoryIcon(shortTitle)}
            </div>
            <h3 className="text-base font-bold text-ink-title tracking-tight">
              {category}
            </h3>
          </div>
          <span className="text-[11px] font-semibold text-brand-500 uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-50/60 border border-brand-100/60">
            {shortTitle}
          </span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          {skills.map((skill) => (
            <div
              key={skill.name}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-warm-cardMuted hover:bg-brand-50/50 border border-warm-borderSubtle hover:border-brand-200 transition-colors"
            >
              <span className="text-xs font-semibold text-ink-title">
                {skill.name}
              </span>
              {skill.level && (
                <span className="text-[10px] text-ink-muted">
                  • {skill.level}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
