import { LegalCategory, UrgencyLevel } from '@/constants';

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'client' | 'lawyer' | 'admin';
  avatar?: string;
  company?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Auth State for Context
export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Auth Types
export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  phone?: string;
}

// Case Types
export interface Case {
  id: string;
  userId: string;
  problem: string;
  category: string;
  urgency: string;
  status: 'pending' | 'active' | 'resolved' | 'closed';
  lawyerId?: string;
  documents: Document[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CaseDocument {
  id: string;
  name: string;
  url: string;
  type: string;
  size: string;
  uploadedAt: Date;
  status: 'pending' | 'reviewed' | 'approved';
}

export interface AIAnalysis {
  processedProblem: string;
  category: LegalCategory;
  urgency: UrgencyLevel;
  keyFacts: string[];
  suggestedActions: string[];
  estimatedComplexity: 'simple' | 'moderate' | 'complex';
}

export interface CreateCaseRequest {
  problem: string;
  documents?: CaseDocument[];
}

export interface CreateCaseResponse {
  case: Case;
  aiAnalysis: AIAnalysis;
}

// Chat Types
export interface Message {
  id: string;
  caseId: string;
  senderId: string;
  senderType: 'user' | 'lawyer' | 'ai';
  content: string;
  attachments?: MessageAttachment[];
  read: boolean;
  createdAt: Date;
}

export interface MessageAttachment {
  name: string;
  url: string;
  type: string;
}

export interface SendMessageRequest {
  content: string;
  attachments?: MessageAttachment[];
}

export interface ChatResponse {
  messages: Message[];
}

export interface AIAssistRequest {
  question: string;
}

export interface AIAssistResponse {
  response: string;
}

// Upload Types
export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

export interface MultiUploadResponse {
  files: UploadResponse[];
}

// API Response Types
export interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}

export interface SuccessResponse {
  message: string;
}

// Lawyer Types
export interface LawyerLocation {
  city: string;
  state: string;
}

export interface Lawyer {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  specializations: string[];
  experience: number;
  rating: number;
  reviewCount?: number;
  consultationFee: number;
  avatar?: string;
  bio?: string;
  languages?: string[];
  location?: LawyerLocation;
  responseTime?: string;
  casesHandled?: number;
  successRate?: number;
  matchScore?: number;
  verified?: boolean;
}

// Dashboard Types
export type DocumentStatus = 'pending' | 'reviewed' | 'approved';
export type PaymentStatus = 'pending' | 'paid' | 'refunded';

export interface DashboardDocument {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadedAt: Date;
  status: DocumentStatus;
}

export interface Payment {
  id: string;
  description: string;
  amount: number;
  status: PaymentStatus;
  date: Date;
}

// Case Data (stored in localStorage)
export interface CaseFile {
  name: string;
  type: string;
  size: number;
}

export interface StoredCaseData {
  originalProblem: string;
  aiAnalysis: AIAnalysis | null;
  files: CaseFile[];
}

// Component Props Types
export interface ProfileDropdownProps {
  onNavigate?: () => void;
}

export interface LawyerCardProps {
  lawyer: Lawyer;
  isSelected: boolean;
  isExpanded: boolean;
  onSelect: (id: string) => void;
  onToggleExpand: (id: string) => void;
}

export interface MessageItemProps {
  message: Message;
  lawyerName?: string;
  lawyerAvatar?: string;
}

export interface DocumentItemProps {
  document: DashboardDocument;
  onDelete: (id: string) => void;
  onDownload: (doc: DashboardDocument) => void;
}
