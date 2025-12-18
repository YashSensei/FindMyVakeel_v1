// AI Service - Calls backend API instead of exposing API keys in frontend
import { LegalCategory, UrgencyLevel } from '@/constants';

// Use relative URL in production (same domain), full URL in development
const API_URL = import.meta.env.PROD 
  ? '/api'  // Production: frontend and backend on same domain
  : (import.meta.env.VITE_API_URL || 'http://localhost:3001/api'); // Development

export interface AIAnalysis {
  processedProblem: string;
  category: LegalCategory;
  urgency: UrgencyLevel;
  keyFacts: string[];
  suggestedActions: string[];
  estimatedComplexity: 'simple' | 'moderate' | 'complex';
}

// Process messy user input into structured legal explanation via backend
export async function processLegalProblem(userInput: string): Promise<AIAnalysis> {
  try {
    const token = localStorage.getItem('fmv_token');

    const response = await fetch(`${API_URL}/ai/process`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ problem: userInput }),
    });

    if (!response.ok) {
      throw new Error('Failed to process legal problem');
    }

    const data = await response.json();
    return data.analysis;
  } catch (error) {
    console.error('AI Processing Error:', error);
    // Return a fallback for demo purposes when backend is unavailable
    return {
      processedProblem: userInput,
      category: 'other' as LegalCategory,
      urgency: 'medium' as UrgencyLevel,
      keyFacts: ['Unable to process with AI - using original input'],
      suggestedActions: ['Consult with a legal expert'],
      estimatedComplexity: 'moderate' as const
    };
  }
}

// Generate chat response for legal queries via backend
export async function generateChatResponse(
  messages: { role: 'user' | 'assistant'; content: string }[],
  caseContext: { problem?: string; category?: string; urgency?: string }
): Promise<string> {
  try {
    const token = localStorage.getItem('fmv_token');

    const response = await fetch(`${API_URL}/ai/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ messages, caseContext }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate chat response');
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error('Chat Response Error:', error);
    return 'I apologize, there was an error processing your request. Please try again.';
  }
}

export default { processLegalProblem, generateChatResponse };
