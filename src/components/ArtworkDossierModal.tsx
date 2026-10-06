import React, { useState, useEffect } from 'react';
import { Artwork } from '../types/portfolio';
import { X, Mail, Landmark, Layers, ShieldCheck } from 'lucide-react';
import { ARTIST } from '../data/artworksData';

interface ArtworkDossierModalProps {
  artwork: Artwork | null;
  onClose: () => void;
  onOpenInquiry: (artworkTitle: string) => void;
}

export const ArtworkDossierModal: React.FC<ArtworkDossierModalProps> = ({
  artwork,
  onClose,
  onOpenInquiry,
}) => {
  const [activeTab, setActiveTab] = useState<'statement' | 'provenance' | 'specs'>('statement');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (artwork) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [artwork, onClose]);

  if (!artwork) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dossier-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 lg:p-10 animate-in fade-in duration-200"
    >
      <div 
        className="fixed inset-0" 
        onClick={onClose} 
        aria-hidden="true" 
      />

      <div className="relative w-full max-w-5xl bg-[#FAF8F5] border border-[#E2DACF] rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[96vh] sm:max-h-[92vh] my-auto text-[#14151A]">
        
        {/* Top Institutional Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-[#E2DACF] bg-[#F5F2EB] sticky top-0 z-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="font-mono-code text-[11px] sm:text-xs text-white bg-[#E61E38] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
              {artwork.catalogNumber}
            </span>
            <span aria-hidden="true" className="text-stone-300">/</span>
            <span className="text-[11px] sm:text-xs text-[#5A5852] font-mono-code truncate max-w-[140px] sm:max-w-none">{artwork.accessionNumber}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 -mr-1 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors focus:outline-none min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close dossier (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Dossier Body */}
        <div className="overflow-y-auto flex-1 p-4 sm:p-8 md:p-10 space-y-6 sm:space-y-8 bg-[#FAF8F5]">
          
          {/* Main Visual Presentation */}
          <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[4/3] xs:aspect-[16/10] sm:aspect-[16/9] md:aspect-[21/9] bg-[#EFEBE3] border border-[#E2DACF]">
            <img
              src={artwork.image}
              alt={artwork.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20" />

            <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-6 sm:right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-2.5 sm:gap-4">
              <div>
                <span className="text-[10px] sm:text-[11px] font-mono-code uppercase tracking-widest text-red-200 font-bold block mb-0.5 sm:mb-1">
                  {artwork.categoryLabel} · {artwork.year}
                </span>
                <h2 id="dossier-title" className="text-2xl sm:text-4xl md:text-5xl font-editorial italic font-normal text-white tracking-tight drop-shadow leading-tight">
                  {artwork.title}
                </h2>
                <p className="text-xs sm:text-sm text-stone-200 mt-0.5 sm:mt-1 max-w-xl drop-shadow font-sans">
                  {artwork.subtitle}
                </p>
              </div>

              <div className="bg-[#FAF8F5]/95 backdrop-blur-md border border-[#E2DACF] rounded-lg sm:rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 self-start sm:self-auto font-mono-code text-left sm:text-right shadow-sm text-xs">
                <div className="text-xs text-[#E61E38] font-bold">{artwork.edition}</div>
                <div className="text-[10px] text-stone-600">{artwork.dimensions}</div>
              </div>
            </div>
          </div>

          {/* Institutional Accession Metadata Grid */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 py-3.5 sm:py-4 px-4 sm:px-5 rounded-xl bg-[#EDE7DC] border border-[#E2DACF] text-xs">
            <div>
              <span className="text-stone-500 block uppercase tracking-wider text-[10px] font-mono-code font-bold">Artist</span>
              <span className="font-semibold text-stone-900 mt-0.5 block">{ARTIST.name}</span>
            </div>
            <div>
              <span className="text-stone-500 block uppercase tracking-wider text-[10px] font-mono-code font-bold">Medium</span>
              <span className="font-semibold text-stone-900 mt-0.5 block line-clamp-2">{artwork.medium}</span>
            </div>
            <div>
              <span className="text-stone-500 block uppercase tracking-wider text-[10px] font-mono-code font-bold">Dimensions</span>
              <span className="font-semibold text-stone-900 mt-0.5 block font-mono-code text-[11px]">{artwork.dimensions}</span>
            </div>
            <div>
              <span className="text-stone-500 block uppercase tracking-wider text-[10px] font-mono-code font-bold">Acquisition Provenance</span>
              <span className="font-semibold text-[#E61E38] mt-0.5 block line-clamp-2">{artwork.provenance.split(';')[0]}</span>
            </div>
          </div>

          {/* Dossier Tabs (Touch-friendly and horizontally scrollable) */}
          <div className="flex border-b border-[#E2DACF] gap-4 sm:gap-6 text-sm font-semibold overflow-x-auto scrollbar-none pb-0.5">
            <button
              onClick={() => setActiveTab('statement')}
              className={`pb-3 border-b-2 transition-all whitespace-nowrap text-xs sm:text-sm ${
                activeTab === 'statement'
                  ? 'border-[#E61E38] text-[#E61E38] font-extrabold'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              Curatorial Statement
            </button>
            <button
              onClick={() => setActiveTab('provenance')}
              className={`pb-3 border-b-2 transition-all whitespace-nowrap text-xs sm:text-sm ${
                activeTab === 'provenance'
                  ? 'border-[#E61E38] text-[#E61E38] font-extrabold'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              Exhibition History & Provenance
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`pb-3 border-b-2 transition-all whitespace-nowrap text-xs sm:text-sm ${
                activeTab === 'specs'
                  ? 'border-[#E61E38] text-[#E61E38] font-extrabold'
                  : 'border-transparent text-stone-500 hover:text-stone-900'
              }`}
            >
              Specifications & Materiality
            </button>
          </div>

          {/* Tab 1: Curatorial Statement */}
          {activeTab === 'statement' && (
            <div className="space-y-4 leading-relaxed text-sm sm:text-base text-stone-800 font-sans">
              <p className="first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-editorial first-letter:font-normal first-letter:text-[#E61E38] first-letter:float-left first-letter:mr-3 first-letter:leading-none">
                {artwork.curatorialStatement}
              </p>
              <div className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DACF] text-xs text-[#5A5852] font-mono-code mt-4">
                <strong>ARCHIVAL RECORD NOTE:</strong> All computational components and sensory software worklets are preserved in escrow with lifetime algorithmic reproducibility certificates.
              </div>
            </div>
          )}

          {/* Tab 2: Exhibition History */}
          {activeTab === 'provenance' && (
            <div className="space-y-5">
              <div>
                <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-2">
                  <Landmark className="w-4 h-4 text-[#E61E38]" />
                  <span>Public Exhibitions & Biennale Presentations</span>
                </h4>
                <ul className="space-y-2.5">
                  {artwork.exhibitionHistory.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E61E38] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-[#EBE4D8]">
                <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-stone-500 mb-2">
                  Permanent Collection Placement
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 font-mono-code">
                  {artwork.provenance}
                </p>
              </div>
            </div>
          )}

          {/* Tab 3: Technical Specifications */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-mono-code font-bold uppercase tracking-wider text-stone-500 mb-3 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#E61E38]" />
                  <span>Engineering & Fabrication Parameters</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  {artwork.specifications.map((spec, idx) => (
                    <div key={idx} className="p-3.5 sm:p-4 rounded-xl bg-[#FAF8F5] border border-[#E2DACF]">
                      <div className="text-[11px] text-stone-500 font-mono-code uppercase font-semibold">{spec.label}</div>
                      <div className="text-xs sm:text-sm font-bold text-stone-900 mt-1">{spec.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-stone-700 font-mono-code p-3 sm:p-3.5 rounded-xl bg-[#FAF8F5] border border-[#E2DACF]">
                <ShieldCheck className="w-4 h-4 text-[#E61E38] shrink-0" />
                <span>Certificate of Authenticity with cryptographic studio seal provided with each edition</span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Actions */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-t border-[#E2DACF] bg-[#F5F2EB] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="text-[11px] sm:text-xs text-[#5A5852] font-mono-code text-center sm:text-left">
            Exhibition loan & institutional acquisition dossier
          </div>

          <button
            onClick={() => {
              onClose();
              onOpenInquiry(artwork.title);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-extrabold uppercase tracking-wider text-white bg-[#E61E38] hover:bg-[#C4142B] rounded-xl transition-all shadow-md active:scale-[0.98] min-h-[44px]"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Inquire Concerning Acquisition</span>
          </button>
        </div>

      </div>
    </div>
  );
};
