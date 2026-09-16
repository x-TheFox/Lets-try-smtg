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
    id: 'priya',
    name: 'Priya Raghavan',
    role: 'Co-founder and Managing Partner',
    credentials: 'FCA, Dip IFRS (ACCA London)',
    bio: 'Fellow Chartered Accountant with a Diploma in IFRS from ACCA, London. Co-founded Agrya after a 15-year tenure at Deloitte, bringing deep expertise in large corporate strategy.',
    image: '/assets/original/team/priya.png'
  },
  {
    id: 'jayakumar',
    name: 'Jayakumar M',
    role: 'Co-founder and Managing Partner',
    credentials: 'FCA, ACS',
    bio: 'Chartered Accountant & Company Secretary. With extensive experience at Deloitte serving MNCs in manufacturing and finance, JK bridges the gap between complex regulation and business growth.',
    image: '/assets/original/team/jayakumar.png'
  },
  {
    id: 'ramprakash',
    name: 'Ram Prakash R',
    role: 'Partner, Head of Automations',
    credentials: 'Ex-Deloitte & CCD • Automation Lead',
    bio: 'Leading digital transformation and finance automation. 10+ years experience including Deloitte and CCD.',
    image: '/assets/original/team/ramprakash.png'
  },
  {
    id: 'hrishi',
    name: 'Hrishikesh Redij',
    role: 'Partner',
    credentials: 'Ex-CFO Hansa Cequity • CRISIL Alum',
    bio: 'Specialist in FP&A and controllership. Former CFO at Hansa Cequity and Associate Director at CRISIL.',
    image: '/assets/original/team/hrishi.jpeg'
  },
  {
    id: 'avinash',
    name: 'Sai Avinash K',
    role: 'Partner, Hyderabad Practice',
    credentials: 'PWC India Alum • Assurance & Tax',
    bio: 'Heads the Hyderabad practice. Expert in Assurance and Taxation with prior experience at PWC India.',
    image: '/assets/original/team/avinash.png'
  },
  {
    id: 'saichand',
    name: 'Sai Chand Perla',
    role: 'Partner',
    credentials: 'Ex-Deloitte India • SEZ & Audit',
    bio: 'Expert in financial controllership, SEZ compliances, and auditing. Previously with Deloitte India.',
    image: '/assets/original/team/saichand.jpg'
  },
  {
    id: 'manoj',
    name: 'Manojkumar C',
    role: 'Director - CFO Advisory',
    credentials: 'Financial Reporting & FP&A Lead',
    bio: 'Specialises in Financial Reporting, FP&A, and Business Planning. Instrumental in designing processes for regulatory compliance.',
    image: '/assets/original/team/manoj.png'
  },
  {
    id: 'mrudula',
    name: 'Mrudula',
    role: 'Head of Tax and Compliance',
    credentials: 'TN Govt & IIT Incubation Advisor',
    bio: 'Leading tax and compliance engagements. Spearheads projects with the Tamil Nadu government and IIT Startup Incubation Cell.',
    image: '/assets/original/team/mrudula.jpeg'
  }
];

