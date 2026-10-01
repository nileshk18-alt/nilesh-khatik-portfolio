import React from 'react';
import SectionHeading from '../components/SectionHeading';
import SkillCard from '../components/SkillCard';
import { skillCategories } from '../data/portfolioData';

/**
 * Skills Section Component
 * 
 * Presents Nilesh Khatik's technical expertise categorized strictly by resume areas:
 * - Programming Languages
 * - Web & Frontend
 * - Backend & APIs
 * - Databases
 * - Tools & Core Computer Engineering Concepts
 * 
 * Time Complexity: O(n) where n is total skill categories (n = 5)
 * Space Complexity: O(1)
 */
export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 border-t border-warm-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          tag="SKILLS"
          title="Technical"
          highlightText="Expertise"
          subtitle="A solid engineering foundation in MERN stack development, object-oriented programming, and computer science fundamentals."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((cat) => (
            <SkillCard key={cat.category} categoryData={cat} />
          ))}
        </div>

      </div>
    </section>
  );
}
