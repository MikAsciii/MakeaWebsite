export interface Artwork {
  id: string;
  catalogNumber: string;
  accessionNumber: string;
  title: string;
  subtitle: string;
  year: string;
  medium: string;
  dimensions: string;
  edition: string;
  provenance: string;
  curatorialStatement: string;
  exhibitionHistory: string[];
  image: string;
  category: 'spatial' | 'sculpture' | 'painting' | 'generative' | 'kinetics';
  categoryLabel: string;
  specifications: {
    label: string;
    value: string;
  }[];
}

export interface ExhibitionMilestone {
  year: string;
  title: string;
  institution: string;
  location: string;
  curator: string;
  type: 'Solo Exhibition' | 'Biennale' | 'Museum Acquisition' | 'Institutional Commission';
  notes: string;
}

export interface CuratorialNote {
  author: string;
  title: string;
  institution: string;
  excerpt: string;
  date: string;
}
