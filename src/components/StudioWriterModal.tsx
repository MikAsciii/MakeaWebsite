import React, { useState, useId } from 'react';
import { 
  X, Plus, Trash2, ArrowUp, ArrowDown, Image as ImageIcon, 
  Quote, Type, List, AlignLeft, Eye, Sparkles, Check, 
  Copy, BookOpen, Layers
} from 'lucide-react';
import { 
  BlogPost, BlogSection, AVAILABLE_STUDIO_IMAGES, 
  saveCustomBlogPost, deleteCustomBlogPost 
} from '../data/blogPosts';

interface StudioWriterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublishSuccess: (publishedPost: BlogPost) => void;
  onDeleteSuccess?: (deletedId: string) => void;
  initialPost?: BlogPost | null;
  articles?: BlogPost[];
}

const CATEGORY_PRESETS = [
  'Illustration & Process',
  'Character Design',
  'Thoughts & Studio Life',
  'Project Highlights',
  'Sketches & Doodles',
  'News & Announcements'
];

export const StudioWriterModal: React.FC<StudioWriterModalProps> = ({
  isOpen,
  onClose,
  onPublishSuccess,
  onDeleteSuccess,
  initialPost,
  articles = []
}) => {
  const customId = useId();
  const [activeTab, setActiveTab] = useState<'editor' | 'preview' | 'export'>('editor');
  const [selectedPostId, setSelectedPostId] = useState<string>(initialPost?.id || 'new');
  const [title, setTitle] = useState(initialPost?.title || '');
  const [subtitle, setSubtitle] = useState(initialPost?.subtitle || '');
  const [category, setCategory] = useState(initialPost?.category || CATEGORY_PRESETS[0]);
  const [readTime, setReadTime] = useState(initialPost?.readTime || '4 min read');
  const [tagsInput, setTagsInput] = useState(initialPost?.tags?.join(', ') || 'Illustration, Character Art, Studio Note');
  const [coverImage, setCoverImage] = useState(initialPost?.coverImage || AVAILABLE_STUDIO_IMAGES[0].url);
  const [coverCaption, setCoverCaption] = useState(initialPost?.coverCaption || '');
  const [coverFit, setCoverFit] = useState<'natural' | 'contain' | 'cover'>(initialPost?.coverFit || 'natural');
  const [coverSize, setCoverSize] = useState<'original' | 'large' | 'regular'>(initialPost?.coverSize || 'original');
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [copiedCode, setCopiedCode] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [sections, setSections] = useState<BlogSection[]>(
    initialPost?.sections || [
      {
        type: 'paragraph',
        text: 'Write your opening thoughts here. Share what inspired this illustration or project...'
      },
      {
        type: 'heading',
        text: 'The Creative Process'
      },
      {
        type: 'paragraph',
        text: 'Detail the workflow, brushes, color choices, or design decisions you made...'
      },
      {
        type: 'blockquote',
        text: '“Every rough sketch is a stepping stone to something unexpected.”'
      },
      {
        type: 'image',
        imageUrl: AVAILABLE_STUDIO_IMAGES[1].url,
        imageCaption: 'Work in progress study',
        imageFit: 'natural',
        imageSize: 'original'
      }
    ]
  );

  // Sync state if initialPost changes or modal opens
  React.useEffect(() => {
    if (initialPost) {
      loadArticleData(initialPost);
    }
  }, [initialPost, isOpen]);

  const loadArticleData = (post: BlogPost | null) => {
    if (post) {
      setSelectedPostId(post.id);
      setTitle(post.title);
      setSubtitle(post.subtitle || '');
      setCategory(post.category || CATEGORY_PRESETS[0]);
      setReadTime(post.readTime || '4 min read');
      setTagsInput(post.tags?.join(', ') || '');
      setCoverImage(post.coverImage || AVAILABLE_STUDIO_IMAGES[0].url);
      setCoverCaption(post.coverCaption || '');
      setCoverFit(post.coverFit || 'natural');
      setCoverSize(post.coverSize || 'original');
      setSections(post.sections || []);
    } else {
      setSelectedPostId('new');
      setTitle('');
      setSubtitle('');
      setCategory(CATEGORY_PRESETS[0]);
      setReadTime('4 min read');
      setTagsInput('Illustration, Character Art, Studio Note');
      setCoverImage(AVAILABLE_STUDIO_IMAGES[0].url);
      setCoverCaption('');
      setCoverFit('natural');
      setCoverSize('original');
      setSections([
        {
          type: 'paragraph',
          text: 'Write your opening thoughts here. Share what inspired this illustration or project...'
        },
        {
          type: 'heading',
          text: 'The Creative Process'
        },
        {
          type: 'paragraph',
          text: 'Detail the workflow, brushes, color choices, or design decisions you made...'
        },
        {
          type: 'blockquote',
          text: '“Every rough sketch is a stepping stone to something unexpected.”'
        },
        {
          type: 'image',
          imageUrl: AVAILABLE_STUDIO_IMAGES[1].url,
          imageCaption: 'Work in progress study'
        }
      ]);
    }
  };

  const handleSwitchArticle = (targetId: string) => {
    if (targetId === 'new') {
      loadArticleData(null);
    } else {
      const found = articles.find((a) => a.id === targetId);
      if (found) {
        loadArticleData(found);
      }
    }
  };

  const handleDeleteArticle = () => {
    if (selectedPostId === 'new') return;
    deleteCustomBlogPost(selectedPostId);
    onDeleteSuccess?.(selectedPostId);
    setConfirmDelete(false);
    loadArticleData(null);
  };

  if (!isOpen) return null;

  // Auto-calculate read time
  const handleAutoCalcReadTime = () => {
    const totalWords = sections.reduce((acc, s) => {
      const words = (s.text || '').split(/\s+/).filter(Boolean).length;
      return acc + words;
    }, title.split(/\s+/).length + subtitle.split(/\s+/).length);
    const mins = Math.max(1, Math.round(totalWords / 180));
    setReadTime(`${mins} min read`);
  };

  // Section manipulation
  const addSection = (type: BlogSection['type']) => {
    let newSec: BlogSection = { type, text: '' };
    if (type === 'heading') newSec.text = 'New Section Title';
    if (type === 'paragraph') newSec.text = 'Write your paragraph text here...';
    if (type === 'blockquote') newSec.text = 'Highlight a memorable pull quote here...';
    if (type === 'image') {
      newSec.imageUrl = AVAILABLE_STUDIO_IMAGES[2].url;
      newSec.imageCaption = 'Illustration caption or technical note';
    }
    if (type === 'list') {
      newSec.items = ['First takeaway point', 'Second technique or observation', 'Third key takeaway'];
    }
    setSections([...sections, newSec]);
  };

  const updateSection = (idx: number, patch: Partial<BlogSection>) => {
    const next = [...sections];
    next[idx] = { ...next[idx], ...patch };
    setSections(next);
  };

  const removeSection = (idx: number) => {
    setSections(sections.filter((_, i) => i !== idx));
  };

  const moveSection = (idx: number, direction: 'up' | 'down') => {
    if (direction === 'up' && idx === 0) return;
    if (direction === 'down' && idx === sections.length - 1) return;
    const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
    const next = [...sections];
    const temp = next[idx];
    next[idx] = next[targetIdx];
    next[targetIdx] = temp;
    setSections(next);
  };

  const constructPost = (): BlogPost => {
    const slug = (title || 'untitled-post')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const tags = tagsInput
      .split(',')
      .map((t) => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    const firstPara = sections.find((s) => s.type === 'paragraph' && s.text)?.text || subtitle;
    const excerpt = firstPara.slice(0, 160) + (firstPara.length > 160 ? '...' : '');

    const isEditingExisting = selectedPostId !== 'new';
    const existingPost = isEditingExisting ? articles.find((a) => a.id === selectedPostId) : null;

    return {
      id: isEditingExisting ? selectedPostId : `post-${Date.now()}-${slug.slice(0, 20)}`,
      slug: existingPost?.slug || slug,
      title: title || 'Untitled Studio Article',
      subtitle: subtitle || 'New project dispatch from MikAsciii',
      date: existingPost?.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: readTime || '3 min read',
      category: category || 'Studio Notes',
      author: existingPost?.author || {
        name: 'MikAsciii',
        role: 'Self-Proclaimed Artist & Illustrator',
      },
      tags: tags.length ? tags : ['Art', 'Illustration', 'Studio'],
      coverImage: coverImage || AVAILABLE_STUDIO_IMAGES[0].url,
      coverCaption: coverCaption || 'Studio visual asset',
      coverFit,
      coverSize,
      excerpt,
      sections,
    };
  };

  const handlePublish = () => {
    if (!title.trim()) {
      alert('Please enter an article title first.');
      return;
    }
    const finalPost = constructPost();
    saveCustomBlogPost(finalPost);
    onPublishSuccess(finalPost);
    onClose();
  };

  const handleCopyCode = () => {
    const finalPost = constructPost();
    const codeString = JSON.stringify(finalPost, null, 2);
    navigator.clipboard.writeText(codeString);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const compiledPost = constructPost();

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      {/* Editor Modal Container */}
      <div className="relative w-full max-w-5xl h-full sm:h-[94vh] bg-[#FAF8F5] sm:rounded-2xl shadow-2xl border border-[#E2DACF] flex flex-col overflow-hidden text-[#14151A]">
        
        {/* Top Header Bar */}
        <header className="px-5 py-3.5 border-b border-[#E2DACF] bg-[#FAF8F5] flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#E61E38] text-white flex items-center justify-center shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-code font-bold uppercase tracking-wider text-[#E61E38]">
                  STUDIO WRITER
                </span>
                <span className="text-[10px] font-mono-code px-1.5 py-0.2 rounded bg-stone-200 text-stone-700">
                  VISUAL CMS
                </span>
              </div>
              <h2 className="text-sm sm:text-base font-display font-extrabold uppercase text-[#14151A] tracking-tight">
                {selectedPostId !== 'new' ? 'Edit Existing Article' : 'Create & Publish New Blog Post'}
              </h2>
            </div>
          </div>

          {/* Center Tabs: Editor / Live Preview / Export Code */}
          <div className="flex items-center p-1 bg-[#EDE7DC] rounded-xl border border-[#E2DACF] text-xs font-mono-code font-bold">
            <button
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'editor' 
                  ? 'bg-white text-[#14151A] shadow-xs' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <AlignLeft className="w-3.5 h-3.5" />
              <span>Edit</span>
            </button>
            <button
              onClick={() => {
                handleAutoCalcReadTime();
                setActiveTab('preview');
              }}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'preview' 
                  ? 'bg-white text-[#14151A] shadow-xs' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5 text-[#E61E38]" />
              <span>Live Preview</span>
            </button>
            <button
              onClick={() => setActiveTab('export')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'export' 
                  ? 'bg-white text-[#14151A] shadow-xs' 
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Export Code</span>
            </button>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePublish}
              className="px-4 py-2 rounded-xl bg-[#E61E38] hover:bg-[#C4142B] text-white text-xs font-bold font-mono-code uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>{selectedPostId !== 'new' ? 'Save Changes' : 'Publish Live'}</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-[#EFEBE2] border border-[#E2DACF] cursor-pointer"
              aria-label="Close Writer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Article Selector & Mode Bar */}
        <div className="px-5 py-2.5 bg-[#F2ECE1] border-b border-[#E2DACF] flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="font-mono-code text-[11px] font-bold text-stone-500 uppercase tracking-wider">
              Editing Document:
            </span>
            <select
              value={selectedPostId}
              onChange={(e) => handleSwitchArticle(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-[#D5C9B8] bg-white font-sans text-xs font-bold text-stone-900 focus:outline-none focus:border-[#E61E38] shadow-2xs max-w-xs sm:max-w-md truncate"
            >
              <option value="new">+ Write New Blank Post</option>
              {articles.length > 0 && (
                <optgroup label="Select Existing Article to Edit">
                  {articles.map((art) => (
                    <option key={art.id} value={art.id}>
                      {art.title}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
          </div>

          <div className="flex items-center gap-2">
            {selectedPostId !== 'new' && (
              <>
                {confirmDelete ? (
                  <div className="flex items-center gap-1.5 p-1 rounded-xl bg-red-50 border border-red-300">
                    <span className="text-[11px] font-mono-code font-bold text-red-700 px-1.5">
                      Delete permanently?
                    </span>
                    <button
                      type="button"
                      onClick={handleDeleteArticle}
                      className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-mono-code text-[11px] font-bold transition-all shadow-2xs cursor-pointer"
                    >
                      Yes, Delete
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmDelete(false)}
                      className="px-2 py-1 rounded-lg bg-white hover:bg-stone-100 text-stone-700 font-mono-code text-[11px] transition-all cursor-pointer border border-[#E2DACF]"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 font-mono-code text-xs font-bold transition-all shadow-2xs cursor-pointer"
                    title="Delete this article permanently"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-red-600" />
                    <span>Delete Article</span>
                  </button>
                )}
              </>
            )}

            {selectedPostId !== 'new' ? (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-100 text-[#E61E38] font-mono-code text-[10px] font-bold border border-red-200">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E61E38] animate-pulse" />
                Editing Mode Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-200 text-stone-700 font-mono-code text-[10px] font-bold">
                New Draft Mode
              </span>
            )}
          </div>
        </div>

        {/* Modal Main Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 scrollbar-thin scrollbar-thumb-stone-300">
          
          {/* TAB 1: VISUAL EDITOR */}
          {activeTab === 'editor' && (
            <div className="max-w-3xl mx-auto space-y-8">
              
              {/* Card 1: Article Metadata */}
              <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2DACF] shadow-xs space-y-4">
                <div className="text-xs font-mono-code font-bold text-[#E61E38] uppercase tracking-wider flex items-center gap-1.5">
                  <Type className="w-3.5 h-3.5" />
                  <span>1. Title & Classification</span>
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-stone-600 mb-1 font-bold">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Designing The Cyber Samurai: Silhouette to Color"
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E2DACF] bg-[#FAF8F5] focus:outline-none focus:border-[#E61E38] text-base font-display font-bold text-[#14151A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-stone-600 mb-1 font-bold">
                    Subtitle / Summary Deck
                  </label>
                  <textarea
                    rows={2}
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)}
                    placeholder="A brief one-sentence deck introducing your project or thoughts..."
                    className="w-full px-4 py-2 rounded-xl border border-[#E2DACF] bg-[#FAF8F5] focus:outline-none focus:border-[#E61E38] text-xs font-sans text-stone-800"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-mono-code text-stone-600 mb-1 font-bold">
                      Category
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-[#E2DACF] bg-[#FAF8F5] text-xs font-mono-code focus:outline-none focus:border-[#E61E38]"
                    >
                      {CATEGORY_PRESETS.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-code text-stone-600 mb-1 font-bold">
                      Reading Time
                    </label>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        value={readTime}
                        onChange={(e) => setReadTime(e.target.value)}
                        placeholder="e.g. 4 min read"
                        className="w-full px-3 py-2 rounded-xl border border-[#E2DACF] bg-[#FAF8F5] text-xs font-mono-code focus:outline-none focus:border-[#E61E38]"
                      />
                      <button
                        type="button"
                        onClick={handleAutoCalcReadTime}
                        className="px-2 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-[10px] font-mono-code whitespace-nowrap cursor-pointer"
                        title="Auto-calculate based on words"
                      >
                        Auto
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-code text-stone-600 mb-1 font-bold">
                      Tags (Comma separated)
                    </label>
                    <input
                      type="text"
                      value={tagsInput}
                      onChange={(e) => setTagsInput(e.target.value)}
                      placeholder="Illustration, Character, Process"
                      className="w-full px-3 py-2 rounded-xl border border-[#E2DACF] bg-[#FAF8F5] text-xs font-mono-code focus:outline-none focus:border-[#E61E38]"
                    />
                  </div>
                </div>
              </section>

              {/* Card 2: Cover Image Selection */}
              <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2DACF] shadow-xs space-y-4">
                <div className="text-xs font-mono-code font-bold text-[#E61E38] uppercase tracking-wider flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>2. Cover Image & Caption</span>
                  </span>
                  <span className="text-[10px] text-stone-400 font-normal">Click any studio artwork below</span>
                </div>

                {/* Quick gallery image selector */}
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2.5 max-h-48 overflow-y-auto p-1 border border-[#E2DACF] rounded-xl bg-[#FAF8F5]">
                  {AVAILABLE_STUDIO_IMAGES.map((img) => {
                    const isSelected = coverImage === img.url;
                    return (
                      <button
                        key={img.url}
                        type="button"
                        onClick={() => setCoverImage(img.url)}
                        className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          isSelected ? 'border-[#E61E38] scale-[1.03] shadow-md ring-2 ring-red-200' : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img src={img.url} alt={img.label} className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#E61E38] text-white flex items-center justify-center text-[9px] font-bold">
                            ✓
                          </div>
                        )}
                        <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[9px] font-mono-code truncate px-1 py-0.5">
                          {img.label}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom URL Option */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-mono-code text-stone-600 mb-1">
                      Or paste an external Image URL
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={customImageUrl}
                        onChange={(e) => setCustomImageUrl(e.target.value)}
                        placeholder="https://example.com/artwork.jpg"
                        className="w-full px-3 py-1.5 rounded-xl border border-[#E2DACF] bg-[#FAF8F5] text-xs font-mono-code"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (customImageUrl.trim()) setCoverImage(customImageUrl.trim());
                        }}
                        className="px-3 py-1.5 rounded-xl bg-stone-900 text-white text-xs font-mono-code cursor-pointer whitespace-nowrap"
                      >
                        Apply
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono-code text-stone-600 mb-1">
                      Cover Caption / Figure Note
                    </label>
                    <input
                      type="text"
                      value={coverCaption}
                      onChange={(e) => setCoverCaption(e.target.value)}
                      placeholder="e.g. Atmospheric lighting pass exploring Prussian blue harmonies"
                      className="w-full px-3 py-1.5 rounded-xl border border-[#E2DACF] bg-[#FAF8F5] text-xs font-sans"
                    />
                  </div>
                </div>
              </section>

              {/* Card 3: Body Content Sections */}
              <section className="p-5 sm:p-6 rounded-2xl bg-white border border-[#E2DACF] shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-[#EBE4D8] pb-3">
                  <div className="text-xs font-mono-code font-bold text-[#E61E38] uppercase tracking-wider flex items-center gap-1.5">
                    <AlignLeft className="w-3.5 h-3.5" />
                    <span>3. Article Body Sections ({sections.length})</span>
                  </div>

                  {/* Add section buttons */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-mono-code text-stone-400 mr-1">Add:</span>
                    <button
                      type="button"
                      onClick={() => addSection('paragraph')}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-[#E61E38] hover:text-white text-stone-700 text-xs font-mono-code transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Paragraph
                    </button>
                    <button
                      type="button"
                      onClick={() => addSection('heading')}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-[#E61E38] hover:text-white text-stone-700 text-xs font-mono-code transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Heading
                    </button>
                    <button
                      type="button"
                      onClick={() => addSection('blockquote')}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-[#E61E38] hover:text-white text-stone-700 text-xs font-mono-code transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Quote
                    </button>
                    <button
                      type="button"
                      onClick={() => addSection('image')}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-[#E61E38] hover:text-white text-stone-700 text-xs font-mono-code transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Image
                    </button>
                    <button
                      type="button"
                      onClick={() => addSection('list')}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-[#E61E38] hover:text-white text-stone-700 text-xs font-mono-code transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> List
                    </button>
                  </div>
                </div>

                {/* Section Cards List */}
                <div className="space-y-4 pt-2">
                  {sections.map((sec, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-[#E2DACF] bg-[#FAF8F5] transition-all hover:border-stone-400 space-y-2 relative group"
                    >
                      {/* Top Bar for each block */}
                      <div className="flex items-center justify-between text-xs font-mono-code text-stone-500">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-md bg-[#EDE7DC] flex items-center justify-center font-bold text-[10px]">
                            {idx + 1}
                          </span>
                          <span className="uppercase text-[11px] font-bold text-[#E61E38]">
                            {sec.type}
                          </span>
                        </div>

                        {/* Order & Remove Controls */}
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveSection(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 rounded hover:bg-stone-200 disabled:opacity-30 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveSection(idx, 'down')}
                            disabled={idx === sections.length - 1}
                            className="p-1 rounded hover:bg-stone-200 disabled:opacity-30 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => removeSection(idx)}
                            className="p-1 rounded hover:bg-red-100 text-red-600 cursor-pointer ml-1"
                            title="Delete Section"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Content editor according to type */}
                      {sec.type === 'paragraph' && (
                        <textarea
                          rows={3}
                          value={sec.text || ''}
                          onChange={(e) => updateSection(idx, { text: e.target.value })}
                          placeholder="Write paragraph text here..."
                          className="w-full p-3 rounded-lg border border-[#E2DACF] bg-white text-sm font-sans focus:outline-none focus:border-[#E61E38]"
                        />
                      )}

                      {sec.type === 'heading' && (
                        <input
                          type="text"
                          value={sec.text || ''}
                          onChange={(e) => updateSection(idx, { text: e.target.value })}
                          placeholder="Subheading Title..."
                          className="w-full px-3 py-2 rounded-lg border border-[#E2DACF] bg-white font-display font-extrabold text-base text-[#14151A] focus:outline-none focus:border-[#E61E38]"
                        />
                      )}

                      {sec.type === 'blockquote' && (
                        <div className="border-l-4 border-[#E61E38] pl-3 py-1">
                          <textarea
                            rows={2}
                            value={sec.text || ''}
                            onChange={(e) => updateSection(idx, { text: e.target.value })}
                            placeholder="Type an inspirational quote or highlight sentence..."
                            className="w-full p-2 rounded-lg border border-[#E2DACF] bg-white font-editorial italic text-base focus:outline-none focus:border-[#E61E38]"
                          />
                        </div>
                      )}

                      {sec.type === 'image' && (
                        <div className="space-y-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={sec.imageUrl || ''}
                              onChange={(e) => updateSection(idx, { imageUrl: e.target.value })}
                              placeholder="Image URL or pick an artwork"
                              className="w-full px-3 py-1.5 rounded-lg border border-[#E2DACF] bg-white text-xs font-mono-code"
                            />
                            {/* Quick image picker dropdown */}
                            <select
                              onChange={(e) => updateSection(idx, { imageUrl: e.target.value })}
                              className="px-2 py-1.5 rounded-lg border border-[#E2DACF] bg-white text-xs font-mono-code"
                            >
                              <option value="">Preset Studio Artworks...</option>
                              {AVAILABLE_STUDIO_IMAGES.map((img) => (
                                <option key={img.url} value={img.url}>{img.label}</option>
                              ))}
                            </select>
                          </div>
                          {sec.imageUrl && (
                            <div className="h-28 w-full max-w-sm rounded-lg overflow-hidden border border-[#E2DACF]">
                              <img src={sec.imageUrl} alt="preview" className="w-full h-full object-cover" />
                            </div>
                          )}
                          <input
                            type="text"
                            value={sec.imageCaption || ''}
                            onChange={(e) => updateSection(idx, { imageCaption: e.target.value })}
                            placeholder="Image caption / studio note..."
                            className="w-full px-3 py-1.5 rounded-lg border border-[#E2DACF] bg-white text-xs font-sans"
                          />
                        </div>
                      )}

                      {sec.type === 'list' && (
                        <div className="space-y-1.5">
                          {(sec.items || []).map((item, itemIdx) => (
                            <div key={itemIdx} className="flex items-center gap-2">
                              <span className="text-[#E61E38] font-bold">•</span>
                              <input
                                type="text"
                                value={item}
                                onChange={(e) => {
                                  const nextItems = [...(sec.items || [])];
                                  nextItems[itemIdx] = e.target.value;
                                  updateSection(idx, { items: nextItems });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg border border-[#E2DACF] bg-white text-xs font-sans"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  const nextItems = (sec.items || []).filter((_, i) => i !== itemIdx);
                                  updateSection(idx, { items: nextItems });
                                }}
                                className="text-stone-400 hover:text-red-500 p-1 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            onClick={() => {
                              const nextItems = [...(sec.items || []), 'New takeaway point'];
                              updateSection(idx, { items: nextItems });
                            }}
                            className="text-xs font-mono-code text-[#E61E38] hover:underline flex items-center gap-1 pt-1 cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add bullet point
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Bottom Add Bar */}
                <div className="pt-4 border-t border-[#EBE4D8] flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => addSection('paragraph')}
                    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-[#E61E38] text-white text-xs font-mono-code font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Paragraph
                  </button>
                  <button
                    type="button"
                    onClick={() => addSection('image')}
                    className="px-4 py-2 rounded-xl bg-white hover:bg-stone-100 text-stone-800 border border-[#E2DACF] text-xs font-mono-code font-bold transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
                  >
                    <ImageIcon className="w-3.5 h-3.5 text-[#E61E38]" /> Add Illustration
                  </button>
                </div>
              </section>

            </div>
          )}

          {/* TAB 2: LIVE PREVIEW */}
          {activeTab === 'preview' && (
            <div className="max-w-2xl mx-auto space-y-6 bg-white p-6 sm:p-10 rounded-2xl border border-[#E2DACF] shadow-md">
              <div className="flex items-center gap-2 text-xs font-mono-code text-[#5A5852]">
                <span className="px-2.5 py-0.5 rounded-md bg-red-50 text-[#E61E38] border border-red-200 font-bold uppercase tracking-wider text-[10px]">
                  {compiledPost.category}
                </span>
                <span>{compiledPost.date}</span>
                <span>·</span>
                <span>{compiledPost.readTime}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-display font-extrabold uppercase text-[#14151A] tracking-tight leading-tight">
                {compiledPost.title || 'Untitled Post'}
              </h1>

              {compiledPost.subtitle && (
                <p className="text-base text-[#5A5852] font-editorial italic leading-relaxed">
                  {compiledPost.subtitle}
                </p>
              )}

              {/* Cover */}
              {compiledPost.coverImage && (
                <figure className="my-6 rounded-xl overflow-hidden border border-[#E2DACF] shadow-sm">
                  <img src={compiledPost.coverImage} alt="Cover" className="w-full max-h-[400px] object-cover" />
                  {compiledPost.coverCaption && (
                    <figcaption className="p-3 text-xs text-[#5A5852] font-mono-code bg-[#FAF8F5] border-t border-[#E2DACF]">
                      <strong className="text-[#E61E38]">FIGURE 1.0 // </strong>{compiledPost.coverCaption}
                    </figcaption>
                  )}
                </figure>
              )}

              {/* Body */}
              <div className="space-y-6 pt-2">
                {compiledPost.sections.map((sec, idx) => {
                  if (sec.type === 'heading') {
                    return (
                      <h2 key={idx} className="text-xl font-display font-extrabold uppercase text-[#14151A] tracking-tight pt-4 border-t border-[#EBE4D8]">
                        {sec.text}
                      </h2>
                    );
                  }
                  if (sec.type === 'blockquote') {
                    return (
                      <blockquote key={idx} className="p-5 my-4 border-l-4 border-[#E61E38] bg-[#FAF3E8]/80 rounded-r-xl font-editorial italic text-lg text-[#14151A]">
                        {sec.text}
                      </blockquote>
                    );
                  }
                  if (sec.type === 'image' && sec.imageUrl) {
                    return (
                      <figure key={idx} className="my-6 rounded-xl overflow-hidden border border-[#E2DACF]">
                        <img src={sec.imageUrl} alt="section" className="w-full max-h-[360px] object-cover" />
                        {sec.imageCaption && (
                          <figcaption className="p-2.5 text-xs text-[#5A5852] font-mono-code bg-[#FAF8F5] border-t border-[#E2DACF]">
                            {sec.imageCaption}
                          </figcaption>
                        )}
                      </figure>
                    );
                  }
                  if (sec.type === 'list' && sec.items) {
                    return (
                      <ul key={idx} className="space-y-2 text-sm text-stone-800 list-none pl-0">
                        {sec.items.map((it, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#E61E38] mt-2 shrink-0" />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return (
                    <p key={idx} className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans">
                      {sec.text}
                    </p>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: EXPORT CODE */}
          {activeTab === 'export' && (
            <div className="max-w-2xl mx-auto space-y-4">
              <div className="p-5 rounded-2xl bg-white border border-[#E2DACF] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-display font-extrabold uppercase text-sm text-[#14151A]">
                      TypeScript / JSON Code Snippet
                    </h3>
                    <p className="text-xs text-[#5A5852] mt-0.5">
                      You can copy this snippet and paste it straight into <code className="text-[#E61E38] font-mono-code font-bold">src/data/blogPosts.ts</code> to permanently commit it to the repository.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-[#E61E38] text-white text-xs font-mono-code font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-[#14151A] text-stone-200 text-xs font-mono-code overflow-x-auto max-h-[460px] scrollbar-thin">
                  {JSON.stringify(compiledPost, null, 2)}
                </pre>
              </div>
            </div>
          )}

        </div>

        {/* Bottom Status / Publish Footer */}
        <footer className="px-6 py-3 border-t border-[#E2DACF] bg-[#FAF8F5] flex items-center justify-between shrink-0 text-xs text-[#5A5852]">
          <span className="font-mono-code">
            Total sections: <strong className="text-[#14151A]">{sections.length}</strong>
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl hover:bg-stone-200 text-stone-700 font-mono-code font-bold transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handlePublish}
              className="px-5 py-2 rounded-xl bg-[#E61E38] hover:bg-[#C4142B] text-white font-mono-code font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>{selectedPostId !== 'new' ? 'Save Changes' : 'Publish Article'}</span>
            </button>
          </div>
        </footer>

      </div>
    </div>
  );
};
