import type {
  User,
  AuthResponse,
  LoginCredentials,
  RegisterData,
  Case,
  CaseDocument,
  CreateCaseRequest,
  CreateCaseResponse,
  Message,
  MessageAttachment,
  SendMessageRequest,
  ChatResponse,
  AIAssistResponse,
  UploadResponse,
  MultiUploadResponse,
  SuccessResponse,
} from '@/types';

// Use relative URL in production (same domain), full URL in development
const API_BASE_URL = import.meta.env.PROD 
  ? '/api'  // Production: frontend and backend on same domain
  : (import.meta.env.VITE_API_URL || 'http://localhost:3001/api'); // Development

// Helper to get auth token
const getToken = () => localStorage.getItem('fmv_token');

// Helper for API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Something went wrong');
  }

  return response.json();
}

// Auth API
export const authAPI = {
  register: (data: RegisterData) =>
    apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  login: (data: LoginCredentials) =>
    apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getMe: () => apiRequest<{ user: User }>('/auth/me'),

  updateProfile: (data: Partial<User>) =>
    apiRequest<{ user: User }>('/auth/me', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),
};

// Cases API
export const casesAPI = {
  create: (data: CreateCaseRequest) =>
    apiRequest<CreateCaseResponse>('/cases', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getAll: () => apiRequest<{ cases: Case[] }>('/cases'),

  getOne: (id: string) => apiRequest<{ case: Case }>(`/cases/${id}`),

  selectLawyer: (caseId: string, lawyerId: string) =>
    apiRequest<{ case: Case }>(`/cases/${caseId}/select-lawyer`, {
      method: 'POST',
      body: JSON.stringify({ lawyerId }),
    }),

  addDocument: (caseId: string, document: Omit<CaseDocument, 'id' | 'uploadedAt' | 'status'>) =>
    apiRequest<{ case: Case }>(`/cases/${caseId}/documents`, {
      method: 'POST',
      body: JSON.stringify(document),
    }),

  updateStatus: (caseId: string, status: Case['status']) =>
    apiRequest<{ case: Case }>(`/cases/${caseId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// Chat API
export const chatAPI = {
  getMessages: (caseId: string) =>
    apiRequest<ChatResponse>(`/chat/${caseId}`),

  sendMessage: (caseId: string, content: string, attachments?: MessageAttachment[]) =>
    apiRequest<{ message: Message }>(`/chat/${caseId}`, {
      method: 'POST',
      body: JSON.stringify({ content, attachments }),
    }),

  getAIAssistance: (caseId: string, question: string) =>
    apiRequest<AIAssistResponse>(`/chat/${caseId}/ai-assist`, {
      method: 'POST',
      body: JSON.stringify({ question }),
    }),

  markAsRead: (caseId: string) =>
    apiRequest<SuccessResponse>(`/chat/${caseId}/read`, {
      method: 'PATCH',
    }),
};

// Upload API
export const uploadAPI = {
  uploadFile: async (file: File): Promise<UploadResponse> => {
    const token = getToken();
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_BASE_URL}/upload/single`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(error.error);
    }

    return response.json();
  },

  uploadMultiple: async (files: File[]): Promise<MultiUploadResponse> => {
    const token = getToken();
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const response = await fetch(`${API_BASE_URL}/upload/multiple`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(error.error);
    }

    return response.json();
  },

  deleteFile: (filename: string) =>
    apiRequest<SuccessResponse>(`/upload/${filename}`, {
      method: 'DELETE',
    }),
};

export default { authAPI, casesAPI, chatAPI, uploadAPI };
