import React, { useState, useMemo, useRef } from 'react';
import { ARTWORKS } from '../data/artworksData';
import { Artwork } from '../types/portfolio';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface CatalogRaisonneProps {
  onSelectArtwork: (artwork: Artwork) => void;
}

export const CatalogRaisonne: React.FC<CatalogRaisonneProps> = ({ onSelectArtwork }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCursorGrabbing, setIsCursorGrabbing] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Mouse drag-to-scroll tracking refs
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const hasDragged = useRef(false);

  const categories = [
    { key: 'all', label: 'All Catalogued Works', count: ARTWORKS.length },
    { key: 'sculpture', label: 'Sculpture & Optics', count: ARTWORKS.filter(a => a.category === 'sculpture').length },
    { key: 'spatial', label: 'Spatial Sound & GLSL', count: ARTWORKS.filter(a => a.category === 'spatial').length },
    { key: 'painting', label: 'Mixed Media & Pigment', count: ARTWORKS.filter(a => a.category === 'painting').length },
    { key: 'generative', label: 'Generative Typography & Data', count: ARTWORKS.filter(a => a.category === 'generative').length },
  ];

  const filteredArtworks = useMemo(() => {
    if (selectedCategory === 'all') return ARTWORKS;
    return ARTWORKS.filter(a => a.category === selectedCategory);
  }, [selectedCategory]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = window.innerWidth < 640 ? 260 : 340;
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  // Drag to scroll handlers for desktop mice
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    isDragging.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
    scrollLeftPos.current = scrollContainerRef.current.scrollLeft;
    setIsCursorGrabbing(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(x - startX.current) > 6) {
      hasDragged.current = true;
    }
    scrollContainerRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    isDragging.current = false;
    setIsCursorGrabbing(false);
  };

  return (
    <section id="catalog" className="py-16 sm:py-20 md:py-24 relative border-t border-[#E2DACF] select-none overflow-hidden">
      
      {/* 30% Opacity Section Background Image */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="/src/assets/images/painterly_catalog_bg_1791185361201.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F2EB]/50 via-transparent to-[#F5F2EB]/50" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 md:pl-16">
        
        {/* Curatorial Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 pb-4 sm:pb-5 border-b border-[#DDD5C8]">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#FAF8F5] border border-[#E61E38]/30 text-[10px] font-mono-code uppercase tracking-wider text-[#E61E38] mb-2 font-bold shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E61E38]" />
              <span>02 // CATALOG RAISONNÉ</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold uppercase text-[#14151A] tracking-tight">
              Archived <span className="font-editorial italic font-normal lowercase tracking-normal text-[#E61E38] text-3xl sm:text-4xl md:text-5xl">editions</span> & Registry
            </h2>
            <p className="text-xs text-[#5A5852] mt-1 font-sans">
              Swipe or drag horizontally to inspect catalogued works.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
            {/* Filter buttons (Horizontally scrollable with smooth touch on mobile) */}
            <div className="flex items-center gap-1.5 p-1 bg-[#FAF8F5] border border-[#E2DACF] rounded-xl overflow-x-auto max-w-full shadow-xs scrollbar-none touch-pan-x">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 flex items-center gap-1.5 min-h-[34px] ${
                    selectedCategory === cat.key
                      ? 'bg-[#E61E38] text-white font-extrabold shadow-sm'
                      : 'text-stone-600 hover:text-stone-900 hover:bg-[#EFEBE2]'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`text-[10px] font-mono-code font-bold ${selectedCategory === cat.key ? 'text-white/80' : 'text-stone-400'}`}>
                    {cat.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Slider Navigation Buttons */}
            <div className="hidden sm:flex items-center gap-1.5 self-end sm:self-auto">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#E61E38] text-stone-700 hover:text-white border border-[#E2DACF] hover:border-[#E61E38] transition-all shadow-xs min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Scroll left in catalog"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-lg bg-[#FAF8F5] hover:bg-[#E61E38] text-stone-700 hover:text-white border border-[#E2DACF] hover:border-[#E61E38] transition-all shadow-xs min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label="Scroll right in catalog"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Compact Single-Row Sliding Carousel Track with Mobile Snap & Desktop Drag */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUpOrLeave}
            onMouseLeave={handleMouseUpOrLeave}
            className={`flex gap-3.5 sm:gap-5 overflow-x-auto pb-4 pt-1 scrollbar-none select-none scroll-smooth snap-x snap-mandatory touch-pan-x ${
              isCursorGrabbing ? 'cursor-grabbing' : 'cursor-grab'
            }`}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}
          >
            {filteredArtworks.map((artwork) => (
              <article
                key={artwork.id}
                onClick={() => {
                  if (!hasDragged.current) {
                    onSelectArtwork(artwork);
                  }
                }}
                className="w-[245px] xs:w-[270px] sm:w-[300px] md:w-[320px] shrink-0 snap-start group relative rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#E2DACF] hover:border-[#E61E38] transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 select-none"
              >
                {/* Media Plate */}
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#EFEBE3]">
                  <img
                    src={artwork.image}
                    alt={artwork.title}
                    draggable={false}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out pointer-events-none select-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

                  {/* Top Numbers */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 sm:top-3 sm:left-3 sm:right-3 flex items-center justify-between text-xs drop-shadow">
                    <span className="font-mono-code text-[10px] sm:text-[11px] text-white font-bold px-2 py-0.5 rounded bg-[#E61E38] shadow-xs">
                      {artwork.catalogNumber}
                    </span>
                    <span className="font-mono-code text-[9px] sm:text-[10px] text-[#14151A] font-bold px-1.5 py-0.5 rounded bg-[#FAF8F5]/95 border border-[#E2DACF]">
                      {artwork.year}
                    </span>
                  </div>

                  {/* Hover / Tap Inspect Cue */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-xs">
                    <div className="px-3.5 py-1.5 rounded-lg bg-[#E61E38] text-white font-extrabold uppercase text-xs flex items-center gap-1.5 shadow-md">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Inspect</span>
                    </div>
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-3.5 sm:p-5 flex flex-col justify-between flex-1 bg-[#FAF8F5]">
                  <div>
                    <div className="text-[9px] sm:text-[10px] font-mono-code uppercase tracking-wider text-[#E61E38] font-bold mb-1">
                      {artwork.categoryLabel}
                    </div>
                    <h3 className="text-lg sm:text-xl font-editorial italic font-normal text-[#14151A] group-hover:text-[#E61E38] transition-colors leading-snug line-clamp-1">
                      {artwork.title}
                    </h3>
                    <p className="text-[10px] sm:text-[11px] text-[#5A5852] line-clamp-1 mt-0.5 sm:mt-1 font-sans">
                      {artwork.medium}
                    </p>
                  </div>

                  <div className="pt-2.5 sm:pt-3 mt-2.5 sm:mt-3 border-t border-[#EBE4D8] flex items-center justify-between text-[10px] sm:text-[11px] font-mono-code text-[#5A5852]">
                    <span className="truncate max-w-[140px] sm:max-w-[170px]">{artwork.dimensions.split('(')[0]}</span>
                    <span className="text-[#E61E38] font-bold shrink-0">{artwork.edition.split('+')[0]}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Bottom Drag / Scroll Indicator */}
          <div className="flex items-center justify-between text-[11px] font-mono-code text-[#5A5852] mt-2 px-1">
            <span className="flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E61E38]" />
              <span className="hidden sm:inline">Click and drag horizontally with cursor to glide across registry</span>
              <span className="sm:hidden">Swipe sideways to browse artworks</span>
            </span>
            <div className="sm:hidden flex gap-1.5">
              <button onClick={() => scroll('left')} className="p-1.5 rounded-lg bg-[#FAF8F5] border border-[#E2DACF] text-stone-600 min-h-[32px] min-w-[32px] flex items-center justify-center">
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button onClick={() => scroll('right')} className="p-1.5 rounded-lg bg-[#FAF8F5] border border-[#E2DACF] text-stone-600 min-h-[32px] min-w-[32px] flex items-center justify-center">
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
