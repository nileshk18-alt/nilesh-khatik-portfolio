import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { navLinks, personalInfo, socialLinks } from '../data/portfolioData';
import SocialLinks from '../components/SocialLinks';

/**
 * Footer Component
 * 
 * Clean, minimalist footer strictly preserving the Figma visual identity:
 * - Brand logo with coral dot
 * - Quick jump navigation
 * - Social link icons
 * - Professional copyright and SPPU affiliation
 * 
 * Time Complexity: O(1)
 * Space Complexity: O(1)
 */
export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-warm-bg border-t border-warm-border py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-warm-border">
          
          {/* Logo & Description */}
          <div className="text-center md:text-left">
            <a
              href="#home"
              className="inline-flex items-center gap-1 text-2xl font-bold tracking-tight text-ink-title"
              aria-label="Nilesh Khatik Home"
            >
              <span>Mr.Nilesh</span>
              <span className="text-brand-500">.</span>
            </a>
            <p className="text-xs sm:text-sm text-ink-muted mt-1 max-w-sm">
              Computer Engineering Student at SPPU • MERN Stack & AI Web Developer
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs sm:text-sm font-medium text-ink-body" aria-label="Footer Navigation">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className="hover:text-brand-600 transition-colors py-2 px-2 inline-flex items-center min-h-[36px]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Social Icons & Back to Top */}
          <div className="flex items-center gap-3">
            <SocialLinks />
            <button
              type="button"
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full bg-white border border-warm-border hover:border-brand-300 hover:text-brand-500 flex items-center justify-center text-ink-title transition-all shadow-sm"
              aria-label="Scroll back to top"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} Nilesh Khatik. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with React & Tailwind CSS • Single source of truth from resume & Figma
          </p>
        </div>

      </div>
    </footer>
  );
}
