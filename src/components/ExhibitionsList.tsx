import React, { useState, useRef, useCallback, useEffect } from 'react';
import { EXHIBITION_CHRONOLOGY } from '../data/artworksData';
import { Landmark, ChevronUp, ChevronDown } from 'lucide-react';

export const ExhibitionsList: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const total = EXHIBITION_CHRONOLOGY.length;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = isMobile ? Math.max(0, total - 1) : Math.max(0, total - 2);
  const itemHeight = isMobile ? 180 : 142;
  const gap = 12;

  const isDragging = useRef(false);
  const startY = useRef(0);
  const isWheeling = useRef(false);
  const wheelTimeout = useRef<NodeJS.Timeout | null>(null);

  const slideUp = useCallback(() => {
    setActiveIndex((prev) => Math.max(0, prev - 1));
  }, []);

  const slideDown = useCallback(() => {
    setActiveIndex((prev) => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Wheel handling with debounce/throttle
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (isWheeling.current) return;

    if (Math.abs(e.deltaY) > 25) {
      isWheeling.current = true;
      if (e.deltaY > 0) {
        slideDown();
      } else {
        slideUp();
      }

      if (wheelTimeout.current) clearTimeout(wheelTimeout.current);
      wheelTimeout.current = setTimeout(() => {
        isWheeling.current = false;
      }, 400);
    }
  };

  // Mouse Drag Vertically
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startY.current = e.clientY;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const deltaY = e.clientY - startY.current;
    if (Math.abs(deltaY) > 40) {
      if (deltaY < 0) {
        slideDown();
      } else {
        slideUp();
      }
      isDragging.current = false;
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Touch Swipe Vertically
  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const deltaY = e.touches[0].clientY - startY.current;
    if (Math.abs(deltaY) > 35) {
      if (deltaY < 0) {
        slideDown();
      } else {
        slideUp();
      }
      startY.current = e.touches[0].clientY;
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
              <span>03 // INSTITUTIONAL RECORD</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold uppercase text-[#14151A] tracking-tight">
              Exhibitions, <span className="font-editorial italic font-normal lowercase tracking-normal text-[#E61E38] text-3xl sm:text-4xl md:text-5xl">biennales</span> & Collections
            </h2>
            <p className="text-xs text-[#5A5852] mt-1 font-sans">
              Chronological milestones across museums, biennales, and public holdings.
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
                className="p-1.5 rounded-lg text-stone-600 hover:text-white hover:bg-[#E61E38] transition-all disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-stone-400 min-h-[34px] min-w-[34px] flex items-center justify-center"
                aria-label="Slide up to previous exhibition"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
              <button
                onClick={slideDown}
                disabled={activeIndex >= maxIndex}
                className="p-1.5 rounded-lg text-stone-600 hover:text-white hover:bg-[#E61E38] transition-all disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-stone-400 min-h-[34px] min-w-[34px] flex items-center justify-center"
                aria-label="Slide down to next exhibition"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Vertical Carousel Viewport */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Main Slider Frame */}
          <div
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            style={{ height: isMobile ? '196px' : '296px' }}
            className="lg:col-span-11 relative overflow-hidden rounded-xl sm:rounded-2xl cursor-grab active:cursor-grabbing border border-[#E2DACF] bg-[#EFEBE2]/80 p-2 sm:p-2.5 shadow-sm touch-pan-y"
          >
            {/* Sliding Track */}
            <div
              className="flex flex-col gap-3 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{
                transform: `translateY(-${activeIndex * (itemHeight + gap)}px)`,
              }}
            >
              {EXHIBITION_CHRONOLOGY.map((item, idx) => {
                const isVisible = isMobile 
                  ? idx === activeIndex 
                  : (idx === activeIndex || idx === activeIndex + 1);

                return (
                  <article
                    key={idx}
                    style={{ height: `${itemHeight}px` }}
                    className={`shrink-0 rounded-xl p-3.5 sm:p-5 flex flex-col justify-between transition-all duration-300 border ${
                      isVisible
                        ? 'bg-[#FAF8F5] border-[#E2DACF] hover:border-[#E61E38] text-stone-900 shadow-md'
                        : 'bg-[#FAF8F5]/50 border-[#E2DACF]/50 opacity-40 text-stone-400'
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

          {/* Right-Side Vertical Position Rail & Indicators (Hidden on mobile) */}
          <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center gap-2 h-full py-4">
            {Array.from({ length: maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`transition-all duration-300 rounded-full ${
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
            <span className="hidden sm:inline">Scroll mouse wheel or drag vertically to slide through records</span>
            <span className="sm:hidden">Swipe up or down to cycle records</span>
          </span>
          <span className="text-stone-400 text-[10px]">
            [Use ↑ / ↓ buttons]
          </span>
        </div>

      </div>
    </section>
  );
};
