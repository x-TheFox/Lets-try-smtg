export interface ServicePillar {
  slug: string;
  name: string;
  tagline: string;
  shortDesc: string;
  heroDesc: string;
  metric: string;
  metricLabel: string;
  badge: string;
  deliverables: {
    title: string;
    description: string;
  }[];
  features: string[];
}

export const servicesData: Record<string, ServicePillar> = {
  'accounting-hub': {
    slug: 'accounting-hub',
    name: 'Accounting Hub',
    tagline: 'Professional accounting, powered by technology.',
    shortDesc: 'Real-time financial clarity. We handle the books so you can handle the business. Cut operational costs by up to 50%.',
    heroDesc: 'Say goodbye to messy books and missed deadlines. Agrya’s Accounting Hub delivers real-time financial tracking, automated reconciliation, and audit-ready books managed by seasoned chartered accountants.',
    metric: 'Up to 50%',
    metricLabel: 'Operating Cost Reduction',
    badge: 'Operations & Compliance',
    deliverables: [
      {
        title: 'End-to-End Bookkeeping',
        description: 'Daily transaction categorization, automated bank reconciliations, vendor invoice approvals, and receipt management.'
      },
      {
        title: 'Statutory & Tax Compliance',
        description: 'Full-cycle GST filings (GSTR-1, 3B, 9C), TDS returns, advance tax computations, and regulatory filings with zero penalty risk.'
      },
      {
        title: 'Executive MIS & Reporting',
        description: 'P&L, Balance Sheet, Cash Flow forecasts, and variance analysis delivered within 5 business days of month-end.'
      },
      {
        title: 'Payroll & Treasury Processing',
        description: 'Compliant monthly payroll execution, PF/ESI/PT filings, reimbursement processing, and vendor payment batching.'
      }
    ],
    features: [
      'Daily ledger sync across banks & gateways',
      'Integration with Tally Prime, Zoho Books, QuickBooks, Effortless',
      'Real-time cash flow & burn visibility',
      'Continuous audit readiness & documentation repository'
    ]
  },
  'cfo': {
    slug: 'cfo',
    name: 'Virtual CFO',
    tagline: 'Strategic financial leadership, on demand.',
    shortDesc: 'Strategic financial leadership without the full-time headcount. Designed for ambitious entrepreneurs focused on growth.',
    heroDesc: 'Get the vision, discipline, and strategic clarity of an experienced Chief Financial Officer at a fraction of the full-time cost. We partner closely with founders to scale capital efficiency, navigate fundraises, and steer board governance.',
    metric: '10x ROI',
    metricLabel: 'Capital Efficiency Multiple',
    badge: 'Strategic C-Suite Advisory',
    deliverables: [
      {
        title: 'Dynamic FP&A & 3-Statement Modeling',
        description: 'Scenario-tested revenue forecasts, hiring plans, unit economics sensitivity, and dynamic runway simulations.'
      },
      {
        title: 'Fundraising & Investor Readiness',
        description: 'Institutional-grade pitch deck financials, cap table structuring, data room creation, and investor due-diligence management.'
      },
      {
        title: 'Unit Economics & Pricing Strategy',
        description: 'In-depth CAC, LTV, contribution margin, cohort retention, and gross margin optimization by business line.'
      },
      {
        title: 'Board Reporting & Governance',
        description: 'Crisp, high-impact monthly board decks and investor updates that inspire institutional shareholder confidence.'
      }
    ],
    features: [
      'Partner-level dedicated Chartered Accountant oversight',
      'Strategic attendance at board & investor meetings',
      'Venture debt & equity syndicate coordination',
      'Cash runway extension and capital allocation advisory'
    ]
  },
  'cfo-support': {
    slug: 'cfo-support',
    name: 'CFO Support',
    tagline: 'Power your in-house finance team with expert execution.',
    shortDesc: 'Force-multiply your finance team. Specialized support for AP/AR, FP&A, payroll, and regulatory compliance.',
    heroDesc: 'High-velocity financial modeling, compliance audits, and specialized execution horsepower when your core in-house finance team is stretched thin during critical growth phases.',
    metric: 'Zero Headcount Delay',
    metricLabel: 'On-Demand Capacity',
    badge: 'Enterprise Execution Pods',
    deliverables: [
      {
        title: 'Due Diligence & Audit Remediation',
        description: 'Accelerated audit prep, Big 4 audit coordination, historical reconciliations, and clean transaction verification.'
      },
      {
        title: 'Systems & ERP Migration',
        description: 'Architecting transitions from entry-level software to robust mid-market ERPs with zero downtime.'
      },
      {
        title: 'Specialized FP&A Sprints',
        description: 'Ad-hoc budgeting models for new business unit expansion, international subsidiary setup, or M&A integration.'
      },
      {
        title: 'Overflow Back-Office Execution',
        description: 'Scalable burst capacity for peak billing cycles, annual statutory audits, and year-end tax closings.'
      }
    ],
    features: [
      'Frictionless integration into existing corporate workflows',
      'Elastic team sizing adapted to quarterly cycles',
      'Rigorous NDA and confidentiality protocols',
      'Strict quality controls signed off by Partner CAs'
    ]
  }
};
