import { useState, useEffect, createContext, useContext } from "react";

export type User = {
  id: string;
  name: string;
  email: string;
  photoURL?: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  initialAuthMode: 'login' | 'register';
  setInitialAuthMode: (mode: 'login' | 'register') => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [initialAuthMode, setInitialAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    // Check if user is logged in (e.g., from localStorage)
    const checkAuth = () => {
      const storedUser = localStorage.getItem('artmatch_user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error("Failed to parse stored user:", error);
          localStorage.removeItem('artmatch_user');
        }
      }
      setIsLoading(false);
    };
    
    checkAuth();
  }, []);

  // Mock authentication functions (to be replaced with Firebase)
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login
      const mockUser = {
        id: "user1",
        name: "Usuário Teste",
        email,
        photoURL: "https://source.unsplash.com/random/100x100/?person"
      };
      
      setUser(mockUser);
      localStorage.setItem('artmatch_user', JSON.stringify(mockUser));
      localStorage.setItem('artmatch_jwt', 'mock-token-' + Date.now());
      setShowAuthModal(false);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockUser = {
        id: "user" + Date.now(),
        name,
        email,
        photoURL: "https://source.unsplash.com/random/100x100/?person"
      };
      
      setUser(mockUser);
      localStorage.setItem('artmatch_user', JSON.stringify(mockUser));
      localStorage.setItem('artmatch_jwt', 'mock-token-' + Date.now());
      setShowAuthModal(false);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful Google login
      const mockUser = {
        id: "google_user1",
        name: "Google Usuário",
        email: "google@example.com",
        photoURL: "https://source.unsplash.com/random/100x100/?person"
      };
      
      setUser(mockUser);
      localStorage.setItem('artmatch_user', JSON.stringify(mockUser));
      localStorage.setItem('artmatch_jwt', 'mock-token-google-' + Date.now());
      setShowAuthModal(false);
    } catch (error) {
      console.error("Google login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setUser(null);
      localStorage.removeItem('artmatch_user');
      localStorage.removeItem('artmatch_jwt');
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    loginWithGoogle,
    logout,
    showAuthModal,
    setShowAuthModal,
    initialAuthMode,
    setInitialAuthMode
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
