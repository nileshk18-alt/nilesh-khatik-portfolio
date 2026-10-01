import React from 'react';
import { ArrowRight, Sparkles, Award, Code2, GraduationCap, FileText, Download } from 'lucide-react';
import { personalInfo, socialLinks } from '../data/portfolioData';
import Button from '../components/Button';
import SocialLinks from '../components/SocialLinks';
import { trackEvent } from '../utils/analytics';

/**
 * Hero Section Component
 * 
 * Faithful reproduction of the Figma Hero layout:
 * - Amber "Available for new opportunities" status pill
 * - "Hi, I'm Nilesh Khatik" bold typography with coral highlight
 * - Concise, authentic summary from resume
 * - Action buttons ("View Work →" & "Get in Touch")
 * - Original uploaded photo with warm background frame and floating achievement cards
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export default function Hero() {
  return (
    <section
      id="home"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Status Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs sm:text-sm font-semibold w-fit mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" aria-hidden="true" />
              <span>{personalInfo.statusBadge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink-title tracking-tight leading-[1.1] mb-4">
              Hi, I'm <span className="text-brand-500 font-extrabold">{personalInfo.firstName}</span>
              <br />
              <span className="text-ink-title">{personalInfo.lastName}</span>
            </h1>

            {/* Sub-headline / Role */}
            <p className="text-base sm:text-lg font-semibold text-ink-body mb-4">
              {personalInfo.role}
            </p>

            {/* Bio Paragraph from Resume */}
            <p className="text-sm sm:text-base text-ink-muted leading-relaxed max-w-2xl mb-8">
              {personalInfo.summary}
            </p>

            {/* Quick Tech Highlights */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-ink-muted mb-8">
              <span className="text-ink-title">Core Skills:</span>
              {['Python', 'MERN Stack', 'React.js', 'Node.js', 'MySQL', 'MongoDB'].map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-warm-card border border-warm-border text-ink-body font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8">
              <Button
                href="#projects"
                variant="primary"
                size="lg"
                icon={ArrowRight}
              >
                View Work
              </Button>

              <Button
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                icon={FileText}
                iconPosition="left"
                onClick={() => trackEvent('view_resume_clicked', { source: 'hero' })}
              >
                View Resume
              </Button>

              <Button
                href={personalInfo.resumeUrl}
                download="Nilesh_Resume_updated.pdf"
                variant="outline"
                size="lg"
                icon={Download}
                iconPosition="left"
                onClick={() => trackEvent('download_resume_clicked', { source: 'hero' })}
              >
                Download Resume
              </Button>

              
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-3 pt-2">
              <span className="text-xs font-medium text-ink-muted">Connect:</span>
              <SocialLinks />
            </div>
          </div>

          {/* Right Column: Photo & Floating Badges */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end relative mt-10 lg:mt-0 px-2 sm:px-0">
            <div className="relative w-full max-w-[250px] xs:max-w-[270px] sm:max-w-[340px] md:max-w-[380px] mx-auto lg:mr-0">
              
              {/* Warm decorative background accent card from Figma */}
              <div 
                className="absolute inset-0 bg-[#FBE7C6] rounded-3xl transform translate-x-2.5 translate-y-2.5 sm:translate-x-4 sm:translate-y-4 -rotate-1"
                aria-hidden="true"
              />

              {/* Main Image Container */}
              <div className="relative rounded-3xl overflow-hidden bg-white shadow-floating border-2 border-white aspect-[4/5]">
                <picture>
                  <source
                    type="image/webp"
                    srcSet="/assets/images/nilesh-khatik-400.webp 400w, /assets/images/nilesh-khatik.webp 807w"
                    sizes="(max-width: 640px) 270px, (max-width: 1024px) 340px, 380px"
                  />
                  <img
                    src="/assets/images/nilesh-khatik-optimized.jpg"
                    alt="Nilesh Khatik - Computer Engineering Student and Full-Stack Developer"
                    className="w-full h-full object-cover object-top"
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    width="400"
                    height="500"
                  />
                </picture>
              </div>

              {/* Floating Badge 1: Top Left - SPPU Education */}
              <div 
                className="absolute -top-3 -left-2 sm:-left-6 bg-white/95 backdrop-blur-sm p-2.5 sm:p-3.5 rounded-2xl border border-warm-border shadow-floating flex items-center gap-2.5 sm:gap-3"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-[10px] sm:text-[11px] font-semibold text-ink-muted">
                    SPPU Engineering
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-ink-title">
                    CGPA 9.071
                  </span>
                </div>
              </div>

              {/* Floating Badge 2: Bottom Left - Full-Stack & AI */}
              <div 
                className="absolute -bottom-3 -left-2 sm:-left-5 bg-white/95 backdrop-blur-sm p-2.5 sm:p-3.5 rounded-2xl border border-warm-border shadow-floating flex items-center gap-2.5 sm:gap-3"
              >
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <Code2 className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                </div>
                <div>
                  <span className="block text-[10px] sm:text-[11px] font-semibold text-ink-muted">
                    Full-Stack Developer
                  </span>
                  <span className="block text-xs sm:text-sm font-bold text-brand-600">
                    MERN + AI
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
