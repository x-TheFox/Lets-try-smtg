import React, { useState } from 'react';
import { X, CheckCircle, Mail, ArrowRight, Copy, Check, Loader2 } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  partnerName?: string;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Virtual CFO',
  partnerName
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(defaultService);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate instantaneous async edge submission
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hello@agrya.in');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTriggerMailClient = () => {
    const subject = encodeURIComponent(`Consultation Request: ${name} (${company}) - ${service}`);
    const body = encodeURIComponent(
      `Partner Requested: ${partnerName || 'Senior Partner Desk'}\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nService: ${service}\n\nNotes:\n${message}`
    );
    window.location.href = `mailto:hello@agrya.in?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-agrya-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-agrya-slate-200 relative overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inquiry-title"
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
                Partner Consultation
              </span>
              <h3 id="inquiry-title" className="text-2xl font-bold text-agrya-slate-900 tracking-tight mt-1">
                {partnerName ? `Consult with ${partnerName}` : 'Speak with an Agrya Partner'}
              </h3>
              <p className="text-xs sm:text-sm text-agrya-slate-600 mt-1">
                {partnerName 
                  ? `Direct advisory engagement with ${partnerName} regarding your financial roadmap.`
                  : 'Connect with our senior Chartered Accountants to review your accounting and Virtual CFO requirements.'}
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
                <label className="block text-xs font-semibold text-agrya-slate-700 mb-1">Financial Objective or Context</label>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your current accounting stack, immediate milestones, or fundraising timeline..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-agrya-slate-200 text-xs text-agrya-slate-900 focus:outline-none focus:ring-2 focus:ring-agrya-teal-600 focus:border-transparent transition-all"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-xs text-agrya-teal-700 hover:text-agrya-teal-900 flex items-center gap-1.5 font-medium"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied to Clipboard!' : 'Copy direct: hello@agrya.in'}</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 bg-agrya-slate-900 hover:bg-agrya-slate-800 disabled:bg-agrya-slate-600 text-white rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center space-y-4 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-agrya-teal-50 border border-agrya-teal-200 text-agrya-teal-700 mx-auto flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-agrya-slate-900">Inquiry Confirmed</h3>
            <p className="text-xs sm:text-sm text-agrya-slate-600 max-w-sm mx-auto leading-relaxed">
              Your inquiry has been compiled for our partner desk. A Senior Partner CA will review your requirements and respond within 24 business hours.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleTriggerMailClient}
                className="px-5 py-2 bg-agrya-teal-700 hover:bg-agrya-teal-800 text-white rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Open in Email App</span>
              </button>
              <button
                onClick={() => {
                  setSubmitted(false);
                  onClose();
                }}
                className="px-5 py-2 bg-agrya-slate-100 hover:bg-agrya-slate-200 text-agrya-slate-800 rounded-full text-xs font-semibold transition-all"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
