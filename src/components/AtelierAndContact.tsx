import React, { useState } from 'react';
import { Check, Send } from 'lucide-react';

interface AtelierAndContactProps {
  preselectedArtwork?: string;
}

export const AtelierAndContact: React.FC<AtelierAndContactProps> = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    inquiryType: 'Institutional Acquisition / Patronage',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setErrorMessage('Please complete all required fields.');
      return;
    }

    if (!formState.email.includes('@') || !formState.email.includes('.')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 md:py-32 relative border-t border-[#E2DACF] overflow-hidden">
      
      {/* 30% Opacity Section Background Image */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="/src/assets/images/painterly_contact_bg_1791185387415.jpg"
          alt=""
          className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F5F2EB]/50 via-transparent to-[#F5F2EB]/60" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 md:pl-16">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 md:mb-14">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded bg-[#FAF8F5] border border-[#E61E38]/30 text-[10px] font-mono-code uppercase tracking-wider text-[#E61E38] mb-2.5 sm:mb-3 font-bold shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E61E38]" />
            <span>04 // ACQUISITIONS & INQUIRIES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase text-[#14151A] tracking-tight">
            Patronage, <span className="font-editorial italic font-normal lowercase tracking-normal text-[#E61E38] text-3xl sm:text-5xl md:text-6xl">commissions</span> & Loans
          </h2>
          <p className="text-[#5A5852] text-xs sm:text-sm mt-2 sm:mt-3 leading-relaxed font-sans px-2">
            Institutional acquisitions, museum exhibition loans, and site-specific commissions. Submit brief details below for direct curatorial review.
          </p>
        </div>

        {/* Acquisition Inquiry Form */}
        <div className="p-4 sm:p-7 md:p-10 rounded-xl sm:rounded-2xl bg-[#FAF8F5] border border-[#E2DACF] shadow-xl">
          {isSubmitted ? (
            <div className="py-10 sm:py-12 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-red-50 border border-[#E61E38]/40 text-[#E61E38] flex items-center justify-center mx-auto shadow-sm">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-editorial italic font-normal text-[#14151A] tracking-tight">
                Inquiry Transmitted
              </h3>
              <p className="text-xs sm:text-sm text-[#5A5852] max-w-md mx-auto leading-relaxed font-sans">
                Thank you, {formState.name}. Your acquisition proposal has been received. A curatorial representative will respond to <span className="font-mono-code text-[#E61E38] font-bold">{formState.email}</span> within two business days.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => {
                    setFormState({
                      name: '',
                      email: '',
                      inquiryType: 'Institutional Acquisition / Patronage',
                      message: '',
                    });
                    setIsSubmitted(false);
                  }}
                  className="px-5 py-2.5 bg-[#EDE7DC] hover:bg-[#E61E38] hover:text-white border border-[#E2DACF] text-xs font-mono-code text-stone-700 rounded-xl transition-all font-semibold min-h-[44px]"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="border-b border-[#EBE4D8] pb-3 sm:pb-4 flex flex-col xs:flex-row items-start xs:items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-editorial italic font-normal text-[#14151A] tracking-tight">
                    Acquisition Inquiry Brief
                  </h3>
                  <p className="text-xs text-[#5A5852] mt-0.5 font-sans">
                    Please provide your representative details and proposal summary.
                  </p>
                </div>
                <span className="text-[9px] sm:text-[10px] font-mono-code text-[#E61E38] font-bold px-2 py-0.5 rounded bg-red-50 border border-[#E61E38]/20 shrink-0">
                  SECURE CHANNEL
                </span>
              </div>

              {errorMessage && (
                <div className="p-3 sm:p-3.5 rounded-lg bg-red-50 border border-[#E61E38]/40 text-[#E61E38] text-xs font-mono-code font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Field 1: Name & Field 2: Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <div>
                  <label className="block text-[11px] sm:text-xs font-mono-code text-[#14151A] uppercase tracking-wider mb-1.5 font-bold">
                    Name / Representative *
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Dr. Camille Delacroix"
                    className="w-full px-3.5 py-3 rounded-xl bg-[#FAF8F5] border border-[#E2DACF] text-stone-900 text-base sm:text-sm focus:outline-none focus:border-[#E61E38] focus:bg-white transition-all placeholder:text-stone-400 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-[11px] sm:text-xs font-mono-code text-[#14151A] uppercase tracking-wider mb-1.5 font-bold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. curator@biennale.org"
                    className="w-full px-3.5 py-3 rounded-xl bg-[#FAF8F5] border border-[#E2DACF] text-stone-900 text-base sm:text-sm focus:outline-none focus:border-[#E61E38] focus:bg-white transition-all placeholder:text-stone-400 font-sans"
                  />
                </div>
              </div>

              {/* Field 3: Inquiry Nature */}
              <div>
                <label className="block text-[11px] sm:text-xs font-mono-code text-[#14151A] uppercase tracking-wider mb-1.5 font-bold">
                  Inquiry Nature *
                </label>
                <select
                  value={formState.inquiryType}
                  onChange={(e) => setFormState({ ...formState, inquiryType: e.target.value })}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#FAF8F5] border border-[#E2DACF] text-stone-900 text-base sm:text-sm focus:outline-none focus:border-[#E61E38] focus:bg-white transition-all font-sans"
                >
                  <option value="Institutional Acquisition / Patronage">Institutional Acquisition / Patronage</option>
                  <option value="Museum Exhibition Loan">Museum Exhibition Loan</option>
                  <option value="Site-Specific Architectural Commission">Site-Specific Architectural Commission</option>
                  <option value="Curatorial Research & Publication">Curatorial Research & Publication</option>
                </select>
              </div>

              {/* Field 4: Proposal Details */}
              <div>
                <label className="block text-[11px] sm:text-xs font-mono-code text-[#14151A] uppercase tracking-wider mb-1.5 font-bold">
                  Proposal Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Outline the scope, artwork(s) of interest, intended installation context, or exhibition timeframe..."
                  className="w-full px-3.5 py-3 rounded-xl bg-[#FAF8F5] border border-[#E2DACF] text-stone-900 text-base sm:text-sm focus:outline-none focus:border-[#E61E38] focus:bg-white transition-all placeholder:text-stone-400 resize-none leading-relaxed font-sans"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#E61E38] hover:bg-[#C4142B] text-white font-extrabold uppercase tracking-wider text-xs transition-all flex items-center justify-center gap-2 shadow-md disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] min-h-[48px]"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Transmitting Brief...' : 'Transmit Acquisition Brief'}</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </section>
  );
};
