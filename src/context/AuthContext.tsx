import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '@/services/api';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'client' | 'lawyer' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
  logout: () => void;
  updateUser: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const storedToken = localStorage.getItem('fmv_token');
    if (storedToken) {
      setToken(storedToken);
      // Verify token and get user (avatar comes from MongoDB)
      authAPI.getMe()
        .then(({ user: fetchedUser }) => {
          setUser(fetchedUser);
        })
        .catch(() => {
          // Token invalid, clear it
          localStorage.removeItem('fmv_token');
          setToken(null);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    const { user: loggedInUser, token: authToken } = await authAPI.login({ email, password });
    localStorage.setItem('fmv_token', authToken);
    setToken(authToken);
    setUser(loggedInUser);
  };

  const register = async (name: string, email: string, password: string, phone?: string) => {
    const { user: newUser, token: authToken } = await authAPI.register({ name, email, password, phone });
    localStorage.setItem('fmv_token', authToken);
    setToken(authToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('fmv_token');
    setToken(null);
    setUser(null);
  };

  const updateUser = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
