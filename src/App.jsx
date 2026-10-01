import React from 'react';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Experience from './sections/Experience';
import Education from './sections/Education';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

/**
 * Main App Component for Nilesh Khatik's Portfolio
 * 
 * Strict Single Source of Truth: Figma Make Design & Uploaded Resume
 * - Zero redesign: Faithful preservation of layout, colors, typography, and hierarchy
 * - Zero invented information: All content directly matches resume
 * - Clean semantic HTML: header, nav, main, section, article, footer
 * 
 * Time Complexity: O(1) mount and render
 * Space Complexity: O(1)
 */
export default function App() {
  return (
    <div className="min-h-screen bg-warm-bg text-ink-body flex flex-col selection:bg-brand-100 selection:text-brand-700">
      {/* Skip to Content Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-brand-500 focus:text-white focus:rounded-full focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Persistent Navigation */}
      <Navbar />

      {/* Main Landmark */}
      <main id="main-content" className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
