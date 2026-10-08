export interface BlogSection {
  type: 'paragraph' | 'heading' | 'subheading' | 'blockquote' | 'image' | 'list';
  text?: string;
  items?: string[];
  imageUrl?: string;
  imageCaption?: string;
  imageFit?: 'natural' | 'contain' | 'cover';
  imageSize?: 'regular' | 'large' | 'original';
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  readTime: string;
  category: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  tags: string[];
  coverImage: string;
  coverCaption?: string;
  coverFit?: 'natural' | 'contain' | 'cover';
  coverSize?: 'regular' | 'large' | 'original';
  excerpt: string;
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'sketching-in-the-dark',
    slug: 'sketching-in-the-dark-workflow',
    title: 'Sketching in the Dark: From Midnight Thumbnails to Final Characters',
    subtitle: 'A behind-the-scenes look into my character illustration process, accidental breakthroughs, and why drawing with zero expectations yields the best results.',
    date: 'October 8, 2026',
    readTime: '5 min read',
    category: 'Illustration & Process',
    author: {
      name: 'MikAsciii',
      role: 'Self-Proclaimed Artist & Illustrator',
    },
    tags: ['Character Design', 'Digital Art', 'Workflow', 'Studio Journal'],
    coverImage: '/src/assets/images/project_spatial_canvas_1791181042756.jpg',
    coverCaption: 'Early atmospheric mood study exploring lighting contrasts and spatial composition.',
    excerpt: 'Most of my favorite illustrations never began with an elaborate brief or a grand vision. They almost always started at 1:00 AM as messy, incoherent scribbles on a tablet screen while listening to ambient synth loops.',
    sections: [
      {
        type: 'paragraph',
        text: 'Most of my favorite illustrations never began with an elaborate brief or a grand vision. They almost always started at 1:00 AM as messy, incoherent scribbles on a tablet screen while listening to ambient synth loops. When you draw without the pressure of having to create a masterpiece, your hand moves with a fluidity that conscious deliberation often chokes out.'
      },
      {
        type: 'heading',
        text: '1. The Chaos Phase: 30-Second Silhouettes'
      },
      {
        type: 'paragraph',
        text: 'Before touching anatomy, clothing folds, or facial features, I fill a canvas with abstract high-contrast blobs and aggressive strokes. The goal here is simple: silhouette readability. If a character’s pose cannot communicate personality, weight, and gesture in pure black and white at 10% zoom, detailing won’t save it.'
      },
      {
        type: 'blockquote',
        text: '“Detail is just clothing. The silhouette is the skeleton and the heartbeat of the character.”'
      },
      {
        type: 'image',
        imageUrl: '/src/assets/images/artwork_chromatic_canvas_1791181524746.jpg',
        imageCaption: 'Phase 2 study: Layering rich chromatic undertones and geometric guides over raw gesture sketches.'
      },
      {
        type: 'heading',
        text: '2. Color Grading as Narrative Storytelling'
      },
      {
        type: 'paragraph',
        text: 'Rather than starting with flat local colors, I establish a dominant ambient key light and an opposing rim or fill. In this piece, I paired deep, grounded Prussian blues with vibrant vermillion and cadmium accents. The warmth draws the eye straight into focal points—the eyes, the edge of a blade, or a glowing talisman.'
      },
      {
        type: 'list',
        items: [
          'Stick to 2-3 primary hues to avoid visual noise.',
          'Use saturation sparingly: save maximum chroma for focal zones.',
          'Let edges vary between razor-sharp and soft atmospheric falloff.',
          'Always step back 2 meters from your screen to check reading clarity.'
        ]
      },
      {
        type: 'image',
        imageUrl: '/src/assets/images/project_editorial_type_1791181062088.jpg',
        imageCaption: 'Phase 3: Experimenting with graphic typography framing and textured print overlays.'
      },
      {
        type: 'heading',
        text: '3. Knowing When to Stop'
      },
      {
        type: 'paragraph',
        text: 'Digital artists have a notorious tendency to over-render until all character and vitality are buffed out. I love leaving rough sketch lines visible underneath final highlights. It gives the viewer a glimpse into the drawing’s pulse—a tactile reminder that a human hand drew this with joy, frustration, and passion.'
      },
      {
        type: 'paragraph',
        text: 'Thank you for reading! Feel free to reach out via the inquiry form if you have questions about custom commissions or want to chat about brushes and tools.'
      }
    ]
  },
  {
    id: 'why-self-proclaimed',
    slug: 'why-self-proclaimed-artist',
    title: 'Why I Call Myself a "Self-Proclaimed" Artist (And Why That\'s Freeing)',
    subtitle: 'Ditching traditional pretenses, embracing pure creative play, and remembering why we fell in love with drawing in the first place.',
    date: 'September 28, 2026',
    readTime: '4 min read',
    category: 'Thoughts & Studio Life',
    author: {
      name: 'MikAsciii',
      role: 'Self-Proclaimed Artist & Illustrator',
    },
    tags: ['Mindset', 'Creativity', 'Independent Art', 'Philosophy'],
    coverImage: '/src/assets/images/artwork_sculptural_monolith_1791181508324.jpg',
    coverCaption: 'Monolith study: Balancing monumental weight with understated modern simplicity.',
    excerpt: 'In an art world obsessed with pedigree, curator statements, and solemn academic credentials, adopting the title "Self-Proclaimed Artist" is my favorite shield against taking myself too seriously.',
    sections: [
      {
        type: 'paragraph',
        text: 'In an art world obsessed with pedigree, curator statements, and solemn academic credentials, adopting the title "Self-Proclaimed Artist" is my favorite shield against taking myself too seriously.'
      },
      {
        type: 'paragraph',
        text: 'The moment you declare yourself an artist simply because you make things—not because a board of examiners stamped your parchment—you reclaim your creative autonomy. You are free to draw monsters on Monday, minimalist typographic layouts on Wednesday, and sci-fi characters on the weekend.'
      },
      {
        type: 'blockquote',
        text: '“When you create for fun, perfection ceases to be the goal; discovery becomes the goal.”'
      },
      {
        type: 'image',
        imageUrl: '/src/assets/images/artwork_obsidian_resonance_1791272276250.jpg',
        imageCaption: 'Sculptural and graphic exploration in contrast, deep obsidian forms, and light.'
      },
      {
        type: 'heading',
        text: 'The Joy of Making for Fun'
      },
      {
        type: 'paragraph',
        text: 'MikAsciii started as a playground for my imaginary friends and unfiltered visual ideas. This website isn’t a corporate portfolio designed to impress institutions—it’s an open sketchbook where anyone can pull up a chair, spin the carousel, and see what I’ve been cooking up.'
      },
      {
        type: 'paragraph',
        text: 'Stay tuned for more updates, sketches, and upcoming project drops right here on this journal!'
      }
    ]
  }
];

export const AVAILABLE_STUDIO_IMAGES = [
  { url: '/src/assets/images/project_spatial_canvas_1791181042756.jpg', label: 'Spatial Canvas & Light' },
  { url: '/src/assets/images/artwork_chromatic_canvas_1791181524746.jpg', label: 'Chromatic Canvas & Gold' },
  { url: '/src/assets/images/artwork_sculptural_monolith_1791181508324.jpg', label: 'Monolith in Lux' },
  { url: '/src/assets/images/artwork_obsidian_resonance_1791272276250.jpg', label: 'Obsidian Resonance' },
  { url: '/src/assets/images/artwork_nocturne_pigment_1791272296935.jpg', label: 'Nocturne in Cadmium' },
  { url: '/src/assets/images/artwork_chrono_spatial_1791272311526.jpg', label: 'Chrono-Spatial Labyrinth' },
  { url: '/src/assets/images/artwork_latent_codex_1791272326366.jpg', label: 'Codex of the Unseen' },
  { url: '/src/assets/images/project_editorial_type_1791181062088.jpg', label: 'Editorial Typography' },
  { url: '/src/assets/images/project_fintech_os_1791181052919.jpg', label: 'Temporal Capital Flow' },
  { url: '/src/assets/images/project_robotics_ai_1791181072298.jpg', label: 'Sensorium Autonomous Array' },
];

const STORAGE_KEY = 'mikasciii_custom_blog_posts';
const DELETED_KEY = 'mikasciii_deleted_blog_posts';

export const getStoredBlogPosts = (): BlogPost[] => {
  if (typeof window === 'undefined') return BLOG_POSTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const deletedRaw = localStorage.getItem(DELETED_KEY);
    const deletedIds: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
    
    const custom: BlogPost[] = raw ? JSON.parse(raw) : [];
    const combined = [...custom, ...BLOG_POSTS.filter(b => !custom.some(c => c.id === b.id))];
    return combined.filter(p => !deletedIds.includes(p.id));
  } catch (err) {
    console.error('Failed to parse stored blog posts', err);
    return BLOG_POSTS;
  }
};

export const saveCustomBlogPost = (newPost: BlogPost): BlogPost[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing: BlogPost[] = raw ? JSON.parse(raw) : [];
    const filtered = existing.filter(p => p.id !== newPost.id);
    const updated = [newPost, ...filtered];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Remove from deleted list if present
    const deletedRaw = localStorage.getItem(DELETED_KEY);
    if (deletedRaw) {
      const deletedIds: string[] = JSON.parse(deletedRaw);
      const cleaned = deletedIds.filter(id => id !== newPost.id);
      localStorage.setItem(DELETED_KEY, JSON.stringify(cleaned));
    }

    return getStoredBlogPosts();
  } catch (err) {
    console.error('Failed to save blog post', err);
    return BLOG_POSTS;
  }
};

export const deleteCustomBlogPost = (postId: string): BlogPost[] => {
  try {
    // 1. Remove from custom stored posts
    const raw = localStorage.getItem(STORAGE_KEY);
    const existing: BlogPost[] = raw ? JSON.parse(raw) : [];
    const updated = existing.filter(p => p.id !== postId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // 2. Add to deleted IDs list so default seed posts also stay deleted
    const deletedRaw = localStorage.getItem(DELETED_KEY);
    const deletedIds: string[] = deletedRaw ? JSON.parse(deletedRaw) : [];
    if (!deletedIds.includes(postId)) {
      deletedIds.push(postId);
      localStorage.setItem(DELETED_KEY, JSON.stringify(deletedIds));
    }

    return getStoredBlogPosts();
  } catch (err) {
    console.error('Failed to delete blog post', err);
    return BLOG_POSTS;
  }
};
