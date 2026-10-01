import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { internships } from '../data/portfolioData';

/**
 * Experience Section Component (Work History)
 * 
 * Accurately renders the Work History timeline from the Figma design:
 * - 3 Real internships from Nilesh Khatik's resume:
 *   1. The Baap Company (Aug 2026 – Nov 2026)
 *   2. Kanak Digifex NexGen Pvt. Ltd. (Apr 2026 – Jun 2026)
 *   3. SUMAGO INFOTECH PVT LTD (Jan 2026 – Feb 2026)
 * - Yellow/amber period badges
 * - Timeline accent line with orange indicator nodes
 * 
 * Time Complexity: O(n) where n is internships count (n = 3)
 * Space Complexity: O(1)
 */
export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 border-t border-warm-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          tag="EXPERIENCE"
          title="Work"
          highlightText="History"
          subtitle="Hands-on industry experience delivering production-grade web solutions across multiple full-stack development internships."
        />

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-2 sm:before:left-3 before:top-3 before:bottom-3 before:w-0.5 before:bg-brand-200">
          {internships.map((internship, index) => (
            <div key={internship.id} className="relative group">
              {/* Timeline Indicator Dot */}
              <div 
                className="absolute -left-6 sm:-left-8 top-5 w-4 h-4 rounded-full bg-brand-500 border-4 border-warm-bg shadow-sm transition-transform duration-200 group-hover:scale-125"
                aria-hidden="true"
              />

              {/* Experience Card */}
              <div className="bg-white rounded-2xl p-6 sm:p-7 border border-warm-border hover:border-brand-200 hover:shadow-card transition-all duration-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 mb-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-ink-title">
                      {internship.role}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-sm font-semibold text-brand-600">
                      <span>{internship.company}</span>
                      <span className="text-ink-muted text-xs">•</span>
                      <span className="text-xs font-medium text-ink-muted flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                        {internship.location}
                      </span>
                    </div>
                  </div>

                  {/* Period Badge */}
                  <span className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" aria-hidden="true" />
                    {internship.period}
                  </span>
                </div>

                {/* Bullets directly from resume */}
                <ul className="space-y-2 mb-5">
                  {internship.points.map((point, idx) => (
                    <li key={idx} className="flex items-start text-xs sm:text-sm text-ink-muted leading-relaxed">
                      <span className="text-brand-500 mr-2 mt-1 font-bold shrink-0">•</span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-warm-borderSubtle">
                  {internship.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-warm-cardMuted text-ink-body border border-warm-borderSubtle"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
