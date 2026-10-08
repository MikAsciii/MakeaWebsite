import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ARTWORKS } from '../data/artworksData';
import { Artwork } from '../types/portfolio';
import { ChevronLeft, ChevronRight, Eye, Pause, Play, Maximize2 } from 'lucide-react';

interface ThreeDimensionalCarouselProps {
  onSelectArtwork: (artwork: Artwork) => void;
}

const CAROUSEL_LIMIT = 6;

export const ThreeDimensionalCarousel: React.FC<ThreeDimensionalCarouselProps> = ({ onSelectArtwork }) => {
  // Continuous rotation angle in degrees
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isInteractiveDrag, setIsInteractiveDrag] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [radius, setRadius] = useState(370);
  const [cardWidth, setCardWidth] = useState(330);

  // Drag tracking refs
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartAngle = useRef(0);
  const lastX = useRef(0);
  const lastTime = useRef(0);
  const velocity = useRef(0);
  const hasMoved = useRef(false);
  const carouselContainerRef = useRef<HTMLDivElement | null>(null);

  // Showcase exactly 6 curated artworks in the 3D spatial cylinder
  const carouselArtworks = ARTWORKS.slice(0, CAROUSEL_LIMIT);
  const total = carouselArtworks.length;
  const angleStep = 360 / total; // exactly 60 deg

  // Active artwork calculated from the closest slot
  const currentSlot = Math.round(rotationAngle / angleStep);
  const activeIndex = ((currentSlot % total) + total) % total;

  // Responsive radius & card width calculation
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 380) {
        setRadius(195);
        setCardWidth(215);
      } else if (width < 480) {
        setRadius(220);
        setCardWidth(240);
      } else if (width < 640) {
        setRadius(245);
        setCardWidth(260);
      } else if (width < 1024) {
        setRadius(320);
        setCardWidth(295);
      } else {
        setRadius(410);
        setCardWidth(350);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Programmatic steps
  const nextSlide = useCallback(() => {
    setRotationAngle((prev) => {
      const nearest = Math.round(prev / angleStep);
      return (nearest + 1) * angleStep;
    });
  }, [angleStep]);

  const prevSlide = useCallback(() => {
    setRotationAngle((prev) => {
      const nearest = Math.round(prev / angleStep);
      return (nearest - 1) * angleStep;
    });
  }, [angleStep]);

  const goToIndex = useCallback((targetIdx: number) => {
    setRotationAngle((prev) => {
      const nearest = Math.round(prev / angleStep);
      const currentNorm = ((nearest % total) + total) % total;
      let diff = (targetIdx - currentNorm) % total;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      return (nearest + diff) * angleStep;
    });
  }, [total, angleStep]);

  // Autoplay timer
  useEffect(() => {
    if (!isAutoPlaying || isInteractiveDrag) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isInteractiveDrag, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Drag physics sensitivity based on cylinder radius
  const degreesPerPixel = (360 / (radius * 2 * Math.PI)) * 0.85;

  // Mouse Drag Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    hasMoved.current = false;
    dragStartX.current = e.clientX;
    lastX.current = e.clientX;
    lastTime.current = performance.now();
    velocity.current = 0;
    dragStartAngle.current = rotationAngle;
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const clientX = e.clientX;
    const deltaX = clientX - dragStartX.current;

    if (Math.abs(deltaX) > 4) {
      if (!hasMoved.current) {
        hasMoved.current = true;
        setIsInteractiveDrag(true);
      }

      const now = performance.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        velocity.current = (clientX - lastX.current) / dt;
      }
      lastX.current = clientX;
      lastTime.current = now;

      // 1:1 direct manipulation of angle in degrees
      const newAngle = dragStartAngle.current - deltaX * degreesPerPixel;
      setRotationAngle(newAngle);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsInteractiveDrag(false);

    if (hasMoved.current) {
      // Calculate inertial momentum flick/fling
      const flickDistance = velocity.current * 160 * degreesPerPixel;
      const projectedAngle = rotationAngle - flickDistance;
      const nearestSlot = Math.round(projectedAngle / angleStep);
      setRotationAngle(nearestSlot * angleStep);
    } else {
      // Clean tap/click, snap to closest slot
      const nearestSlot = Math.round(rotationAngle / angleStep);
      setRotationAngle(nearestSlot * angleStep);
    }
  };

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    isDragging.current = true;
    hasMoved.current = false;
    dragStartX.current = touch.clientX;
    lastX.current = touch.clientX;
    lastTime.current = performance.now();
    velocity.current = 0;
    dragStartAngle.current = rotationAngle;
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    const touch = e.touches[0];
    const clientX = touch.clientX;
    const deltaX = clientX - dragStartX.current;

    if (Math.abs(deltaX) > 5) {
      if (!hasMoved.current) {
        hasMoved.current = true;
        setIsInteractiveDrag(true);
      }

      const now = performance.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        velocity.current = (clientX - lastX.current) / dt;
      }
      lastX.current = clientX;
      lastTime.current = now;

      const newAngle = dragStartAngle.current - deltaX * degreesPerPixel;
      setRotationAngle(newAngle);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setIsInteractiveDrag(false);

    if (hasMoved.current) {
      const flickDistance = velocity.current * 180 * degreesPerPixel;
      const projectedAngle = rotationAngle - flickDistance;
      const nearestSlot = Math.round(projectedAngle / angleStep);
      setRotationAngle(nearestSlot * angleStep);
    } else {
      const nearestSlot = Math.round(rotationAngle / angleStep);
      setRotationAngle(nearestSlot * angleStep);
    }
  };

  // Global mouseup listener so dragging outside the element still releases cleanly
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging.current) {
        handleMouseUp();
      }
    };
    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => window.removeEventListener('mouseup', handleGlobalMouseUp);
  });

  const currentArtwork = carouselArtworks[activeIndex];

  return (
    <section id="carousel" className="relative pt-20 pb-16 sm:pt-24 sm:pb-20 md:pt-[108px] md:pb-28 overflow-hidden select-none">
      
      {/* 30% Opacity Section Background Image */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="/src/assets/images/painterly_carousel_bg_1791185343984.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F2EB]/40 via-transparent to-[#F5F2EB]/60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 md:pl-16">
        
        {/* Curatorial Header */}
        <div className="text-center max-w-2xl mx-auto mb-[54px] sm:mb-[70px] md:mb-[78px]">
          <div className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-md bg-[#121318] text-white text-[10px] font-mono-code uppercase tracking-wider mb-2.5 sm:mb-3 font-bold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E61E38]" />
            <span>MIKASCIII // FEATURED WORKS </span>
            <span className="text-[#E61E38]">·</span>
            <span className="text-stone-300">EST. 2023</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-[#14151A] tracking-tight uppercase leading-tight sm:leading-none">
            Artworks and Illustrations <span className="font-editorial italic font-normal lowercase tracking-normal text-[#E61E38] text-2xl sm:text-4xl md:text-5xl lg:text-6xl block sm:inline mt-0.5 sm:mt-0">featured projects and highlights</span>
          </h1>
          
          <p className="text-xs sm:text-sm text-[#5A5852] mt-2 sm:mt-3 max-w-lg mx-auto leading-relaxed font-sans px-2">
            Character concepts, Graphic Illustrations, and Project highlights.
          </p>
        </div>

        {/* 3D Carousel Stage with Direct Manipulation Drag & Slide */}
        <div
          ref={carouselContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{ perspective: '1600px', touchAction: 'pan-y' }}
          className={`relative h-[390px] sm:h-[470px] md:h-[520px] w-full mx-auto flex items-center justify-center my-2 sm:my-4 select-none ${
            isInteractiveDrag ? 'cursor-grabbing' : 'cursor-grab'
          }`}
        >
          {/* Rotating 3D World */}
          <div
            className="relative w-full h-full flex items-center justify-center pointer-events-auto"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateY(${-rotationAngle}deg)`,
              transition: isInteractiveDrag 
                ? 'none' 
                : 'transform 700ms cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {carouselArtworks.map((artwork, idx) => {
              const itemAngle = idx * angleStep;
              const isCurrent = idx === activeIndex;

              return (
                <div
                  key={artwork.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    // If user was actively dragging or flinging, prevent accidental click
                    if (hasMoved.current) return;
                    if (isCurrent) {
                      onSelectArtwork(artwork);
                    } else {
                      goToIndex(idx);
                    }
                  }}
                  style={{
                    width: `${cardWidth}px`,
                    transformStyle: 'preserve-3d',
                    transform: `rotateY(${itemAngle}deg) translateZ(${radius}px)`,
                  }}
                  className={`absolute rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 group ${
                    isCurrent
                      ? 'shadow-[0_20px_45px_rgba(20,21,26,0.18)] border-2 border-[#E61E38] z-20 scale-105 bg-[#FAF8F5]'
                      : 'border border-[#E2DACF] opacity-75 hover:opacity-95 z-10 bg-[#FAF8F5] shadow-md'
                  }`}
                >
                  {/* Card Artwork Image Container */}
                  <div className="relative aspect-[4/5] w-full bg-[#EFEBE3] overflow-hidden">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      draggable={false}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 pointer-events-none select-none"
                    />

                    {/* Gradient Overlay for Readable Text */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/20 pointer-events-none" />

                    {/* Top Accession Tag */}
                    <div className="absolute top-3 left-3 right-3 sm:top-4 sm:left-4 sm:right-4 flex items-center justify-between text-xs drop-shadow pointer-events-none">
                      <span className="font-mono-code text-[10px] sm:text-[11px] text-white font-bold tracking-wider px-2 py-0.5 rounded bg-[#E61E38] shadow-sm">
                        {artwork.catalogNumber}
                      </span>
                      <span className="font-mono-code text-[9px] sm:text-[10px] text-[#14151A] font-bold px-1.5 py-0.5 rounded bg-[#FAF8F5]/95 border border-[#E2DACF]">
                        {artwork.year}
                      </span>
                    </div>

                    {/* Center Inspect Cue on hover / active */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/40 backdrop-blur-xs pointer-events-none">
                      <div className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-[#E61E38] text-white font-extrabold text-[11px] sm:text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                        <Eye className="w-3.5 h-3.5" />
                        <span>{isCurrent ? 'View Project' : 'Rotate to Front'}</span>
                      </div>
                    </div>

                    {/* Bottom Metadata Lockup */}
                    <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-left pointer-events-none">
                      <div className="text-[9px] sm:text-[10px] font-mono-code uppercase tracking-wider text-red-200 font-bold mb-0.5">
                        {artwork.categoryLabel}
                      </div>
                      <h3 className="text-base sm:text-xl md:text-2xl font-editorial italic font-normal text-white tracking-tight leading-snug line-clamp-1 drop-shadow">
                        {artwork.title}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-stone-200 line-clamp-1 mt-0.5 font-sans">
                        {artwork.medium}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Left / Right Carousel Navigation Controls */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-1 sm:left-3 md:left-6 z-30 p-2 sm:p-3 rounded-full bg-[#FAF8F5]/90 hover:bg-[#E61E38] text-stone-800 hover:text-white border border-[#E2DACF] hover:border-[#E61E38] transition-all duration-200 shadow-md focus:outline-none min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
            aria-label="Previous artwork in 3D carousel"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-1 sm:right-3 md:right-6 z-30 p-2 sm:p-3 rounded-full bg-[#FAF8F5]/90 hover:bg-[#E61E38] text-stone-800 hover:text-white border border-[#E2DACF] hover:border-[#E61E38] transition-all duration-200 shadow-md focus:outline-none min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
            aria-label="Next artwork in 3D carousel"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Carousel Understage: Active Artwork Caption & Controls */}
        <div className="mt-[54px] sm:mt-[70px] md:mt-[86px] max-w-3xl mx-auto p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#E2DACF] shadow-xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6 pb-4 sm:pb-6 border-b border-[#EBE4D8]">
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2 font-mono-code text-[11px] sm:text-xs text-[#E61E38] mb-1 font-bold">
                <span>{currentArtwork.catalogNumber}</span>
                <span aria-hidden="true" className="text-stone-300">/</span>
                <span>{currentArtwork.accessionNumber}</span>
                <span aria-hidden="true" className="text-stone-300">/</span>
                <span className="text-stone-700">{currentArtwork.edition}</span>
              </div>
              
              <h2 className="text-xl sm:text-2xl md:text-3xl font-editorial italic font-normal text-[#14151A] tracking-tight">
                {currentArtwork.title}
              </h2>
              
              <div className="text-xs text-[#5A5852] mt-1 max-w-xl font-sans">
                {currentArtwork.medium}
              </div>
            </div>

            {/* Solid Button */}
            <button
              onClick={() => onSelectArtwork(currentArtwork)}
              className="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl bg-[#E61E38] hover:bg-[#C4142B] text-white font-extrabold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-md hover:scale-[1.02] active:scale-[0.98] shrink-0 min-h-[44px] cursor-pointer"
            >
              <span>Examine Dossier</span>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Understage Specs Bar & Indicators */}
          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#5A5852]">
            <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-[11px] sm:text-xs">
              <span>Dim: <strong className="text-stone-900 font-mono-code">{currentArtwork.dimensions.split('(')[0]}</strong></span>
              <span aria-hidden="true" className="text-stone-300">·</span>
              <span>Holding: <strong className="text-stone-900 font-mono-code truncate max-w-[200px]">{currentArtwork.provenance.split(';')[0]}</strong></span>
            </div>

            {/* Carousel navigation indicators */}
            <div className="flex items-center justify-between sm:justify-end gap-2 pt-1 sm:pt-0 border-t sm:border-t-0 border-[#EBE4D8]/60">
              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className="p-1.5 text-stone-500 hover:text-[#E61E38] transition-colors rounded-lg bg-white sm:bg-transparent border sm:border-0 border-[#E2DACF] cursor-pointer"
                title={isAutoPlaying ? 'Pause rotation' : 'Resume rotation'}
                aria-label={isAutoPlaying ? 'Pause rotation' : 'Resume rotation'}
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <div className="flex items-center gap-1.5 ml-2">
                {carouselArtworks.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                      i === activeIndex 
                        ? 'w-6 sm:w-7 bg-[#E61E38]' 
                        : 'w-1.5 bg-stone-300 hover:bg-stone-500'
                    }`}
                    aria-label={`Jump to artwork ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
