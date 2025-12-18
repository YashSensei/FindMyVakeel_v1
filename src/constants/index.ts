// Find My Vakeel - Application Constants

// ============================================
// Contact Information
// ============================================
export const CONTACT_INFO = {
  email: 'contact@axsyntech.com',
  phone: '+1 (555) 123-4567',
  address: {
    street: '123 Tech Street',
    city: 'San Francisco',
    state: 'CA',
    zip: '94105',
  },
} as const;

// ============================================
// External URLs
// ============================================
export const EXTERNAL_URLS = {
  tallyForm: 'https://tally.so/r/LZD6Zy',
  diceBearAvatar: 'https://api.dicebear.com/7.x/avataaars/svg',
} as const;

// ============================================
// Legal Categories
// ============================================
export const LEGAL_CATEGORIES = {
  corporate: { label: 'Corporate', color: 'bg-blue-100 text-blue-800' },
  'intellectual-property': { label: 'Intellectual Property', color: 'bg-purple-100 text-purple-800' },
  employment: { label: 'Employment', color: 'bg-orange-100 text-orange-800' },
  contracts: { label: 'Contracts', color: 'bg-green-100 text-green-800' },
  compliance: { label: 'Compliance', color: 'bg-yellow-100 text-yellow-800' },
  fundraising: { label: 'Fundraising', color: 'bg-pink-100 text-pink-800' },
  disputes: { label: 'Disputes', color: 'bg-red-100 text-red-800' },
  'real-estate': { label: 'Real Estate', color: 'bg-teal-100 text-teal-800' },
  tax: { label: 'Tax', color: 'bg-indigo-100 text-indigo-800' },
  other: { label: 'Other', color: 'bg-gray-100 text-gray-800' },
} as const;

export type LegalCategory = keyof typeof LEGAL_CATEGORIES;

// ============================================
// Urgency Levels
// ============================================
export const URGENCY_LEVELS = {
  low: { label: 'Low', color: 'text-green-600' },
  medium: { label: 'Medium', color: 'text-yellow-600' },
  high: { label: 'High', color: 'text-orange-600' },
  critical: { label: 'Critical', color: 'text-red-600' },
} as const;

export type UrgencyLevel = keyof typeof URGENCY_LEVELS;

// ============================================
// Example Prompts for Problem Submission
// ============================================
export const EXAMPLE_PROMPTS = [
  "My co-founder wants to leave and take their equity...",
  "I need to protect my app's source code and brand name...",
  "An investor wants to put in money but the terms seem off...",
  "My employee is threatening to sue for wrongful termination...",
] as const;

// ============================================
// File Upload Configuration
// ============================================
export const FILE_UPLOAD_CONFIG = {
  maxSizeMB: 10,
  maxSizeBytes: 10 * 1024 * 1024,
  validTypes: [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
  ],
  acceptString: '.pdf,.jpg,.jpeg,.png,.doc,.docx,.txt',
} as const;

// ============================================
// Simulated Lawyer Responses (Demo)
// ============================================
export const SIMULATED_RESPONSES = [
  "That's a great question. Based on Indian contract law, you have several options here. Let me explain the most relevant ones...",
  "I understand your concern. This is actually a common situation in startup partnerships. The key is to document everything properly.",
  "Let me review this in detail. Could you share any written communications or agreements you have regarding this matter?",
  "Based on what you've described, I recommend we take a strategic approach. First, let's...",
  "This falls under the Indian Companies Act. I'll prepare a detailed response with specific sections that apply to your case.",
] as const;

// ============================================
// Mock Lawyers Data (Demo)
// ============================================
export interface MockLawyer {
  id: string;
  name: string;
  avatar: string;
  specializations: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  location: { city: string; state: string };
  languages: string[];
  consultationFee: number;
  responseTime: string;
  casesHandled: number;
  successRate: number;
  bio: string;
  matchScore: number;
  verified: boolean;
}

export const MOCK_LAWYERS: MockLawyer[] = [
  {
    id: '1',
    name: 'Adv. Priya Sharma',
    avatar: `${EXTERNAL_URLS.diceBearAvatar}?seed=priya`,
    specializations: ['corporate', 'contracts', 'compliance'],
    experience: 12,
    rating: 4.9,
    reviewCount: 156,
    location: { city: 'Mumbai', state: 'Maharashtra' },
    languages: ['English', 'Hindi', 'Marathi'],
    consultationFee: 2500,
    responseTime: '1-2 hours',
    casesHandled: 450,
    successRate: 98,
    bio: 'Former legal counsel at Tata Group with extensive experience in startup law, M&A, and corporate restructuring.',
    matchScore: 95,
    verified: true,
  },
  {
    id: '2',
    name: 'Adv. Rajesh Kumar',
    avatar: `${EXTERNAL_URLS.diceBearAvatar}?seed=rajesh`,
    specializations: ['corporate', 'fundraising', 'intellectual-property'],
    experience: 15,
    rating: 4.8,
    reviewCount: 203,
    location: { city: 'Delhi', state: 'Delhi' },
    languages: ['English', 'Hindi'],
    consultationFee: 3000,
    responseTime: '2-4 hours',
    casesHandled: 620,
    successRate: 97,
    bio: 'Partner at leading law firm specializing in venture capital, private equity deals, and startup advisory.',
    matchScore: 92,
    verified: true,
  },
  {
    id: '3',
    name: 'Adv. Ananya Iyer',
    avatar: `${EXTERNAL_URLS.diceBearAvatar}?seed=ananya`,
    specializations: ['contracts', 'employment', 'disputes'],
    experience: 8,
    rating: 4.7,
    reviewCount: 89,
    location: { city: 'Bangalore', state: 'Karnataka' },
    languages: ['English', 'Hindi', 'Kannada', 'Tamil'],
    consultationFee: 2000,
    responseTime: '1-2 hours',
    casesHandled: 280,
    successRate: 96,
    bio: 'Tech-focused lawyer with deep expertise in SaaS agreements, employment law, and dispute resolution.',
    matchScore: 88,
    verified: true,
  },
  {
    id: '4',
    name: 'Adv. Mohammed Ali',
    avatar: `${EXTERNAL_URLS.diceBearAvatar}?seed=mohammed`,
    specializations: ['corporate', 'real-estate', 'compliance'],
    experience: 20,
    rating: 4.9,
    reviewCount: 312,
    location: { city: 'Hyderabad', state: 'Telangana' },
    languages: ['English', 'Hindi', 'Telugu', 'Urdu'],
    consultationFee: 3500,
    responseTime: '2-4 hours',
    casesHandled: 890,
    successRate: 99,
    bio: 'Senior advocate with two decades of experience in corporate law, real estate transactions, and regulatory compliance.',
    matchScore: 85,
    verified: true,
  },
  {
    id: '5',
    name: 'Adv. Sneha Reddy',
    avatar: `${EXTERNAL_URLS.diceBearAvatar}?seed=sneha`,
    specializations: ['intellectual-property', 'contracts', 'corporate'],
    experience: 6,
    rating: 4.6,
    reviewCount: 67,
    location: { city: 'Pune', state: 'Maharashtra' },
    languages: ['English', 'Hindi', 'Marathi'],
    consultationFee: 1800,
    responseTime: '< 1 hour',
    casesHandled: 180,
    successRate: 94,
    bio: 'Young and dynamic IP lawyer specializing in trademark, copyright, and patent law for tech startups.',
    matchScore: 82,
    verified: true,
  },
];

// ============================================
// Default Mock Documents (Demo)
// ============================================
export interface MockDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  status: 'pending' | 'reviewed' | 'approved';
}

export const DEFAULT_MOCK_DOCUMENTS: MockDocument[] = [
  {
    id: '1',
    name: 'Company Agreement Draft.pdf',
    type: 'application/pdf',
    size: '2.4 MB',
    status: 'reviewed',
  },
  {
    id: '2',
    name: 'Email Correspondence.pdf',
    type: 'application/pdf',
    size: '1.1 MB',
    status: 'pending',
  },
];

// ============================================
// Storage Keys
// ============================================
export const STORAGE_KEYS = {
  authToken: 'fmv_auth_token',
  user: 'fmv_user',
  caseData: 'case_data',
  selectedLawyer: 'selected_lawyer',
  messages: 'messages',
  documents: 'documents',
} as const;

// ============================================
// App Metadata
// ============================================
export const APP_CONFIG = {
  name: 'Find My Vakeel',
  companyName: 'Axsyn Tech',
  responseTime: '2-4 hrs',
  lawyerCount: '200+',
} as const;
