export interface EcosystemTool {
  name: string;
  tagline: string;
  description: string;
  url: string;
  logo?: string;
  category: string;
  isSubsidiary?: boolean;
}

export const ecosystemTools: EcosystemTool[] = [
  {
    name: 'Effortless',
    tagline: 'The All-In-One Growth Platform for Indian SMBs',
    description: 'Automating billing, expenses, 100% bi-directional Tally sync, AI-powered 3-way reconciliation (PO + GRN + Vendor Bills), and cashflow control.',
    url: 'https://www.goeffortless.co',
    logo: '/assets/original/effortless-logo.png',
    category: 'Financial Operations'
  },
  {
    name: 'Actionboard',
    tagline: 'AI Finance Software for the CFO\'s Office',
    description: 'Runs the CFO\'s office on PharOS: live ledger financial reporting, multi-entity consolidation, procure-to-pay, and order-to-cash. Built by Chartered Accountants.',
    url: 'https://www.myactionboard.com',
    logo: '/assets/original/actionboard-logo.png',
    category: 'CFO Office & BI'
  },
  {
    name: 'Pulse',
    tagline: 'Bridge the gap between costs and time spent',
    description: 'Built by Actionboard, the tech subsidiary of Agrya. Track timesheets, enforce project time budgets, flag projects in the red, and deliver granular profitability reports.',
    url: 'https://pulse.myactionboard.com',
    category: 'Service Profitability',
    isSubsidiary: true
  }
];
