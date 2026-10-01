import React, { useState, useEffect } from 'react';
import { GraduationCap, Award, Trophy, CheckCircle2, Calendar, ExternalLink, X, FileText } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import { educationList, certifications, achievements } from '../data/portfolioData';
import { trackEvent } from '../utils/analytics';

/**
 * Education & Achievements Section Component
 * 
 * Implements the 2-column layout from the Figma design:
 * - Column 1: Academic Education (B.E. at SPPU, XII HSC, X SSC)
 * - Column 2: Professional Certifications & Competitive Achievements
 * - Interactive, accessible certificate viewer modal for verified credentials
 * 
 * Time Complexity: O(n) for education + achievements (n <= 10)
 * Space Complexity: O(1)
 */
export default function Education() {
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  // Close modal on Escape key and prevent background scroll
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedCertificate) {
        setSelectedCertificate(null);
      }
    };
    if (selectedCertificate) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedCertificate]);

  return (
    <section id="education" className="py-16 md:py-24 border-t border-warm-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <SectionHeading
          tag="ACADEMICS & HONORS"
          title="Education &"
          highlightText="Achievements"
          subtitle="Strong academic foundation in Computer Engineering paired with verified competitive coding honors."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Column 1: Academic Education */}
          <div className="lg:col-span-6 space-y-5">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-ink-title">Education</h3>
            </div>

            <div className="space-y-4">
              {educationList.map((edu) => (
                <div
                  key={edu.id}
                  className="bg-white rounded-2xl p-6 border border-warm-border hover:border-brand-200 hover:shadow-card transition-all duration-200"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h4 className="text-base font-bold text-ink-title">
                        {edu.degree}
                      </h4>
                      <p className="text-sm font-semibold text-brand-600 mt-0.5">
                        {edu.institution}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                      {edu.score}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-ink-muted pt-3 border-t border-warm-borderSubtle">
                    <span className="flex items-center gap-1 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-brand-500" aria-hidden="true" />
                      {edu.period}
                    </span>
                    <span>{edu.scoreDetail}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Certifications & Achievements */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Certifications Block */}
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center">
                  <Award className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-ink-title">Certifications</h3>
              </div>

              <div className="space-y-4">
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="bg-white rounded-2xl p-6 border border-warm-border hover:border-brand-200 hover:shadow-card transition-all duration-200"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div>
                        <h4 className="text-base font-bold text-ink-title">
                          {cert.title}
                        </h4>
                        {cert.issuer && (
                          <p className="text-xs font-semibold text-brand-600 mt-0.5">
                            {cert.issuer} {cert.course ? `• ${cert.course}` : ''}
                          </p>
                        )}
                      </div>
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-600 border border-brand-100 shrink-0">
                        Verified
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-ink-muted leading-relaxed">
                      {cert.description}
                    </p>

                    {cert.documentUrl && (
                      <div className="mt-4 pt-3.5 border-t border-warm-borderSubtle flex flex-wrap items-center justify-between gap-2">
                        <span className="text-[11px] text-ink-muted font-mono">
                          {cert.credentialId ? `ID: ${cert.credentialId}` : 'Verified Credential'}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              trackEvent('view_certificate', { title: cert.title, issuer: cert.issuer });
                              setSelectedCertificate(cert);
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg border border-brand-200/70 transition-colors focus-visible:outline-brand-500"
                            aria-label={`View Certificate for ${cert.title}`}
                          >
                            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                            <span>View Certificate</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements Block */}
            <div className="pt-2">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center">
                  <Trophy className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-ink-title">Honors & Competitions</h3>
              </div>

              <div className="space-y-3.5">
                {achievements.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl p-4.5 p-5 border border-warm-border hover:border-brand-200 hover:shadow-card transition-all duration-200 flex items-start gap-3.5"
                  >
                    <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                      <Trophy className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                        <h4 className="text-sm font-bold text-ink-title">
                          {item.title}
                        </h4>
                        <span className="text-[11px] font-semibold text-brand-600 bg-brand-50 px-2 py-0.5 rounded self-start sm:self-auto">
                          {item.detail}
                        </span>
                      </div>
                      <p className="text-xs text-ink-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Professional Certificate Viewer Modal */}
      {selectedCertificate && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-title/70 backdrop-blur-sm animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cert-modal-title"
          onClick={() => setSelectedCertificate(null)}
        >
          <div 
            className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-warm-border animate-in zoom-in-95"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-warm-border flex items-center justify-between bg-warm-bg/40">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 id="cert-modal-title" className="text-base sm:text-lg font-bold text-ink-title">
                    {selectedCertificate.title}
                  </h3>
                  <p className="text-xs text-brand-600 font-medium">
                    {selectedCertificate.issuer} {selectedCertificate.course ? `• ${selectedCertificate.course}` : ''}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCertificate(null)}
                className="w-9 h-9 rounded-full bg-warm-card hover:bg-warm-cardMuted text-ink-muted hover:text-ink-title flex items-center justify-center transition-colors focus-visible:outline-brand-500"
                aria-label="Close certificate viewer"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>

            {/* Modal Certificate Display */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-warm-bg/20 flex items-center justify-center">
              <img
                src={selectedCertificate.documentUrl}
                alt={`${selectedCertificate.title} - Certificate of Completion`}
                className="max-h-[62vh] w-auto object-contain rounded-xl shadow-md border border-warm-border"
              />
            </div>

            {/* Modal Footer with ID & Open in New Tab action */}
            <div className="p-4 sm:p-5 border-t border-warm-border bg-white flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-ink-muted font-mono">
                {selectedCertificate.credentialId && `Certificate ID: ${selectedCertificate.credentialId}`}
              </span>
              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                <a
                  href={selectedCertificate.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-ink-title bg-warm-card hover:bg-warm-cardMuted px-3.5 py-2 rounded-xl border border-warm-border transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Open Full Image</span>
                </a>
                {selectedCertificate.pdfUrl && (
                  <a
                    href={selectedCertificate.pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-white bg-brand-500 hover:bg-brand-600 px-4 py-2 rounded-xl shadow-subtle transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Open PDF Document</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
