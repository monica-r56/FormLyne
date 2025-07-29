import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  connectToLinear: () => Promise<void>;
  isLinearConnected: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLinearConnected, setIsLinearConnected] = useState(false);

  useEffect(() => {
    // Mock: Check if user is already logged in
    const mockCheckAuth = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check localStorage for mock user
      const savedUser = localStorage.getItem('mockUser');
      const savedLinear = localStorage.getItem('mockLinearConnected');
      
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      
      if (savedLinear) {
        setIsLinearConnected(JSON.parse(savedLinear));
      }
      
      setIsLoading(false);
    };

    mockCheckAuth();
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    setIsLoading(true);
    
    // Mock Google Sign-In
    // TODO: Replace with actual Firebase Google Auth
    console.log('🔧 [MOCK] Google Sign-In triggered - Replace with Firebase Auth');
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockUser: User = {
      id: 'mock-user-123',
      email: 'user@example.com',
      name: 'John Doe',
      photoURL: 'https://via.placeholder.com/40'
    };
    
    setUser(mockUser);
    localStorage.setItem('mockUser', JSON.stringify(mockUser));
    setIsLoading(false);
  };

  const signOut = async (): Promise<void> => {
    // TODO: Replace with actual Firebase signOut
    console.log('🔧 [MOCK] Sign out triggered - Replace with Firebase Auth');
    
    setUser(null);
    setIsLinearConnected(false);
    localStorage.removeItem('mockUser');
    localStorage.removeItem('mockLinearConnected');
  };

  const connectToLinear = async (): Promise<void> => {
    // Mock Linear OAuth connection
    // TODO: Replace with actual Linear OAuth flow
    console.log('🔧 [MOCK] Linear OAuth triggered - Replace with Linear OAuth 2.0');
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLinearConnected(true);
    localStorage.setItem('mockLinearConnected', 'true');
    setIsLoading(false);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    signInWithGoogle,
    signOut,
    connectToLinear,
    isLinearConnected,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};