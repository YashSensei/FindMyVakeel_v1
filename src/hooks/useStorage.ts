import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { STORAGE_KEYS } from '@/constants';

/**
 * Storage prefix for Find My Vakeel app
 */
const STORAGE_PREFIX = 'fmv';

/**
 * Generate a user-specific storage key
 */
export const getUserStorageKey = (userId: string | undefined, key: string): string => {
  const userIdPart = userId || 'guest';
  return `${STORAGE_PREFIX}_${userIdPart}_${key}`;
};

/**
 * Get a generic (non-user-specific) storage key
 */
export const getGenericStorageKey = (key: string): string => {
  return `${STORAGE_PREFIX}_${key}`;
};

/**
 * Custom hook for user-specific localStorage operations
 */
export function useUserStorage<T>(key: string, initialValue: T) {
  const { user } = useAuth();
  const userId = user?.id || user?.email;

  // Generate the user-specific key
  const storageKey = getUserStorageKey(userId, key);
  const genericKey = getGenericStorageKey(key);

  // Get initial value from storage
  const getStoredValue = useCallback((): T => {
    try {
      // Try user-specific key first, then generic
      const item = localStorage.getItem(storageKey) || localStorage.getItem(genericKey);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${storageKey}":`, error);
      return initialValue;
    }
  }, [storageKey, genericKey, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(getStoredValue);

  // Update stored value when user changes
  useEffect(() => {
    setStoredValue(getStoredValue());
  }, [userId, getStoredValue]);

  // Set value in localStorage
  const setValue = useCallback((value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(storageKey, JSON.stringify(valueToStore));
      // Also save to generic key for backwards compatibility
      localStorage.setItem(genericKey, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${storageKey}":`, error);
    }
  }, [storageKey, genericKey, storedValue]);

  // Remove value from localStorage
  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(storageKey);
      localStorage.removeItem(genericKey);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error removing localStorage key "${storageKey}":`, error);
    }
  }, [storageKey, genericKey, initialValue]);

  return [storedValue, setValue, removeValue] as const;
}

/**
 * Storage service for direct localStorage operations without React state
 */
export class StorageService {
  private userId: string | undefined;

  constructor(userId?: string) {
    this.userId = userId;
  }

  /**
   * Set user ID for user-specific storage
   */
  setUserId(userId: string | undefined): void {
    this.userId = userId;
  }

  /**
   * Get the user-specific storage key
   */
  private getKey(key: string): string {
    return getUserStorageKey(this.userId, key);
  }

  /**
   * Get a value from localStorage
   */
  get<T>(key: string, defaultValue: T): T {
    try {
      const storageKey = this.getKey(key);
      const genericKey = getGenericStorageKey(key);
      const item = localStorage.getItem(storageKey) || localStorage.getItem(genericKey);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }

  /**
   * Set a value in localStorage
   */
  set<T>(key: string, value: T): void {
    try {
      const storageKey = this.getKey(key);
      const genericKey = getGenericStorageKey(key);
      const serialized = JSON.stringify(value);
      localStorage.setItem(storageKey, serialized);
      localStorage.setItem(genericKey, serialized);
    } catch (error) {
      console.error(`Error setting storage key "${key}":`, error);
    }
  }

  /**
   * Remove a value from localStorage
   */
  remove(key: string): void {
    try {
      const storageKey = this.getKey(key);
      const genericKey = getGenericStorageKey(key);
      localStorage.removeItem(storageKey);
      localStorage.removeItem(genericKey);
    } catch (error) {
      console.error(`Error removing storage key "${key}":`, error);
    }
  }

  /**
   * Clear all FMV-related storage for the current user
   */
  clearUserData(): void {
    try {
      const keysToRemove: string[] = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key?.startsWith(`${STORAGE_PREFIX}_${this.userId || 'guest'}_`)) {
          keysToRemove.push(key);
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key));
    } catch (error) {
      console.error('Error clearing user data:', error);
    }
  }
}

/**
 * Hook that returns a StorageService instance tied to the current user
 */
export function useStorageService(): StorageService {
  const { user } = useAuth();
  const userId = user?.id || user?.email;

  // Create a service instance with the current user ID
  const service = new StorageService(userId);

  return service;
}

/**
 * Pre-defined storage hooks for common data types
 */
export function useCaseData() {
  return useUserStorage<{
    originalProblem: string;
    aiAnalysis: unknown;
    files: Array<{ name: string; type: string; size: number }>;
  } | null>(STORAGE_KEYS.caseData, null);
}

export function useSelectedLawyer() {
  return useUserStorage<{
    id: string;
    name: string;
    avatar: string;
    specializations: string[];
    experience: number;
    rating: number;
    location: { city: string; state: string };
    consultationFee: number;
    responseTime: string;
  } | null>(STORAGE_KEYS.selectedLawyer, null);
}

export function useMessages() {
  return useUserStorage<Array<{
    id: string;
    sender: 'user' | 'lawyer' | 'ai';
    content: string;
    timestamp: string;
    attachments?: Array<{ name: string; url: string; type: string }>;
  }>>(STORAGE_KEYS.messages, []);
}

export function useDocuments() {
  return useUserStorage<Array<{
    id: string;
    name: string;
    type: string;
    size: string;
    uploadedAt: string;
    status: 'pending' | 'reviewed' | 'approved';
  }>>(STORAGE_KEYS.documents, []);
}
