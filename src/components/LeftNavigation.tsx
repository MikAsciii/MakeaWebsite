import React, { useState, useEffect } from 'react';
import { Menu, ArrowUpRight, BookOpen, Pin, PinOff, X } from 'lucide-react';
import { ARTIST } from '../data/artworksData';

interface LeftNavigationProps {
  onOpenCV: () => void;
  onNavigate: (sectionId: string) => void;
}

export const LeftNavigation: React.FC<LeftNavigationProps> = ({ onOpenCV, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Automatically keep drawer open if hovered or pinned on desktop
  useEffect(() => {
    setIsOpen(isHovered || isPinned);
  }, [isHovered, isPinned]);

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

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!isPinned) {
      setIsHovered(false);
    }
  };

  const navItems = [
    { number: '01', label: '3D Spatial Carousel', target: 'carousel', sub: 'Featured Acquisitions' },
    { number: '02', label: 'Catalog Raisonné', target: 'catalog', sub: 'Single-Row Editions Carousel' },
    { number: '03', label: 'Exhibition History', target: 'exhibitions', sub: 'Biennales & Public Collections' },
    { number: '04', label: 'Acquisitions & Inquiries', target: 'contact', sub: 'Studio & Gallery Representation' },
  ];

  const handleItemClick = (target: string) => {
    onNavigate(target);
    if (!isPinned) {
      setIsHovered(false);
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* ========================================================
          MOBILE TOP APP BAR (Visible on screens < 768px)
          Provides 100% full screen width for content on mobile
         ======================================================== */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-[#FAF8F5]/94 backdrop-blur-md border-b border-[#E2DACF] px-4 py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#E61E38] animate-pulse" />
          <span className="font-display font-extrabold uppercase text-sm tracking-tight text-[#14151A]">
            {ARTIST.name}
          </span>
          <span className="text-[10px] font-mono-code text-[#E61E38] font-bold px-1.5 py-0.5 rounded bg-red-50 border border-red-200">
            ATELIER
          </span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="p-2 -mr-1 rounded-xl text-stone-700 hover:text-white hover:bg-[#E61E38] border border-[#E2DACF] transition-all min-h-[44px] min-w-[44px] flex items-center justify-center bg-[#FAF8F5]"
          aria-label="Open Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          <Menu className="w-5 h-5" />
        </button>
      </header>

      {/* MOBILE SLIDE-OVER DRAWER (Full screen overlay on mobile) */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex flex-col bg-[#FAF8F5] animate-in fade-in duration-200">
          {/* Mobile Drawer Header */}
          <div className="px-5 py-4 border-b border-[#E2DACF] flex items-center justify-between bg-[#F5F2EB]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#E61E38] font-mono-code font-bold block">
                ATELIER FINE ARTS
              </span>
              <span className="font-display font-extrabold uppercase text-base text-[#14151A]">
                {ARTIST.name}
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 bg-[#FAF8F5] border border-[#E2DACF] min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Close Navigation Menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile Drawer Nav List */}
          <div className="flex-1 overflow-y-auto px-5 py-6 space-y-2">
            <div className="text-[10px] uppercase tracking-[0.2em] font-mono-code text-stone-400 mb-2 font-bold">
              Catalog Directory
            </div>
            {navItems.map((item) => (
              <button
                key={item.number}
                onClick={() => handleItemClick(item.target)}
                className="w-full text-left p-3.5 rounded-xl bg-white border border-[#E2DACF] hover:border-[#E61E38] transition-all flex items-center justify-between active:scale-[0.99] shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-mono-code text-[#E61E38] font-bold">
                      {item.number}
                    </span>
                    <span className="text-sm font-bold uppercase text-[#14151A] font-display">
                      {item.label}
                    </span>
                  </div>
                  <div className="text-xs text-[#5A5852] ml-6 mt-0.5 font-sans">
                    {item.sub}
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[#E61E38]" />
              </button>
            ))}

            <div className="pt-4 border-t border-[#E2DACF] space-y-3 mt-6">
              <button
                onClick={() => {
                  onOpenCV();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3.5 px-4 rounded-xl bg-[#EDE7DC] text-[#14151A] hover:bg-[#E61E38] hover:text-white border border-[#E2DACF] text-xs font-bold font-mono-code transition-all flex items-center justify-between shadow-xs"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#E61E38]" />
                  <span>Curriculum Vitae & Institutional Records</span>
                </span>
                <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-white border border-[#E2DACF]">PDF</span>
              </button>

              <div className="text-[11px] text-stone-500 font-mono-code p-3 rounded-xl bg-[#EDE7DC]/50 border border-[#E2DACF] flex items-center justify-between">
                <span>REPRESENTATION:</span>
                <span className="text-[#14151A] font-bold">GALERIE VANEAU</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          DESKTOP LEFT DRAWER & VERTICAL SPINE (Hidden on mobile)
         ======================================================== */}
      <div className="hidden md:block">
        {/* Invisible edge trigger zone on the far left to catch incoming cursor gestures */}
        <div
          onMouseEnter={handleMouseEnter}
          className="fixed top-0 left-0 bottom-0 w-8 z-50 pointer-events-auto"
          aria-hidden="true"
        />

        {/* Main Left Drawer / Rail */}
        <aside
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`fixed top-0 left-0 bottom-0 z-50 flex transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? 'translate-x-0' : '-translate-x-[calc(100%-48px)]'
          }`}
          aria-label="Fine Arts Navigation Index"
        >
          {/* Menu Panel Content */}
          <div className="w-80 sm:w-88 h-full bg-[#FAF8F5]/98 backdrop-blur-2xl border-r border-[#E2DACF] shadow-2xl flex flex-col justify-between p-7 text-[#14151A] overflow-y-auto">
            
            {/* Top Brand & Pin Lock Control */}
            <div className="border-b border-[#E2DACF] pb-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#E61E38] font-mono-code font-bold block">
                    ATELIER FINE ARTS
                  </span>
                  <h1 className="text-xl font-extrabold tracking-tight text-[#14151A] font-display uppercase mt-0.5">
                    {ARTIST.name}
                  </h1>
                  <span className="text-xs text-[#5A5852] font-mono-code">
                    {ARTIST.location}
                  </span>
                </div>

                {/* Pin button */}
                <button
                  onClick={() => setIsPinned(!isPinned)}
                  className={`p-2 rounded-lg transition-all ${
                    isPinned 
                      ? 'bg-red-50 text-[#E61E38] border border-red-200 shadow-xs' 
                      : 'text-stone-500 hover:text-stone-900 hover:bg-[#EFEBE2]'
                  }`}
                  title={isPinned ? 'Unpin navigation menu' : 'Keep menu pinned open'}
                  aria-pressed={isPinned}
                >
                  {isPinned ? <Pin className="w-4 h-4" /> : <PinOff className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Nav Items List */}
            <nav className="my-auto py-6 space-y-1.5">
              <div className="text-[10px] uppercase tracking-[0.2em] font-mono-code text-stone-400 mb-3 px-2 font-bold">
                Catalog Navigation
              </div>
              {navItems.map((item) => (
                <button
                  key={item.number}
                  onClick={() => handleItemClick(item.target)}
                  className="w-full group text-left px-3 py-2.5 rounded-xl hover:bg-[#EFEBE2] transition-all duration-200 flex items-baseline justify-between"
                >
                  <div>
                    <div className="flex items-baseline gap-2.5">
                      <span className="text-xs font-mono-code text-[#E61E38] font-bold tabular-nums">
                        {item.number}
                      </span>
                      <span className="text-sm font-bold uppercase tracking-tight text-[#14151A] group-hover:text-[#E61E38] group-hover:translate-x-1 transition-all font-display">
                        {item.label}
                      </span>
                    </div>
                    <div className="text-[11px] text-[#5A5852] ml-6 mt-0.5 font-sans">
                      {item.sub}
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#E61E38] opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </nav>

            {/* Bottom Utility Actions */}
            <div className="pt-6 border-t border-[#E2DACF] space-y-3">
              <button
                onClick={() => {
                  onOpenCV();
                  if (!isPinned) setIsHovered(false);
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-[#EDE7DC] hover:bg-[#E61E38] hover:text-white border border-[#E2DACF] hover:border-[#E61E38] text-xs font-bold font-mono-code text-stone-800 transition-all flex items-center justify-between shadow-xs"
              >
                <span className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-[#E61E38] group-hover:text-white" />
                  <span>Artist CV & Records</span>
                </span>
                <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-[#FAF8F5] border border-[#E2DACF] text-stone-600">PDF</span>
              </button>

              <div className="text-[10px] text-stone-500 font-mono-code flex items-center justify-between pt-1">
                <span>REPRESENTATION:</span>
                <span className="text-[#14151A] font-bold">GALERIE VANEAU</span>
              </div>
            </div>
          </div>

          {/* Vertical Minimal Spine / Indicator Strip on the right edge of the aside */}
          <div
            onClick={() => setIsPinned(!isPinned)}
            className="w-12 h-full bg-[#FAF8F5]/98 backdrop-blur-md border-r border-[#E2DACF] flex flex-col items-center justify-between py-6 cursor-pointer select-none hover:bg-[#EFEBE2] transition-colors"
            title="Click to toggle navigation menu"
          >
            {/* Top Icon */}
            <div className="p-1.5 rounded text-[#E61E38]">
              <Menu className="w-4 h-4" />
            </div>

            {/* Vertical Monogram / Title */}
            <div className="writing-vertical-lr rotate-180 flex items-center gap-4 text-xs font-mono-code uppercase tracking-[0.25em] text-stone-600">
              <span className="text-[#E61E38] font-bold">{ARTIST.name.toUpperCase()}</span>
              <span className="text-stone-300">·</span>
              <span>CATALOGUE</span>
              <span className="text-stone-300">·</span>
              <span>INDEX</span>
            </div>

            {/* Bottom indicator dot */}
            <div className="w-2 h-2 rounded-full bg-[#E61E38]" />
          </div>
        </aside>

        {/* Dim backdrop when drawer is open and not pinned */}
        {isOpen && !isPinned && (
          <div
            onClick={() => setIsHovered(false)}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-xs transition-opacity duration-300"
            aria-hidden="true"
          />
        )}
      </div>
    </>
  );
};
