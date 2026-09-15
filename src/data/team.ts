export interface TeamMember {
  id: string;
  name: string;
  role: string;
  credentials?: string;
  bio: string;
  image: string;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'avinash',
    name: 'Avinash Sancheti',
    role: 'Co-Founder & Partner',
    credentials: 'FCA, DISA',
    bio: 'Fellow Chartered Accountant with deep expertise in tech-enabled accounting infrastructure, virtual CFO advisory, and financial automation for high-growth enterprises.',
    image: '/assets/original/team/avinash.png'
  },
  {
    id: 'jayakumar',
    name: 'Jayakumar',
    role: 'Co-Founder & Partner',
    credentials: 'FCA',
    bio: 'Fellow Chartered Accountant specializing in corporate governance, mergers & acquisitions, statutory audit, and strategic financial planning across diverse industry sectors.',
    image: '/assets/original/team/jayakumar.png'
  },
  {
    id: 'manoj',
    name: 'Manoj',
    role: 'Partner',
    credentials: 'ACA',
    bio: 'Associate Chartered Accountant driving Virtual CFO engagements, SaaS financial architecture, fundraising advisory, and dynamic capital planning.',
    image: '/assets/original/team/manoj.png'
  },
  {
    id: 'priya',
    name: 'Priya',
    role: 'Partner',
    credentials: 'FCA',
    bio: 'Fellow Chartered Accountant leading statutory audit compliance, regulatory frameworks, risk mitigation, and internal controls for scale-ups and mid-market firms.',
    image: '/assets/original/team/priya.png'
  },
  {
    id: 'ramprakash',
    name: 'Ramprakash',
    role: 'Partner',
    credentials: 'ACA',
    bio: 'Associate Chartered Accountant with extensive experience in enterprise FP&A, multi-entity financial consolidation, and financial operations management.',
    image: '/assets/original/team/ramprakash.png'
  },
  {
    id: 'saichand',
    name: 'Saichand',
    role: 'Partner',
    credentials: 'Partner',
    bio: 'Specialist in treasury operations, debt syndication, working capital optimization, and corporate financial restructuring.',
    image: '/assets/original/team/saichand.jpg'
  },
  {
    id: 'hrishi',
    name: 'Hrishi',
    role: 'Senior Consultant',
    credentials: 'Financial Systems Lead',
    bio: 'Focused on financial business analytics, tech ecosystem integration, and real-time executive dashboard architecture.',
    image: '/assets/original/team/hrishi.jpeg'
  },
  {
    id: 'mrudula',
    name: 'Mrudula',
    role: 'Senior Consultant',
    credentials: 'Operations Lead',
    bio: 'Specialist in day-to-day accounting workflows, GST/TDS regulatory governance, and operational execution for growth clients.',
    image: '/assets/original/team/mrudula.jpeg'
  }
];
