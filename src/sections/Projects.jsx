import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/portfolioData';

/**
 * Projects Section Component
 * 
 * Renders the 4-card project grid seen in the Figma Make file:
 * - TradeSense AI (Stock Analysis & Portfolio Management)
 * - DriveLux (AI Based Car Rental)
 *  
 * 
 * Time Complexity: O(n) where n is projects length (n = 4)
 * Space Complexity: O(1)
 */
export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 border-t border-warm-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-12 gap-4">
          <SectionHeading
            tag="PROJECTS"
            title="Featured"
            highlightText="Projects"
            subtitle="Real-world full-stack web platforms and academic systems built with React, Node.js, Express, MongoDB, and AI integration."
            className="mb-0"
          />

          <a
            href="https://github.com/nileshk18-alt"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:text-brand-600 transition-colors shrink-0 group self-start sm:self-auto"
          >
            <span>View All on GitHub</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 2x2 Grid of Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj) => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>

      </div>
    </section>
  );
}
