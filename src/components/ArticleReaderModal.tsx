import React, { useEffect, useState } from 'react';
import { X, Clock, Calendar, Tag, ArrowLeft, ArrowRight, Share2, Check, BookOpen, Sparkles } from 'lucide-react';
import { BlogPost, BLOG_POSTS } from '../data/blogPosts';

interface ArticleReaderModalProps {
  article: BlogPost;
  onClose: () => void;
  onSelectArticle: (article: BlogPost) => void;
  onOpenWriter?: () => void;
}

export const ArticleReaderModal: React.FC<ArticleReaderModalProps> = ({
  article,
  onClose,
  onSelectArticle,
  onOpenWriter,
}) => {
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Close on ESC key and prevent body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [onClose]);

  // Handle scroll progress
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const totalHeight = target.scrollHeight - target.clientHeight;
    if (totalHeight > 0) {
      setScrollProgress((target.scrollTop / totalHeight) * 100);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentIndex = BLOG_POSTS.findIndex((p) => p.id === article.id);
  const prevArticle = currentIndex > 0 ? BLOG_POSTS[currentIndex - 1] : null;
  const nextArticle = currentIndex < BLOG_POSTS.length - 1 ? BLOG_POSTS[currentIndex + 1] : null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={article.title}
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
    >
      {/* Background click to dismiss */}
      <div className="absolute inset-0 -z-10" onClick={onClose} />

      {/* Reader Container */}
      <div className="relative w-full max-w-4xl h-full sm:h-[92vh] bg-[#FAF8F5] sm:rounded-2xl shadow-2xl border border-[#E2DACF] flex flex-col overflow-hidden text-[#14151A]">
        
        {/* Top Reading Progress Bar */}
        <div className="h-1 w-full bg-[#EAE3D6] shrink-0">
          <div
            className="h-full bg-[#E61E38] transition-all duration-150 ease-out"
            style={{ width: `${scrollProgress}%` }}
          />
        </div>

        {/* Sticky Reader Header Bar */}
        <header className="px-4 sm:px-6 py-3.5 border-b border-[#E2DACF] bg-[#FAF8F5]/95 backdrop-blur-md flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-[#E61E38] hover:text-white border border-[#E2DACF] text-xs font-mono-code font-bold transition-all shadow-xs cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Back to Portfolio</span>
              <span className="sm:hidden">Back</span>
            </button>
            <div className="hidden md:flex items-center gap-2 text-stone-400 font-mono-code text-[11px]">
              <span>·</span>
              <span className="text-[#E61E38] font-bold uppercase tracking-wider">{article.category}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="p-2 rounded-xl bg-white hover:bg-[#EFEBE2] border border-[#E2DACF] text-stone-700 text-xs font-mono-code transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Copy link to article"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[11px] font-bold">{copied ? 'Copied' : 'Share'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-stone-600 hover:text-white hover:bg-[#E61E38] border border-[#E2DACF] transition-all cursor-pointer shadow-xs"
              aria-label="Close article"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Article Scroll Body */}
        <div
          onScroll={handleScroll}
          className="flex-1 overflow-y-auto px-4 sm:px-8 md:px-14 py-8 sm:py-10 scrollbar-thin scrollbar-thumb-stone-300"
        >
          <article className="max-w-2xl mx-auto space-y-6">
            
            {/* Meta tags */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-mono-code text-[#5A5852]">
              <span className="px-2.5 py-0.5 rounded-md bg-red-50 text-[#E61E38] border border-red-200 font-bold uppercase tracking-wider text-[10px]">
                {article.category}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3 text-[#E61E38]" />
                <span>{article.date}</span>
              </span>
              <span className="text-stone-300">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-[#E61E38]" />
                <span>{article.readTime}</span>
              </span>
            </div>

            {/* Article Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold uppercase tracking-tight text-[#14151A] leading-[1.15]">
              {article.title}
            </h1>

            {/* Subtitle / Deck */}
            {article.subtitle && (
              <p className="text-sm sm:text-base md:text-lg text-[#5A5852] font-editorial italic leading-relaxed">
                {article.subtitle}
              </p>
            )}

            {/* Author Byline Lockup */}
            <div className="flex items-center justify-between py-4 border-y border-[#E2DACF]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#E61E38] text-white font-extrabold flex items-center justify-center font-display text-sm shadow-sm">
                  MA
                </div>
                <div>
                  <div className="font-display font-extrabold text-sm uppercase text-[#14151A]">
                    {article.author.name}
                  </div>
                  <div className="text-xs text-[#5A5852] font-mono-code">
                    {article.author.role}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {article.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="hidden sm:inline text-[10px] font-mono-code px-2 py-0.5 rounded bg-[#EDE7DC] text-stone-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Lead Cover Image */}
            <figure className={`my-6 rounded-xl sm:rounded-2xl overflow-hidden border border-[#E2DACF] shadow-md ${
              article.coverFit === 'contain' ? 'bg-[#14151A]/5' : 'bg-[#F2ECE1]/60'
            }`}>
              <img
                src={article.coverImage}
                alt={article.title}
                className={`w-full block mx-auto transition-all ${
                  article.coverFit === 'cover' 
                    ? 'h-auto max-h-[500px] object-cover object-center'
                    : article.coverFit === 'contain'
                    ? 'h-auto max-h-[620px] object-contain object-center'
                    : 'h-auto object-contain'
                } ${
                  article.coverSize === 'regular' ? 'max-h-[480px]' : article.coverSize === 'large' ? 'max-h-[750px]' : ''
                }`}
              />
              {article.coverCaption && (
                <figcaption className="p-3 text-[11px] sm:text-xs text-[#5A5852] font-mono-code bg-[#FAF8F5] border-t border-[#E2DACF]">
                  <strong className="text-[#E61E38]">FIGURE 1.0 // </strong>
                  {article.coverCaption}
                </figcaption>
              )}
            </figure>

            {/* Structured Content Sections */}
            <div className="prose prose-stone max-w-none space-y-6 pt-2">
              {article.sections.map((sec, idx) => {
                if (sec.type === 'heading') {
                  return (
                    <h2
                      key={idx}
                      className="text-lg sm:text-2xl font-display font-extrabold uppercase text-[#14151A] tracking-tight pt-4 border-t border-[#EBE4D8]"
                    >
                      {sec.text}
                    </h2>
                  );
                }

                if (sec.type === 'blockquote') {
                  return (
                    <blockquote
                      key={idx}
                      className="p-5 my-4 border-l-4 border-[#E61E38] bg-[#FAF3E8]/80 rounded-r-xl font-editorial italic text-lg sm:text-xl text-[#14151A] leading-relaxed shadow-xs"
                    >
                      {sec.text}
                    </blockquote>
                  );
                }

                if (sec.type === 'image' && sec.imageUrl) {
                  return (
                    <figure
                      key={idx}
                      className={`my-6 rounded-xl sm:rounded-2xl overflow-hidden border border-[#E2DACF] shadow-sm ${
                        sec.imageFit === 'contain' ? 'bg-[#14151A]/5' : 'bg-[#F2ECE1]/60'
                      }`}
                    >
                      <img
                        src={sec.imageUrl}
                        alt={sec.imageCaption || 'Article Illustration'}
                        className={`w-full block mx-auto transition-all ${
                          sec.imageFit === 'cover'
                            ? 'h-auto max-h-[460px] object-cover object-center'
                            : sec.imageFit === 'contain'
                            ? 'h-auto max-h-[600px] object-contain object-center'
                            : 'h-auto object-contain'
                        } ${
                          sec.imageSize === 'regular' ? 'max-h-[460px]' : sec.imageSize === 'large' ? 'max-h-[700px]' : ''
                        }`}
                      />
                      {sec.imageCaption && (
                        <figcaption className="p-3 text-[11px] sm:text-xs text-[#5A5852] font-mono-code bg-[#FAF8F5] border-t border-[#E2DACF]">
                          <strong className="text-[#E61E38]">STUDIO NOTE // </strong>
                          {sec.imageCaption}
                        </figcaption>
                      )}
                    </figure>
                  );
                }

                if (sec.type === 'list' && sec.items) {
                  return (
                    <ul key={idx} className="my-4 space-y-2 text-sm sm:text-base text-stone-800 list-none pl-0">
                      {sec.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#E61E38] mt-2 shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p
                    key={idx}
                    className="text-sm sm:text-base text-stone-800 leading-relaxed font-sans font-normal"
                  >
                    {sec.text}
                  </p>
                );
              })}
            </div>

            {/* Tags footer */}
            <div className="pt-6 border-t border-[#E2DACF] flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono-code text-stone-400 flex items-center gap-1 mr-1">
                <Tag className="w-3.5 h-3.5" /> Tags:
              </span>
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E2DACF] text-[11px] font-mono-code text-stone-700"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Card */}
            <div className="mt-8 p-6 rounded-2xl bg-[#EDE7DC]/70 border border-[#E2DACF] flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#14151A] text-white flex items-center justify-center font-display font-extrabold text-xl shadow-md shrink-0">
                <Sparkles className="w-6 h-6 text-[#E61E38]" />
              </div>
              <div className="flex-1">
                <div className="text-xs font-mono-code text-[#E61E38] font-bold uppercase tracking-wider">
                  ABOUT THE CREATOR
                </div>
                <h3 className="text-base font-display font-extrabold uppercase text-[#14151A] mt-0.5">
                  MikAsciii and his Imaginary Friends
                </h3>
                <p className="text-xs text-[#5A5852] mt-1 leading-relaxed font-sans">
                  Independent artist, digital illustrator, and creative explorer creating characters and computational artifacts for fun.
                </p>
              </div>
              <button
                onClick={() => {
                  onClose();
                  const contactEl = document.getElementById('contact');
                  if (contactEl) contactEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-4 py-2 rounded-xl bg-[#E61E38] text-white text-xs font-bold font-mono-code uppercase tracking-wider hover:bg-[#C4142B] transition-all shadow-xs shrink-0 cursor-pointer"
              >
                Say Hello
              </button>
            </div>

            {/* Article Pager */}
            <div className="pt-8 border-t border-[#E2DACF] grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <button
                  onClick={() => onSelectArticle(prevArticle)}
                  className="p-4 rounded-xl bg-white border border-[#E2DACF] hover:border-[#E61E38] text-left transition-all group shadow-xs cursor-pointer flex flex-col justify-between"
                >
                  <div className="text-[10px] font-mono-code text-stone-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
                    <span>Previous Article</span>
                  </div>
                  <div className="font-display font-bold text-xs uppercase text-[#14151A] group-hover:text-[#E61E38] line-clamp-1">
                    {prevArticle.title}
                  </div>
                </button>
              ) : <div />}

              {nextArticle ? (
                <button
                  onClick={() => onSelectArticle(nextArticle)}
                  className="p-4 rounded-xl bg-white border border-[#E2DACF] hover:border-[#E61E38] text-right transition-all group shadow-xs cursor-pointer flex flex-col justify-between"
                >
                  <div className="text-[10px] font-mono-code text-stone-400 uppercase tracking-wider flex items-center justify-end gap-1 mb-1">
                    <span>Next Article</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="font-display font-bold text-xs uppercase text-[#14151A] group-hover:text-[#E61E38] line-clamp-1">
                    {nextArticle.title}
                  </div>
                </button>
              ) : <div />}
            </div>

          </article>
        </div>

      </div>
    </div>
  );
};
