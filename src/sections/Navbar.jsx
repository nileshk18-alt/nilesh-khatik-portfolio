import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';
import { navLinks, personalInfo } from '../data/portfolioData';
import Button from '../components/Button';

/**
 * Navbar Component
 * 
 * Implements the exact Figma navigation:
 * - Brand logo with coral accent
 * - Desktop nav links with active scroll state
 * - Coral CTA button ("Get in Touch")
 * - Mobile responsive drawer with accessible keyboard support
 * 
 * Time Complexity:
 * - Active section tracking: O(n) on scroll event with requestAnimationFrame throttling (n = 7 links)
 * Space Complexity:
 * - O(1) auxiliary state
 */
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    let ticking = false;

    // Passive scroll listener for header appearance
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    // Zero-reflow IntersectionObserver for active section indicator
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold: 0,
      }
    );

    navLinks.forEach((link) => {
      const el = document.getElementById(link.id);
      if (el) observer.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  // Close mobile menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-warm-bg/90 backdrop-blur-md border-b border-warm-border/80 shadow-subtle py-3.5'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            className="flex items-center gap-1 text-xl sm:text-2xl font-bold tracking-tight text-ink-title group focus-visible:outline-brand-500 rounded-md"
            aria-label="Mr. Nilesh - Home"
          >
            <span> Mr. Nilesh</span>
            <span className="text-brand-500 group-hover:scale-125 transition-transform duration-200">.</span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-brand-600 bg-brand-50/80 font-semibold'
                      : 'text-ink-body hover:text-ink-title hover:bg-warm-cardMuted'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* Right Action Button (Desktop) */}
          <div className="hidden md:flex items-center gap-2.5">
            <Button
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="sm"
              icon={FileText}
              iconPosition="left"
              ariaLabel="View Nilesh Khatik's Resume in new tab"
            >
              Resume
            </Button>

            <Button
              href="#contact"
              variant="primary"
              size="sm"
              icon={ArrowUpRight}
              ariaLabel="Get in Touch with Nilesh Khatik"
            >
              Get in Touch
            </Button>
          </div>

          {/* Mobile Menu Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-10 h-10 rounded-full bg-white border border-warm-border text-ink-title flex items-center justify-center focus-visible:outline-brand-500"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 top-[65px] bg-warm-bg/98 backdrop-blur-lg z-40 md:hidden flex flex-col justify-between p-6 overflow-y-auto border-t border-warm-border animate-in fade-in duration-200"
        >
          <div className="space-y-2 pt-4">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand-50 text-brand-600 font-bold'
                      : 'text-ink-title hover:bg-warm-cardMuted'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          <div className="pt-6 border-t border-warm-border space-y-3">
            <Button
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="lg"
              className="w-full justify-center"
              icon={FileText}
              iconPosition="left"
              onClick={() => setMobileMenuOpen(false)}
            >
              View Resume
            </Button>

            <Button
              href="#contact"
              variant="primary"
              size="lg"
              className="w-full justify-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get in Touch
            </Button>
            <p className="text-center text-xs text-ink-muted">
              {personalInfo.email}
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
