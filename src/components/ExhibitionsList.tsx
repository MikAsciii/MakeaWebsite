import React, { useState, useRef, useCallback, useEffect } from 'react';
import { EXHIBITION_CHRONOLOGY } from '../data/artworksData';
import { Landmark, ChevronUp, ChevronDown } from 'lucide-react';

export const ExhibitionsList: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const total = EXHIBITION_CHRONOLOGY.length;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const itemHeight = isMobile ? 180 : 142;
  const gap = 12;
  const stride = itemHeight + gap;
  const maxIndex = isMobile ? Math.max(0, total - 1) : Math.max(0, total - 2);

  // Programmatic smooth scroll to item
  const scrollToItem = useCallback((targetIndex: number) => {
    const clamped = Math.max(0, Math.min(maxIndex, targetIndex));
    setActiveIndex(clamped);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: clamped * stride,
        behavior: 'smooth',
      });
    }
  }, [maxIndex, stride]);

  const slideUp = () => {
    scrollToItem(activeIndex - 1);
  };

  const slideDown = () => {
    scrollToItem(activeIndex + 1);
  };

  // Sync active indicator with user's smooth scroll position
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const scrollTop = scrollContainerRef.current.scrollTop;
    const computedIndex = Math.round(scrollTop / stride);
    const clamped = Math.max(0, Math.min(maxIndex, computedIndex));
    if (clamped !== activeIndex) {
      setActiveIndex(clamped);
    }
  };

  return (
    <section id="exhibitions" className="py-16 sm:py-20 md:py-24 relative border-t border-[#E2DACF] select-none overflow-hidden">
      
      {/* 30% Opacity Section Background Image */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="/src/assets/images/painterly_exhibit_bg_1791185375226.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F2EB]/50 via-transparent to-[#F5F2EB]/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 md:pl-16">
        
        {/* Curatorial Header with Nav Controls */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 pb-4 sm:pb-5 border-b border-[#DDD5C8]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#FAF8F5] border border-[#E61E38]/30 text-[10px] font-mono-code uppercase tracking-wider text-[#E61E38] mb-2 font-bold shadow-xs">
              <Landmark className="w-3 h-3" />
              <span>03 // UPCOMING PROJECTS</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold uppercase text-[#14151A] tracking-tight">
              Upcoming <span className="font-editorial italic font-normal lowercase tracking-normal text-[#E61E38] text-3xl sm:text-4xl md:text-5xl">illustrations & other projects</span>
            </h2>
            <p className="text-xs text-[#5A5852] mt-1 font-sans">
              Projects I'm currently working on and what you can expect in the future.
            </p>
          </div>

          {/* Vertical Slider Controller Lockup */}
          <div className="flex items-center justify-between sm:justify-end gap-3 self-stretch sm:self-auto pt-2 sm:pt-0">
            <span className="font-mono-code text-xs text-[#5A5852] tabular-nums">
              Showing <strong className="text-[#E61E38]">
                {isMobile 
                  ? String(activeIndex + 1).padStart(2, '0') 
                  : `${String(activeIndex + 1).padStart(2, '0')}–${String(Math.min(total, activeIndex + 2)).padStart(2, '0')}`
                }
              </strong> of {String(total).padStart(2, '0')}
            </span>

            <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F5] border border-[#E2DACF] rounded-xl shadow-xs">
              <button
                onClick={slideUp}
                disabled={activeIndex === 0}
                className="p-1.5 rounded-lg text-stone-600 hover:text-white hover:bg-[#E61E38] transition-all disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-stone-400 min-h-[34px] min-w-[34px] flex items-center justify-center cursor-pointer"
                aria-label="Slide up to previous exhibition"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={slideDown}
                disabled={activeIndex >= maxIndex}
                className="p-1.5 rounded-lg text-stone-600 hover:text-white hover:bg-[#E61E38] transition-all disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-stone-400 min-h-[34px] min-w-[34px] flex items-center justify-center cursor-pointer"
                aria-label="Slide down to next exhibition"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Vertical Smooth Scroll Viewport */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Main Smooth Scroll Viewport with Native Acceleration & Scroll Snap */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            style={{ 
              height: isMobile ? '200px' : '304px',
              WebkitOverflowScrolling: 'touch',
            }}
            className="lg:col-span-11 relative overflow-y-auto scroll-smooth snap-y snap-mandatory rounded-xl sm:rounded-2xl border border-[#E2DACF] bg-[#EFEBE2]/80 p-2 sm:p-2.5 shadow-sm touch-pan-y"
          >
            {/* Scrollable Track */}
            <div className="flex flex-col gap-3">
              {EXHIBITION_CHRONOLOGY.map((item, idx) => {
                const isVisible = isMobile 
                  ? idx === activeIndex 
                  : (idx === activeIndex || idx === activeIndex + 1);

                return (
                  <article
                    key={idx}
                    style={{ minHeight: `${itemHeight}px`, height: `${itemHeight}px` }}
                    className={`snap-start shrink-0 rounded-xl p-3.5 sm:p-5 flex flex-col justify-between transition-all duration-300 border ${
                      isVisible
                        ? 'bg-[#FAF8F5] border-[#E2DACF] hover:border-[#E61E38] text-stone-900 shadow-md'
                        : 'bg-[#FAF8F5]/65 border-[#E2DACF]/60 opacity-60 text-stone-500'
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-3 lg:gap-6 items-start lg:items-baseline">
                      
                      {/* Year & Type (3 cols) */}
                      <div className="lg:col-span-3 flex lg:flex-col items-center lg:items-start justify-between">
                        <span className="text-lg sm:text-xl font-bold font-mono-code text-[#14151A] tabular-nums">
                          {item.year}
                        </span>
                        <span className="text-[10px] font-mono-code text-[#E61E38] uppercase tracking-wider mt-0.5 font-bold">
                          {item.type}
                        </span>
                      </div>

                      {/* Title & Venue (5 cols) */}
                      <div className="lg:col-span-5">
                        <h3 className="text-base sm:text-lg font-editorial italic font-normal text-[#14151A] tracking-tight line-clamp-1">
                          {item.title}
                        </h3>
                        <div className="text-xs text-stone-700 font-medium mt-0.5 flex items-center gap-1.5 truncate font-sans">
                          <span>{item.institution}</span>
                          <span aria-hidden="true" className="text-[#E61E38]">·</span>
                          <span className="text-[#5A5852]">{item.location}</span>
                        </div>
                        <div className="text-[10px] text-stone-500 font-mono-code mt-0.5 truncate">
                          Curated by {item.curator}
                        </div>
                      </div>

                      {/* Notes (4 cols) */}
                      <div className="lg:col-span-4 text-xs text-[#5A5852] font-sans leading-relaxed line-clamp-2">
                        {item.notes}
                      </div>

                    </div>

                    {/* Bottom subtle provenance strip */}
                    <div className="pt-1.5 sm:pt-2 border-t border-[#EBE4D8] flex items-center justify-between text-[9px] sm:text-[10px] font-mono-code text-stone-500">
                      <span className="text-[#E61E38] font-bold">RECORD // 0{idx + 1}</span>
                      <span>VERIFIED INSTITUTIONAL ARCHIVE</span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Right-Side Vertical Position Rail & Indicators */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center gap-2 h-full py-4">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToItem(i)}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  i === activeIndex
                    ? 'w-1.5 h-8 bg-[#E61E38]'
                    : 'w-1.5 h-2 bg-stone-300 hover:bg-stone-500'
                }`}
                aria-label={`Jump to exhibition milestone ${i + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Drag / Wheel Hint */}
        <div className="flex items-center justify-between text-[11px] font-mono-code text-[#5A5852] mt-3 px-1">
          <span className="flex items-center gap-1.5">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E61E38]" />
            <span className="hidden sm:inline">Some events and projects may be cancelled</span>
            <span className="sm:hidden">Swipe up or down smoothly to browse records</span>
          </span>
          <span className="text-stone-400 text-[10px]">
            [Smooth snap enabled]
          </span>
        </div>

      </div>
    </section>
  );
};
