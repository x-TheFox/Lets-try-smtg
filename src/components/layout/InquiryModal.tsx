import React, { useState } from 'react';
import { X, CheckCircle, Mail, ArrowRight } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Virtual CFO'
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate mailto link as fallback destination
    const subject = encodeURIComponent(`Inquiry from ${name} (${company}) - ${service}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nCompany: ${company}\nService of Interest: ${service}\n\nMessage:\n${message}`
    );
    window.open(`mailto:hello@agrya.in?subject=${subject}&body=${body}`, '_blank');
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-agrya-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-agrya-slate-200 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-agrya-slate-100 text-agrya-slate-400 hover:text-agrya-slate-700 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="mb-6">
              <span className="text-[10px] font-mono uppercase font-semibold text-agrya-teal-700 tracking-wider">
                Initiate Consultation
              </span>
              <h3 className="text-2xl font-bold text-agrya-slate-900 tracking-tight mt-1">
                Speak with an Agrya Partner
              </h3>
              <p className="text-xs sm:text-sm text-agrya-slate-600 mt-1">
                Connect directly with our senior Chartered Accountants to assess your financial operating requirements.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-agrya-slate-700 mb-1">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Anand V"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-agrya-slate-200 text-xs text-agrya-slate-900 focus:outline-none focus:ring-2 focus:ring-agrya-teal-600 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-agrya-slate-700 mb-1">Work Email *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="anand@company.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-agrya-slate-200 text-xs text-agrya-slate-900 focus:outline-none focus:ring-2 focus:ring-agrya-teal-600 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-agrya-slate-700 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Tech"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-agrya-slate-200 text-xs text-agrya-slate-900 focus:outline-none focus:ring-2 focus:ring-agrya-teal-600 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-agrya-slate-700 mb-1">Service Required</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-agrya-slate-200 text-xs text-agrya-slate-900 focus:outline-none focus:ring-2 focus:ring-agrya-teal-600 focus:border-transparent transition-all bg-white"
                  >
                    <option value="Accounting Hub">Accounting Hub (Bookkeeping & MIS)</option>
                    <option value="Virtual CFO">Virtual CFO (Strategic Advisory)</option>
                    <option value="CFO Support">CFO Support (Team Pods)</option>
                    <option value="Comprehensive Enterprise Suite">Comprehensive Enterprise Suite</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-agrya-slate-700 mb-1">Brief Overview of Your Needs</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your current accounting setup, growth stage, or immediate financial objectives..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-agrya-slate-200 text-xs text-agrya-slate-900 focus:outline-none focus:ring-2 focus:ring-agrya-teal-600 focus:border-transparent transition-all"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href="mailto:hello@agrya.in"
                  className="text-xs text-agrya-teal-700 hover:text-agrya-teal-900 flex items-center gap-1 font-medium"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Or email directly at hello@agrya.in
                </a>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2.5 bg-agrya-slate-900 hover:bg-agrya-slate-800 text-white rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <span>Submit Inquiry</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-agrya-teal-50 border border-agrya-teal-200 text-agrya-teal-700 mx-auto flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-agrya-slate-900">Inquiry Prepared</h3>
            <p className="text-xs sm:text-sm text-agrya-slate-600 max-w-sm mx-auto">
              Your inquiry has been routed to our partner desk at <strong className="text-agrya-slate-900">hello@agrya.in</strong>. An Agrya partner will respond within 24 business hours.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="px-6 py-2.5 bg-agrya-slate-900 text-white rounded-full text-xs font-semibold hover:bg-agrya-slate-800 transition-all"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
