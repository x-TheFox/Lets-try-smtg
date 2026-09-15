export interface EcosystemTool {
  name: string;
  tagline: string;
  description: string;
  url: string;
  logo?: string;
  category: string;
}

export const ecosystemTools: EcosystemTool[] = [
  {
    name: 'Effortless',
    tagline: 'The Finance OS for your business',
    description: 'Unified automated financial operations, e-invoicing, payments, and multi-bank reconciliation built for high-growth enterprises.',
    url: 'https://www.goeffortless.co',
    logo: '/assets/original/effortless-logo.png',
    category: 'Financial Operations'
  },
  {
    name: 'Actionboard',
    tagline: 'Instant reports from your financial data',
    description: 'Transform complex multi-ledger accounting entries into real-time board-ready executive business intelligence and KPI tracking.',
    url: 'https://www.myactionboard.com',
    logo: '/assets/original/actionboard-logo.png',
    category: 'Business Intelligence'
  },
  {
    name: 'Pulse',
    tagline: 'Project cost tracking for service firms',
    description: 'Granular project-level profitability, employee billable utilization, and client margin intelligence tailored for services and consulting.',
    url: 'https://pulse.myactionboard.com',
    category: 'Profitability Intelligence'
  }
];
