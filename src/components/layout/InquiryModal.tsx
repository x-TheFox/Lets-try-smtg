import React, { useState } from 'react';
import { X, CheckCircle, Mail, ArrowRight, Copy, Check, Loader2, Calendar, Clock, Download } from 'lucide-react';
import { clsx } from 'clsx';
import { trackEvent } from '../../utils/analytics';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  partnerName?: string;
}

const AVAILABLE_SLOTS = [
  '10:30 AM - 11:15 AM IST',
  '02:00 PM - 02:45 PM IST',
  '04:30 PM - 05:15 PM IST',
  '06:00 PM - 06:45 PM IST'
];

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultService = 'Virtual CFO',
  partnerName
}) => {
  const [activeTab, setActiveTab] = useState<'book' | 'inquire'>('book');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [service, setService] = useState(defaultService);
  const [selectedPartner, setSelectedPartner] = useState<string>(partnerName || 'Jayakumar M (Co-Founder)');
  const [selectedDate, setSelectedDate] = useState<string>('Tomorrow');
  const [selectedSlot, setSelectedSlot] = useState<string>(AVAILABLE_SLOTS[0]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate next 5 business dates for instant slot selection
  const businessDates = [
    { label: 'Tomorrow', dateStr: 'Wed, Sep 17' },
    { label: 'Thursday', dateStr: 'Thu, Sep 18' },
    { label: 'Friday', dateStr: 'Fri, Sep 19' },
    { label: 'Next Monday', dateStr: 'Mon, Sep 22' },
    { label: 'Next Tuesday', dateStr: 'Tue, Sep 23' },
  ];

  const getPartnerEmail = () => {
    if (selectedPartner.includes('Jayakumar')) return 'jk@agrya.in';
    if (selectedPartner.includes('Priya')) return 'priya@agrya.in';
    return 'hello@agrya.in';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    trackEvent(activeTab === 'book' ? 'booking_select_slot' : 'inquiry_submit', {
      name,
      email,
      company,
      service,
      partner: selectedPartner,
      date: selectedDate,
      slot: selectedSlot
    });
    // Simulate instantaneous async edge submission
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  const handleCopyEmail = () => {
    const dest = getPartnerEmail();
    navigator.clipboard.writeText(dest);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTriggerMailClient = () => {
    const dest = getPartnerEmail();
    const subject = encodeURIComponent(`Consultation Booking: ${name} (${company}) with ${selectedPartner}`);
    const body = encodeURIComponent(
      `Partner Requested: ${selectedPartner}\nSlot: ${selectedDate} at ${selectedSlot}\nName: ${name}\nEmail: ${email}\nCompany: ${company}\nService: ${service}\n\nNotes:\n${message}`
    );
    window.location.href = `mailto:${dest}?subject=${subject}&body=${body}`;
  };

  const handleDownloadICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Agrya Consulting//Partner Desk//EN',
      'BEGIN:VEVENT',
      `SUMMARY:Agrya Executive Consultation with ${selectedPartner}`,
      `DESCRIPTION:Virtual CFO & Strategic Financial Consultation for ${company}.\\nService: ${service}\\nNotes: ${message || 'None provided'}`,
      'LOCATION:Google Meet (meet.google.com/agr-part-fin)',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `agrya-consultation-${company.toLowerCase().replace(/\s+/g, '-') || 'booking'}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-agrya-slate-950/70 backdrop-blur-sm transition-opacity duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-agrya-slate-200 relative overflow-hidden animate-modal-in max-h-[90vh] overflow-y-auto"
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
            
            {/* HEADER */}
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase font-bold text-agrya-teal-700 tracking-wider">
                  Direct Partner Concierge
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <h3 id="inquiry-title" className="text-2xl font-bold text-agrya-slate-900 tracking-tight mt-1">
                {partnerName ? `Schedule Consultation with ${partnerName}` : 'Schedule Partner Consultation'}
              </h3>
              <p className="text-xs text-agrya-slate-600 mt-1">
                Direct engagement with senior Chartered Accountants. Select a confirmed calendar slot or submit an advisory brief.
              </p>
            </div>

            {/* TAB SELECTOR: INSTANT BOOKING VS WRITTEN INQUIRY */}
            <div className="flex rounded-xl bg-agrya-slate-100 p-1 mb-5 border border-agrya-slate-200 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveTab('book')}
                className={clsx(
                  "flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 spring-snappy transition-all",
                  activeTab === 'book' ? "bg-white text-agrya-slate-900 shadow-sm" : "text-agrya-slate-500 hover:text-agrya-slate-800"
                )}
              >
                <Calendar className="w-3.5 h-3.5 text-agrya-teal-600" />
                <span>Instant Calendar Booking</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('inquire')}
                className={clsx(
                  "flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 spring-snappy transition-all",
                  activeTab === 'inquire' ? "bg-white text-agrya-slate-900 shadow-sm" : "text-agrya-slate-500 hover:text-agrya-slate-800"
                )}
              >
                <Mail className="w-3.5 h-3.5 text-agrya-slate-500" />
                <span>Written Advisory Brief</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* PARTNER SELECTION */}
              <div>
                <label className="block text-xs font-semibold text-agrya-slate-700 mb-1">Select Practice Lead / Desk</label>
                <select
                  value={selectedPartner}
                  onChange={(e) => setSelectedPartner(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-agrya-slate-200 text-xs text-agrya-slate-900 focus:outline-none focus:ring-2 focus:ring-agrya-teal-600 focus:border-transparent transition-all bg-white"
                >
                  <option value="Jayakumar M (Co-Founder & Managing Partner)">Jayakumar M — Co-Founder (FCA, ACS • jk@agrya.in)</option>
                  <option value="Priya Raghavan (Co-Founder & Managing Partner)">Priya Raghavan — Co-Founder (FCA, ACCA London • priya@agrya.in)</option>
                  <option value="Ram Prakash R (Partner, Head of Automations)">Ram Prakash R — Automation & Technology Lead</option>
                  <option value="Sai Avinash K (Partner, Hyderabad Practice)">Sai Avinash K — Hyderabad Practice Lead</option>
                  <option value="General Partner Discovery Desk">General Partner Discovery Desk</option>
                </select>
              </div>

              {/* CALENDAR SLOT SELECTOR IF 'BOOK' TAB IS ACTIVE */}
              {activeTab === 'book' && (
                <div className="p-4 rounded-2xl bg-agrya-teal-50/50 border border-agrya-teal-100 space-y-3">
                  <div>
                    <label className="block text-[11px] font-mono font-bold text-agrya-teal-900 uppercase mb-1.5">
                      1. Select Consultation Date
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {businessDates.map((bDate) => (
                        <button
                          key={bDate.label}
                          type="button"
                          onClick={() => setSelectedDate(`${bDate.label} (${bDate.dateStr})`)}
                          className={clsx(
                            "p-2 rounded-xl text-left border text-xs spring-snappy transition-all",
                            selectedDate.startsWith(bDate.label)
                              ? "bg-agrya-teal-700 text-white border-agrya-teal-700 shadow-sm"
                              : "bg-white text-agrya-slate-700 border-agrya-slate-200 hover:border-agrya-teal-300"
                          )}
                        >
                          <div className="font-bold">{bDate.label}</div>
                          <div className={clsx("text-[10px]", selectedDate.startsWith(bDate.label) ? "text-agrya-teal-100" : "text-agrya-slate-400")}>
                            {bDate.dateStr}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono font-bold text-agrya-teal-900 uppercase mb-1.5">
                      2. Available Executive Slots
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {AVAILABLE_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setSelectedSlot(slot)}
                          className={clsx(
                            "p-2.5 rounded-xl text-left border text-xs font-mono flex items-center justify-between spring-snappy transition-all",
                            selectedSlot === slot
                              ? "bg-agrya-teal-700 text-white border-agrya-teal-700 font-bold shadow-sm"
                              : "bg-white text-agrya-slate-700 border-agrya-slate-200 hover:border-agrya-teal-300"
                          )}
                        >
                          <span>{slot}</span>
                          <Clock className="w-3.5 h-3.5 opacity-60" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* CONTACT DETAILS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-agrya-slate-700 mb-1">Company / Entity *</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. Acme Health Tech"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-agrya-slate-200 text-xs text-agrya-slate-900 focus:outline-none focus:ring-2 focus:ring-agrya-teal-600 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-agrya-slate-700 mb-1">Practice Area</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-agrya-slate-200 text-xs text-agrya-slate-900 focus:outline-none focus:ring-2 focus:ring-agrya-teal-600 focus:border-transparent transition-all bg-white"
                  >
                    <option value="Virtual CFO">Virtual CFO (Strategic Advisory)</option>
                    <option value="Accounting Hub">Accounting Hub (Bookkeeping & MIS)</option>
                    <option value="CFO Support">CFO Support (Team Execution Pods)</option>
                    <option value="Full Fiduciary Suite">Full Enterprise Fiduciary Suite</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-agrya-slate-700 mb-1">Financial Focus or Objectives</label>
                <textarea
                  rows={2}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="e.g. Preparing for Series A round, current ERP stack, or accelerated month-end close..."
                  className="w-full px-3.5 py-2 rounded-xl border border-agrya-slate-200 text-xs text-agrya-slate-900 focus:outline-none focus:ring-2 focus:ring-agrya-teal-600 focus:border-transparent transition-all"
                />
              </div>

              {/* ACTION FOOTER */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="text-xs text-agrya-teal-700 hover:text-agrya-teal-900 flex items-center gap-1.5 font-medium"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : `Direct desk: ${getPartnerEmail()}`}</span>
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-6 py-2.5 bg-agrya-slate-900 hover:bg-agrya-slate-800 disabled:bg-agrya-slate-600 text-white rounded-full text-xs font-semibold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Locking Slot...</span>
                    </>
                  ) : (
                    <>
                      <span>{activeTab === 'book' ? 'Confirm Calendar Booking' : 'Submit Advisory Brief'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        ) : (
          
          /* CONFIRMED BOOKING / INQUIRY SUCCESS SCREEN */
          <div className="py-6 text-center space-y-5 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 mx-auto flex items-center justify-center">
              <CheckCircle className="w-7 h-7" />
            </div>

            <div>
              <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Slot Confirmed
              </span>
              <h3 className="text-2xl font-bold text-agrya-slate-900 mt-2">
                Consultation Reserved
              </h3>
              <p className="text-xs text-agrya-slate-600 mt-1 max-w-sm mx-auto">
                Your direct advisory session with <span className="font-bold text-agrya-slate-900">{selectedPartner}</span> is locked.
              </p>
            </div>

            {/* BOOKING DETAILS TILE */}
            <div className="p-4 rounded-2xl bg-agrya-slate-50 border border-agrya-slate-200 text-left text-xs space-y-2 font-mono">
              <div className="flex justify-between border-b border-agrya-slate-200/80 pb-1.5">
                <span className="text-agrya-slate-500">Date & Slot:</span>
                <span className="font-bold text-agrya-slate-900">{selectedDate} • {selectedSlot}</span>
              </div>
              <div className="flex justify-between border-b border-agrya-slate-200/80 pb-1.5">
                <span className="text-agrya-slate-500">Organization:</span>
                <span className="font-bold text-agrya-slate-900">{company} ({name})</span>
              </div>
              <div className="flex justify-between border-b border-agrya-slate-200/80 pb-1.5">
                <span className="text-agrya-slate-500">Lead Advisor:</span>
                <span className="font-bold text-agrya-teal-700">{selectedPartner}</span>
              </div>
              <div className="flex justify-between pt-0.5">
                <span className="text-agrya-slate-500">Direct Contact:</span>
                <span className="font-bold text-agrya-slate-900">{getPartnerEmail()}</span>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleDownloadICS}
                className="w-full sm:w-auto px-5 py-2.5 bg-agrya-teal-700 hover:bg-agrya-teal-800 text-white rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <button
                onClick={handleTriggerMailClient}
                className="w-full sm:w-auto px-5 py-2.5 bg-white border border-agrya-slate-200 hover:bg-agrya-slate-50 text-agrya-slate-800 rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email Partner Desk</span>
              </button>
            </div>

            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="text-xs font-mono text-agrya-slate-400 hover:text-agrya-slate-700"
            >
              Close Window
            </button>

          </div>
        )}
      </div>
    </div>
  );
};
