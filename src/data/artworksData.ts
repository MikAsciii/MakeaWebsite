import { Artwork, ExhibitionMilestone, CuratorialNote } from '../types/portfolio';

export const ARTIST = {
  name: 'MikAsciii',
  wordmark: 'MikAsciii',
  discipline: 'Artist and Illustrator for fun',
  location: 'San Francisco & Paris',
  email: 'maximaroven@gmail.com',
  representation: 'Galerie Vaneau (Paris) & Independent Studio Practice',
  biography: 'Mikasciii (b. 1991) is a contemporary artist and computational architect working at the intersection of kinetic sculpture, generative spatial acoustics, and high-contrast digital artifacts. His practice interrogates the materiality of digital substrate—rendering algorithmic processes into physical monumental forms, optical glass refractions, and responsive acoustic spaces.',
  accreditation: 'M.F.A. Computational Arts & Design, University of Washington; B.S. Human-Computer Interaction',
  stats: [
    { value: '24', label: 'Museum Exhibitions', detail: 'North America, Europe, Asia' },
    { value: '06', label: 'Permanent Collections', detail: 'Public and institutional holdings' },
    { value: '12', label: 'Commissioned Installations', detail: 'Civic & architectural scale' },
    { value: '09', label: 'Years of Atelier Practice', detail: 'Founded 2017' }
  ]
};

export const ARTWORKS: Artwork[] = [
  {
    id: 'monolith-lux',
    catalogNumber: 'CAT. Nº 01',
    accessionNumber: 'ACC. 2026.041',
    title: 'Monolith in Lux: Refraction II',
    subtitle: 'Kinetic polarimetric sculpture and dichroic light dispersion',
    year: '2025',
    medium: 'Machined grade-5 titanium, optical borosilicate prisms, dichroic filters, directional quartz emitter',
    dimensions: '240 × 85 × 45 cm (94.5 × 33.5 × 17.7 in)',
    edition: 'Edition of 3 + 1 Artist Proof',
    provenance: 'Acquired by Fondation d’Art Contemporain, Geneva (2025); Private Collection, Zurich',
    curatorialStatement: 'Refraction II occupies the liminal threshold between classical monumentalism and quantum optics. A precision-milled titanium column supports balanced dichroic lenses that rotate at micro-angular velocities, casting calibrated chromatic spectra across the gallery volume as ambient light conditions oscillate.',
    exhibitionHistory: [
      'Venice Biennale of Architecture, Collateral Pavilion, 2025',
      'Galerie Vaneau, Paris, Solo Exhibition "Lux & Spatium", 2025',
      'Art Basel Unlimited, Basel, 2025'
    ],
    image: '/src/assets/images/artwork_sculptural_monolith_1791181508324.jpg',
    category: 'sculpture',
    categoryLabel: 'Illustrations',
    specifications: [
      { label: 'Weight', value: '185 kg (assembled)' },
      { label: 'Motorization', value: 'Direct-drive brushless stepper (<18 dB)' },
      { label: 'Optical Purity', value: 'BK7 Grade A annealed glass' },
      { label: 'Installation', value: 'Pedestal-free direct anchoring' }
    ]
  },
  {
    id: 'aether-spatial',
    catalogNumber: 'CAT. Nº 02',
    accessionNumber: 'ACC. 2025.109',
    title: 'Aether: Resonant Spatial Field',
    subtitle: 'Browser-native generative particle synthesis and spatial sound installation',
    year: '2025',
    medium: 'Real-time custom GLSL compute shaders, binaural spatial audio worklets, continuous multi-channel acoustic array',
    dimensions: 'Site-specific architectural projection, variable dimensions',
    edition: 'Unique algorithmic instance + verified institutional archive',
    provenance: 'Commissioned for the Center for Contemporary Sound Architecture, Berlin; Collection of Modern Electronic Arts, Kyoto',
    curatorialStatement: 'A meditative digital environment where sonic frequencies govern the gravitational attraction of ten thousand luminous visual particles. Visitors interact with the invisible acoustic topology, generating harmonic overtones and delicate standing waves that alter the perceived geometry of the architectural room.',
    exhibitionHistory: [
      'Center for Contemporary Sound Architecture, Berlin, 2025',
      'Kyoto Media Arts Triennale, Kyoto, 2025',
      'Ars Electronica, Linz, Main Exhibition Hall, 2024'
    ],
    image: '/src/assets/images/project_spatial_canvas_1791181042756.jpg',
    category: 'spatial',
    categoryLabel: 'News and Blogs',
    specifications: [
      { label: 'Sampling Rate', value: '96 kHz / 32-bit floating point' },
      { label: 'Particles', value: '10,240 concurrent kinetic nodes' },
      { label: 'Frame Budget', value: 'Deterministic 60.00 fps lock' },
      { label: 'Output', value: '16.4 Ambisonic sound spatialization' }
    ]
  },
  {
    id: 'chroma-latent',
    catalogNumber: 'CAT. Nº 03',
    accessionNumber: 'ACC. 2025.077',
    title: 'Chroma Latent: Study in Prussian & Gold',
    subtitle: 'Pigment, gold leaf, and algorithmic latent field layering on linen',
    year: '2024',
    medium: 'Natural Prussian blue pigment, burnt umber, 24k Florentine gold leaf, gesso on unprimed Belgian linen',
    dimensions: '210 × 170 cm (82.7 × 66.9 in)',
    edition: 'Unique original work',
    provenance: 'Collection of the Museum of Contemporary Fine Arts, Tokyo; Formerly Collection A. von Bernstorff, Frankfurt',
    curatorialStatement: 'Exploring the dialectic between ancient earth pigments and computational latent topologies. Hand-ground lapis and mineral oxides are applied over mathematical sub-layers, allowing deep organic textures to contrast against sharp golden geometric vectors that trace algorithmic gradient descents.',
    exhibitionHistory: [
      'Museum of Contemporary Fine Arts, Tokyo, "Materiality in the Machine Age", 2025',
      'FIAC Grand Palais, Paris, 2024',
      'De Young Museum, San Francisco, Bay Area Vanguard Showcase, 2024'
    ],
    image: '/src/assets/images/artwork_chromatic_canvas_1791181524746.jpg',
    category: 'painting',
    categoryLabel: 'Membership Posts',
    specifications: [
      { label: 'Support', value: '450 gsm Claessens Belgian linen' },
      { label: 'Pigments', value: 'Hand-ground mineral lapis & Prussian iron' },
      { label: 'Gilding', value: 'Water-gilded 24k double leaf' },
      { label: 'Preservation', value: 'Museum micro-crystalline wax seal' }
    ]
  },
  {
    id: 'typographia-universalis',
    catalogNumber: 'CAT. Nº 04',
    accessionNumber: 'ACC. 2024.032',
    title: 'Typographia Universalis: Kinetic Codex',
    subtitle: 'Computational typographic generator and dynamic letterform architecture',
    year: '2024',
    medium: 'Parametric variable font engine, reactive laser projection, archival rag paper installation',
    dimensions: 'Three-panel diptych, 180 × 240 cm total spread',
    edition: 'Edition of 5, 2 Artist Proofs',
    provenance: 'Acquired by Stedelijk Museum Library Collection, Amsterdam (2024)',
    curatorialStatement: 'A deconstruction of the Roman monumental inscriptional capital. Letterforms modulate in real time along axes of weight, optical density, and tension according to environmental sound and distance sensors, challenging the fixed immutability of the printed page.',
    exhibitionHistory: [
      'Stedelijk Museum, Amsterdam, "The Programmable Letter", 2024',
      'TypoCircle London, Annual Exhibition, 2024',
      'Bauhaus Archive Gallery, Berlin, 2023'
    ],
    image: '/src/assets/images/project_editorial_type_1791181062088.jpg',
    category: 'generative',
    categoryLabel: 'Miscellaneous',
    specifications: [
      { label: 'Substrate', value: 'Hahnemühle Photo Rag Ultra Smooth' },
      { label: 'Resolution', value: 'Mathematical infinite Bézier vectors' },
      { label: 'Algorithm', value: 'Knuth-Plass spatial equilibrium' },
      { label: 'Sensory Input', value: 'Sub-audible acoustic pressure' }
    ]
  },
  {
    id: 'vanguard-temporal',
    catalogNumber: 'CAT. Nº 05',
    accessionNumber: 'ACC. 2024.008',
    title: 'Terminal: Temporal Flow of Capital',
    subtitle: 'Real-time financial depth topology rendered as dark aesthetic landscape',
    year: '2024',
    medium: 'Real-time WebSocket data stream, obsidian tinted mirror glass, sub-pixel OLED display matrix',
    dimensions: '160 × 90 × 8 cm (63 × 35.4 × 3.1 in)',
    edition: 'Edition of 2 + 1 Studio Archive',
    provenance: 'Private Collection, Geneva; Commissioned for Institutional FinArts, London',
    curatorialStatement: 'Transforming the invisible velocity of global institutional liquidity into a hypnotic kinetic portrait. Millions of micro-transactions ripple across deep obsidian surfaces like subterranean ocean currents, revealing the emotional pulse of late-stage computational capitalism.',
    exhibitionHistory: [
      'Tate Modern, London, "Invisible Infrastructure: Data as Art", 2024',
      'ZKM Center for Art and Media, Karlsruhe, 2024',
      'Whitney Museum of American Art (Digital Art Wing), New York, 2023'
    ],
    image: '/src/assets/images/project_fintech_os_1791181052919.jpg',
    category: 'generative',
    categoryLabel: 'Miscellaneous',
    specifications: [
      { label: 'Throughput', value: '1,200,000 algorithmic ticks/min' },
      { label: 'Glass', value: 'Low-iron optical glass with 80% tint' },
      { label: 'Frame', value: 'Hand-rubbed patinated blackened steel' },
      { label: 'Latency', value: '<2.1 ms stream-to-phosphor delay' }
    ]
  },
  {
    id: 'kinetics-automaton',
    catalogNumber: 'CAT. Nº 06',
    accessionNumber: 'ACC. 2023.094',
    title: 'Sensorium: Autonomous Perception Array',
    subtitle: 'Multi-axis robotic arm with LiDAR spatial reflection telemetry',
    year: '2023',
    medium: 'Aero-grade aluminum, solid-state LiDAR emitter, real-time 3D point-cloud projection, micro-telemetry transducers',
    dimensions: '280 × 280 × 210 cm variable radius',
    edition: 'Unique museum installation',
    provenance: 'Permanent Acquisition, Museum of Applied Arts and Technology (MAAT), Lisbon',
    curatorialStatement: 'An investigation into non-human observation. The machine sweeps the gallery with coherent infrared beams, constructing an ephemeral 3D memory of visitors and architectural walls that decays according to entropy functions over twenty-four-hour cycles.',
    exhibitionHistory: [
      'MAAT, Lisbon, "Post-Human Sensory Fields", 2023',
      'Barbican Centre, London, "AI: More than Human", 2023',
      'Mori Art Museum, Tokyo, 2022'
    ],
    image: '/src/assets/images/project_robotics_ai_1791181072298.jpg',
    category: 'generative',
    categoryLabel: 'Miscellaneous',
    specifications: [
      { label: 'Scan Density', value: '500,000 points/second' },
      { label: 'Kinematics', value: '6-Degrees-of-Freedom arm' },
      { label: 'Repeatability', value: '±0.02 mm positional tolerance' },
      { label: 'Interaction', value: 'Continuous non-invasive spatial tracking' }
    ]
  },
  {
    id: 'obsidian-resonance',
    catalogNumber: 'CAT. Nº 07',
    accessionNumber: 'ACC. 2026.014',
    title: 'Obsidian Resonance: Kinetic Refraction',
    subtitle: 'Polished volcanic basalt monolith, optical borosilicate prisms, and sub-audible vibration',
    year: '2026',
    medium: 'Volcanic obsidian basalt, optical BK7 glass prisms, balanced harmonic vibrator, directional illumination',
    dimensions: '220 × 75 × 45 cm (86.6 × 29.5 × 17.7 in)',
    edition: 'Edition of 3 + 1 Artist Proof',
    provenance: 'Acquired by Tokyo Museum of Contemporary Fine Arts (2026); Private Collection, Seoul',
    curatorialStatement: 'Obsidian Resonance investigates the intersection of geological antiquity and precision photonics. Light entering the hand-polished basalt aperture is refracted through triple-ground quartz lenses into crystalline polychromatic frequencies that trace micro-vibrations across the gallery.',
    exhibitionHistory: [
      'Tokyo Museum of Contemporary Fine Arts, "New Mineral Monumentalism", 2026',
      'Venice Art Biennale, Arsenale Pavilion, 2026',
      'Art Basel Hong Kong, Feature Presentations, 2026'
    ],
    image: '/src/assets/images/artwork_obsidian_resonance_1791272276250.jpg',
    category: 'sculpture',
    categoryLabel: 'Illustrations',
    specifications: [
      { label: 'Material', value: 'Armenian hand-quarried black obsidian' },
      { label: 'Optics', value: 'BK7 optical borosilicate prism assembly' },
      { label: 'Resonance', value: 'Sub-bass transducer (28 Hz fundamental)' },
      { label: 'Pedestal', value: 'Brushed dark patinated titanium plinth' }
    ]
  },
  {
    id: 'nocturne-cadmium',
    catalogNumber: 'CAT. Nº 08',
    accessionNumber: 'ACC. 2025.148',
    title: 'Nocturne in Cadmium: Impasto & Raw Dispersion',
    subtitle: 'Natural vermillion pigment, Florentine gold leaf, and gestural oil on Belgian linen',
    year: '2025',
    medium: 'Mineral cinnabar, cadmium red pigment, burnt raw umber, 24k gold leaf, gesso on archival Belgian linen',
    dimensions: '195 × 160 cm (76.8 × 63 in)',
    edition: 'Unique original masterwork',
    provenance: 'Commissioned for Collection d’Art Contemporain, Paris; Galerie Vaneau Exhibition 2025',
    curatorialStatement: 'A visceral dialogue between intense crimson pigment density and delicate golden calligraphic fractures. Raw oil-suspended cinnabar is layered with heavy palette knife gestures over mathematical underpaintings, capturing tension between computational order and organic human touch.',
    exhibitionHistory: [
      'Grand Palais Éphémère, Art Paris, 2025',
      'Galerie Vaneau, "Chroma & Flesh", Paris, 2025',
      'Palais de Tokyo, Benefit Auction Exhibition, 2025'
    ],
    image: '/src/assets/images/artwork_nocturne_pigment_1791272296935.jpg',
    category: 'painting',
    categoryLabel: 'Membership Posts',
    specifications: [
      { label: 'Substrate', value: '550 gsm Claessens double-primed linen' },
      { label: 'Gilding', value: 'Water-gilded 24k Florentine leaf' },
      { label: 'Binder', value: 'Cold-pressed cold-aged Swedish linseed oil' },
      { label: 'Varnish', value: 'Removable dammar and beeswax protective film' }
    ]
  },
  {
    id: 'chrono-spatial-labyrinth',
    catalogNumber: 'CAT. Nº 09',
    accessionNumber: 'ACC. 2025.182',
    title: 'Chrono-Spatial Labyrinth: Volumetric Field',
    subtitle: 'Volumetric laser architecture and multichannel spatial frequency synthesis',
    year: '2025',
    medium: 'Solid-state coherent laser emitter, aerosolized microscopic mineral vapor, 32-channel spatialized ambisonic soundwork',
    dimensions: 'Site-specific architectural installation, variable room scale',
    edition: 'Unique institutional installation',
    provenance: 'Collection of the Center for Contemporary Sound Architecture, Berlin (Inv. CCSA-2025-018)',
    curatorialStatement: 'A spatial light chamber where coherent laser ribbons slice through micro-misted atmospheric vapor. Sound frequencies vibrate the perceived position of geometric light planes, transforming physical architecture into an interactive acoustic labyrinth.',
    exhibitionHistory: [
      'Berlin Biennale for Contemporary Art, 2025',
      'Ars Electronica Center, Deep Space 8K, Linz, 2025',
      'Sonar+D Innovation Showcase, Barcelona, 2024'
    ],
    image: '/src/assets/images/artwork_chrono_spatial_1791272311526.jpg',
    category: 'spatial',
    categoryLabel: 'News and Blogs',
    specifications: [
      { label: 'Wavelength', value: '638 nm red & 577 nm yellow coherent beam' },
      { label: 'Spatialization', value: '32.4 Ambisonics spatial field array' },
      { label: 'Control', value: 'Real-time TouchDesigner GLSL pipeline' },
      { label: 'Acoustics', value: 'Custom tuned tuned-mass acoustic dampers' }
    ]
  },
  {
    id: 'latent-codex-unseen',
    catalogNumber: 'CAT. Nº 10',
    accessionNumber: 'ACC. 2024.119',
    title: 'Codex of the Unseen: Procedural Typographic Plate',
    subtitle: 'Algorithmic geometric glyph matrix debossed on handmade washi with crimson seal',
    year: '2024',
    medium: 'Vector Bézier font engine, relief intaglio blind debossing, Japanese handmade Echizen washi paper, natural cinnabar seal',
    dimensions: '140 × 100 cm (55.1 × 39.4 in)',
    edition: 'Edition of 7 + 2 AP',
    provenance: 'Special Collections, Bibliothèque Nationale de France, Paris; Collection of Graphic Art, Basel',
    curatorialStatement: 'An archival typographic study deconstructing the sacred geometry of the glyph. Using generative grammar matrices, letterforms evolve into monumental architectural runes debossed onto fibrous plant-based washi paper stamped with a traditional crimson atelier lacquer seal.',
    exhibitionHistory: [
      'Bibliothèque Nationale de France, Paris, 2025',
      'Basel Art Print Fair, Basel, 2024',
      'Gutenberg Museum Special Showcase, Mainz, 2024'
    ],
    image: '/src/assets/images/artwork_latent_codex_1791272326366.jpg',
    category: 'generative',
    categoryLabel: 'Miscellaneous',
    specifications: [
      { label: 'Paper', value: 'Handmade raw Echizen kozo washi (280 gsm)' },
      { label: 'Print Method', value: 'Hand-operated Albion relief proofing press' },
      { label: 'Seal', value: 'Vermillion cinnabar paste studio hallmark' },
      { label: 'Conservation', value: 'Acid-free UV-protective museum rag mounting' }
    ]
  }
];

export const EXHIBITION_CHRONOLOGY: ExhibitionMilestone[] = [
  {
    year: '2025',
    title: 'Lux & Spatium (Solo Exhibition)',
    institution: 'Galerie Vaneau',
    location: 'Paris, France',
    curator: 'Camille Delacroix',
    type: 'Solo Exhibition',
    notes: 'Inaugural European solo exhibition surveying kinetic light columns, polarized optics, and generative spatial canvases.'
  },
  {
    year: '2025',
    title: 'The Architecture of Light (Biennale Pavilion)',
    institution: 'La Biennale di Venezia',
    location: 'Venice, Italy',
    curator: 'Dr. Marco Bellini',
    type: 'Biennale',
    notes: 'Featured installation of Monolith in Lux inside the historic Arsenale vault.'
  },
  {
    year: '2024',
    title: 'Invisible Infrastructure: Data as Fine Art',
    institution: 'Tate Modern (Tanks)',
    location: 'London, UK',
    curator: 'Sarah Sterling',
    type: 'Institutional Commission',
    notes: 'Site-specific multi-screen obsidian installation exploring high-frequency capital flows.'
  },
  {
    year: '2024',
    title: 'Materiality in the Machine Age',
    institution: 'Museum of Contemporary Fine Arts',
    location: 'Tokyo, Japan',
    curator: 'Kenji Takahashi',
    type: 'Museum Acquisition',
    notes: 'Permanent collection acquisition and major group exhibition on pigment and algorithmic craft.'
  },
  {
    year: '2023',
    title: 'Post-Human Sensory Fields',
    institution: 'Museum of Art, Architecture and Technology (MAAT)',
    location: 'Lisbon, Portugal',
    curator: 'Inês de Almeida',
    type: 'Museum Acquisition',
    notes: 'Inaugural commission of the autonomous LiDAR perception array.'
  },
  {
    year: '2022',
    title: 'Resonant Frequencies: Computational Soundscapes',
    institution: 'Ars Electronica Center',
    location: 'Linz, Austria',
    curator: 'Gerfried Stocker',
    type: 'Solo Exhibition',
    notes: 'Awarded the Golden Nica for Interactive Art & Computational Architecture.'
  }
];

export const CURATORIAL_ESSAY: CuratorialNote = {
  author: 'Camille Delacroix',
  title: 'Between the Monumental and the Ephemeral: The Spatial Poetics of Maxim Aroven',
  institution: 'Chief Curator, Institut des Arts Visuels & Galerie Vaneau, Paris',
  date: 'Spring 2025',
  excerpt: 'To encounter the work of Maxim Aroven is to witness the dismantling of the false dichotomy between physical matter and algorithmic logic. While much of so-called digital art remains trapped within the planar confines of the glowing screen, Aroven’s oeuvre asserts the weight of titanium, the refractive precision of borosilicate crystal, and the acoustic pressure of spatial waves. His sculptures do not merely display computation; they enact it as a bodily, atmospheric encounter.'
};
