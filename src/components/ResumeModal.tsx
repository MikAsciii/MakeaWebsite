import React, { useEffect } from 'react';
import { X, Printer, Award, Landmark, GraduationCap } from 'lucide-react';
import { ARTIST, EXHIBITION_CHRONOLOGY } from '../data/artworksData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 lg:p-10 animate-in fade-in duration-200"
    >
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      <div className="relative w-full max-w-4xl bg-[#FAF8F5] border border-[#E2DACF] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[96vh] sm:max-h-[92vh] my-auto text-[#14151A]">
        
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#E2DACF] bg-[#F5F2EB] sticky top-0 z-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-mono-code text-[11px] sm:text-xs text-white bg-[#E61E38] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
              Curriculum Vitae
            </span>
            <span aria-hidden="true" className="text-stone-300">/</span>
            <span className="text-[11px] sm:text-xs text-[#5A5852] font-mono-code truncate max-w-[120px] sm:max-w-none">{ARTIST.name}</span>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => window.print()}
              className="p-1.5 sm:p-2 rounded-lg text-stone-700 hover:text-white hover:bg-[#E61E38] transition-all inline-flex items-center gap-1.5 text-xs font-semibold font-mono-code border border-[#E2DACF] shadow-xs min-h-[36px]"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 -mr-1 rounded-lg text-stone-400 hover:text-stone-900 hover:bg-stone-200/60 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close CV Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CV Document Content */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8 bg-[#FAF8F5] text-stone-800">
          
          {/* Header Lockup */}
          <div className="border-b border-[#EBE4D8] pb-5 sm:pb-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 sm:gap-2">
              <h2 id="cv-title" className="text-2xl sm:text-4xl md:text-5xl font-editorial italic font-normal text-[#14151A] tracking-tight leading-tight">
                {ARTIST.name}
              </h2>
              <span className="text-xs text-[#E61E38] font-mono-code font-bold">
                {ARTIST.email}
              </span>
            </div>
            
            <div className="text-xs sm:text-sm text-[#5A5852] font-sans mt-1">
              {ARTIST.discipline} · Atelier {ARTIST.location}
            </div>

            <div className="text-[11px] text-stone-400 font-mono-code mt-1">
              Representation: {ARTIST.representation}
            </div>
          </div>

          {/* Artist Statement */}
          <div>
            <h3 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#E61E38] mb-2">
              Artistic Statement & Substrate
            </h3>
            <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans">
              {ARTIST.biography}
            </p>
          </div>

          {/* Institutional Permanent Collections */}
          <div>
            <h3 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#E61E38] mb-3 flex items-center gap-2">
              <Landmark className="w-4 h-4 text-[#14151A]" />
              <span>Permanent Public & Institutional Collections</span>
            </h3>
            <ul className="space-y-2 text-xs font-mono-code text-stone-700">
              <li>• Museum of Contemporary Fine Arts (MCFA), Tokyo, Japan (Inv. nº 2024-MCFA-084)</li>
              <li>• Museum of Art, Architecture and Technology (MAAT), Lisbon, Portugal</li>
              <li>• Fondation d’Art Contemporain, Geneva, Switzerland</li>
              <li>• Center for Contemporary Sound Architecture, Berlin, Germany</li>
              <li>• Stedelijk Museum Library & Special Collections, Amsterdam, Netherlands</li>
              <li>• Bibliothèque Nationale de France, Department of Fine Arts Prints, Paris</li>
            </ul>
          </div>

          {/* Selected Exhibitions */}
          <div>
            <h3 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#E61E38] mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-[#14151A]" />
              <span>Selected Exhibitions & Biennales</span>
            </h3>

            <div className="space-y-3.5 sm:space-y-4">
              {EXHIBITION_CHRONOLOGY.map((exp, idx) => (
                <div key={idx} className="border-l-2 border-[#E61E38] pl-3.5 sm:pl-4 text-xs space-y-0.5">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="font-bold text-[#14151A] uppercase font-display">{exp.title}</span>
                    <span className="font-mono-code text-[#E61E38] font-bold shrink-0">{exp.year}</span>
                  </div>
                  <div className="text-stone-700 font-medium">{exp.institution} · {exp.location}</div>
                  <div className="text-[#5A5852] font-sans">{exp.notes}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Education & Fellowships */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 pt-4 border-t border-[#EBE4D8]">
            <div>
              <h3 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#E61E38] mb-2 sm:mb-3 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#14151A]" />
                <span>Academic Background</span>
              </h3>
              <div className="space-y-2.5 sm:space-y-3 text-xs">
                <div>
                  <div className="font-bold text-[#14151A]">M.F.A. in Computational Arts & Sculpture</div>
                  <div className="text-[#5A5852] font-sans">University of Washington · 2016 — 2018</div>
                </div>
                <div>
                  <div className="font-bold text-[#14151A]">B.S. in Human-Computer Interaction & Graphics</div>
                  <div className="text-[#5A5852] font-sans">University of Washington · 2012 — 2016</div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono-code font-bold uppercase tracking-wider text-[#E61E38] mb-2 sm:mb-3 flex items-center gap-2">
                <Award className="w-4 h-4 text-[#14151A]" />
                <span>Honors & Fellowships</span>
              </h3>
              <div className="space-y-1.5 text-xs text-stone-700 font-sans">
                <div>• Golden Nica, Prix Ars Electronica (2022)</div>
                <div>• Villa Kujoyama Fellowship, Kyoto (2024)</div>
                <div>• Pollock-Krasner Foundation Grant Nominee (2023)</div>
                <div>• Visiting Fellow, MIT Center for Art, Science & Technology (2025)</div>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#F5F2EB] border-t border-[#E2DACF] flex items-center justify-between text-xs text-[#5A5852] font-mono-code">
          <span className="truncate max-w-[200px] sm:max-w-none">Official Atelier Dossier · {ARTIST.name}</span>
          <button
            onClick={onClose}
            className="text-[#E61E38] font-bold hover:underline py-1 px-2"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
