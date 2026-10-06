import React, { useState } from 'react';
import { LeftNavigation } from './components/LeftNavigation';
import { ThreeDimensionalCarousel } from './components/ThreeDimensionalCarousel';
import { CatalogRaisonne } from './components/CatalogRaisonne';
import { ExhibitionsList } from './components/ExhibitionsList';
import { AtelierAndContact } from './components/AtelierAndContact';
import { ArtworkDossierModal } from './components/ArtworkDossierModal';
import { ResumeModal } from './components/ResumeModal';
import { Footer } from './components/Footer';
import { Artwork } from './types/portfolio';

export default function App() {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [isCVOpen, setIsCVOpen] = useState(false);
  const [inquiryArtworkTitle, setInquiryArtworkTitle] = useState<string>('');

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      const isMobile = window.innerWidth < 768;
      const yOffset = isMobile ? -56 : 0;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const handleOpenInquiry = (artworkTitle: string) => {
    setInquiryArtworkTitle(artworkTitle);
    handleNavigate('contact');
  };

  return (
    <div className="min-h-screen bg-[#F5F2EB] text-[#14151A] flex flex-col font-sans selection:bg-[#E61E38] selection:text-white abstract-glitch-grid relative overflow-x-hidden">
      
      {/* Background Graphic Layer: Fading Abstract Image Blend */}
      <div 
        className="fixed inset-0 pointer-events-none -z-20 bg-repeat opacity-[0.14] mix-blend-multiply bg-cover bg-center"
        style={{ backgroundImage: `url('/src/assets/images/crimson_abstract_bg_1791184405559.jpg')` }}
        aria-hidden="true"
      />

      {/* Dynamic Red Sweeping Ribbons in Background (Directly Inspired by Fencing Artwork) */}
      <svg 
        className="fixed inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden" 
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 2400"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ribbonGrad1" x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor="#C4142B" stopOpacity="0.85" />
            <stop offset="45%" stopColor="#E61E38" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#FF2A4B" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="ribbonGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#E61E38" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#B31226" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#8A0C1C" stopOpacity="0.65" />
          </linearGradient>
          <linearGradient id="ribbonGrad3" x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#E61E38" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#C4142B" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        {/* Top-Left Diagonal Corner Framing Block */}
        <polygon points="-50,-50 320,-50 -50,260" fill="#121318" opacity="0.95" />
        <polygon points="-50,-50 340,-50 -50,285" fill="none" stroke="#E61E38" strokeWidth="6" opacity="0.9" />

        {/* Ribbon 1: Upper sweeping arc swooping across the top carousel */}
        <path
          d="M -120,380 C 280,240 820,620 1560,280 L 1560,370 C 820,710 280,330 -120,470 Z"
          fill="url(#ribbonGrad1)"
          opacity="0.8"
        />

        {/* Ribbon 2: Sharp dynamic diagonal ribbon cutting through mid-page */}
        <path
          d="M -80,840 C 360,620 940,980 1520,780 L 1520,865 C 940,1065 360,705 -80,925 Z"
          fill="url(#ribbonGrad2)"
          opacity="0.75"
        />

        {/* Ribbon 3: Loop / fold dynamic ribbon gesture */}
        <path
          d="M 680,1320 C 1080,1120 1440,1340 1470,1540 C 1490,1670 1370,1720 1250,1650 C 1130,1580 1160,1420 1310,1360 L 1330,1310 C 1110,1380 1080,1600 1240,1700 C 1400,1790 1550,1690 1530,1490 C 1510,1260 1070,1060 680,1260 Z"
          fill="url(#ribbonGrad1)"
          opacity="0.65"
        />

        {/* Ribbon 4: Sweeping lower diagonal ribbon crossing into contact */}
        <path
          d="M -100,1720 C 420,1500 980,1920 1560,1760 L 1560,1850 C 980,2010 420,1590 -100,1810 Z"
          fill="url(#ribbonGrad3)"
          opacity="0.75"
        />
      </svg>

      {/* Left-Side Hidden Navigation Menu (Reveals on cursor hover or click) */}
      <LeftNavigation
        onOpenCV={() => setIsCVOpen(true)}
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {/* 3D Spatial Carousel on the Homepage */}
        <ThreeDimensionalCarousel
          onSelectArtwork={(artwork) => setSelectedArtwork(artwork)}
        />

        {/* Compact Single-Row Catalog Raisonné Carousel */}
        <CatalogRaisonne
          onSelectArtwork={(artwork) => setSelectedArtwork(artwork)}
        />

        {/* Institutional Record: Biennales & Museum Acquisitions */}
        <ExhibitionsList />

        {/* Acquisitions & Institutional Inquiries */}
        <AtelierAndContact
          preselectedArtwork={inquiryArtworkTitle}
        />
      </main>

      {/* Quiet Museum Footer */}
      <Footer onOpenCV={() => setIsCVOpen(true)} />

      {/* Museum Accession Dossier Modal */}
      <ArtworkDossierModal
        artwork={selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        onOpenInquiry={handleOpenInquiry}
      />

      {/* Formatted Curriculum Vitae Modal */}
      <ResumeModal
        isOpen={isCVOpen}
        onClose={() => setIsCVOpen(false)}
      />
    </div>
  );
}
