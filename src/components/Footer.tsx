import React from 'react';
import { ArrowUp } from 'lucide-react';
import { ARTIST } from '../data/artworksData';

interface FooterProps {
  onOpenCV?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-[#E2DACF] bg-[#121318] py-10 sm:py-12 text-xs text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 md:pl-16 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Catalog Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
          <span className="font-display font-extrabold uppercase text-sm sm:text-base text-white tracking-tight">
            {ARTIST.name}
          </span>
          <span aria-hidden="true" className="hidden sm:inline text-[#E61E38]">·</span>
          <span className="text-stone-400 font-mono-code text-[10px] sm:text-[11px]">
            {ARTIST.discipline} © {new Date().getFullYear()}
          </span>
        </div>

        {/* Center: Institutional links */}
        <div className="flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2 text-stone-400 font-mono-code text-[11px]">
          <a href="#carousel" className="hover:text-[#E61E38] transition-colors py-1">Career Highlights</a>
          <a href="#catalog" className="hover:text-[#E61E38] transition-colors py-1">Recent Activities & Projects</a>
          <a href="#exhibitions" className="hover:text-[#E61E38] transition-colors py-1">Upcoming Projects</a>
          <a href="#contact" className="hover:text-[#E61E38] transition-colors py-1">Contact & Inquiries</a>
        </div>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          className="p-2 sm:p-2.5 rounded-xl bg-stone-900 hover:bg-[#E61E38] text-stone-300 hover:text-white border border-stone-700 hover:border-[#E61E38] transition-all flex items-center gap-1.5 font-mono-code text-[11px] min-h-[38px] cursor-pointer"
          aria-label="Back to top"
        >
          <span>Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>
    </footer>
  );
};
