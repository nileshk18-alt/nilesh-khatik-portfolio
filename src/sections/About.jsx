import React from 'react';
import { Code, GraduationCap, Award, Trophy, ArrowRight, FileText } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import Button from '../components/Button';
import { aboutCards, heroStats, personalInfo } from '../data/portfolioData';

/**
 * About Section Component
 * 
 * Accurately implements the Figma About section:
 * - "ABOUT ME" uppercase tag
 * - "Building scalable real experiences" headline
 * - Professional summary grounded in real resume achievements
 * - Key metric counters (CGPA, Internships, Projects)
 * - 4 Bento highlight cards with subtle warm borders and coral icons
 * 
 * Time Complexity: O(1) rendering, O(k) for cards (k = 4)
 * Space Complexity: O(1)
 */
export default function About() {
  const getCardIcon = (iconName) => {
    switch (iconName) {
      case 'code':
        return <Code className="w-5 h-5 text-brand-500" aria-hidden="true" />;
      case 'graduation-cap':
        return <GraduationCap className="w-5 h-5 text-brand-500" aria-hidden="true" />;
      case 'award':
        return <Award className="w-5 h-5 text-brand-500" aria-hidden="true" />;
      case 'trophy':
        return <Trophy className="w-5 h-5 text-brand-500" aria-hidden="true" />;
      default:
        return <Code className="w-5 h-5 text-brand-500" aria-hidden="true" />;
    }
  };

  return (
    <section id="about" className="py-16 md:py-24 border-t border-warm-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Heading, Bio, & Stats */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wider text-brand-500 uppercase mb-2 block">
                ABOUT ME
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-ink-title tracking-tight leading-tight mb-6">
                Building scalable <br />
                <span className="text-brand-500">real experiences</span>
              </h2>

              <p className="text-sm sm:text-base text-ink-body leading-relaxed mb-4">
                I am a dedicated Computer Engineering student at Savitribai Phule Pune University (SPPU) with a passionate focus on full-stack web development and modern software architecture.
              </p>

              <p className="text-sm sm:text-base text-ink-muted leading-relaxed mb-6">
                Through internships at SUMAGO INFOTECH, Kanak Digifex NexGen, and The Baap Company, I have built real-world full-stack applications involving frontend UI engineering, RESTful backend APIs, database management, and intelligent AI features.
              </p>

              <div className="flex flex-wrap items-center gap-3 mb-8">
                <Button
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                  size="sm"
                  icon={FileText}
                  iconPosition="left"
                >
                  View Full Resume
                </Button>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-warm-border">
              {heroStats.map((stat, idx) => (
                <div key={idx}>
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-500 tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-xs font-medium text-ink-muted mt-1 leading-snug">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: 4 Bento Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {aboutCards.map((card) => (
              <div
                key={card.id}
                className="bg-white rounded-2xl p-6 border border-warm-border hover:border-brand-200 hover:shadow-card transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center mb-4">
                    {getCardIcon(card.icon)}
                  </div>
                  <h3 className="text-base font-bold text-ink-title mb-2">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
