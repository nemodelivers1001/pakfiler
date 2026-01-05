import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Mock types to replace Supabase types
export interface User {
  id: string;
  email?: string;
}

export interface Session {
  user: User;
  access_token: string;
}

interface UserProfile {
  id: string;
  full_name: string;
  cnic_number: string;
  date_of_birth: string;
  occupation: string;
  mobile_number: string;
  address: string;
  account_status: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  signup: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  profile: null,
  loading: true,
  login: async () => {},
  signup: async () => {},
  logout: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const STORAGE_KEY_SESSION = 'pakfiler_mock_session';
const STORAGE_KEY_PROFILE = 'pakfiler_mock_profile';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize from local storage
  useEffect(() => {
    const storedSession = localStorage.getItem(STORAGE_KEY_SESSION);
    const storedProfile = localStorage.getItem(STORAGE_KEY_PROFILE);

    if (storedSession) {
      const parsedSession = JSON.parse(storedSession);
      setSession(parsedSession);
      setUser(parsedSession.user);
    }

    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }

    setLoading(false);
  }, []);

  const login = async (email: string) => {
    const mockUser: User = {
      id: 'mock-user-id-123',
      email: email,
    };
    const mockSession: Session = {
      user: mockUser,
      access_token: 'mock-token-123',
    };

    setSession(mockSession);
    setUser(mockUser);
    localStorage.setItem(STORAGE_KEY_SESSION, JSON.stringify(mockSession));

    // Load or create profile
    await loadMockProfile(mockUser.id);
  };

  const signup = async (email: string) => {
    // For mock purposes, signup is same as login
    await login(email);
  };

  const logout = async () => {
    setSession(null);
    setUser(null);
    setProfile(null);
    localStorage.removeItem(STORAGE_KEY_SESSION);
    localStorage.removeItem(STORAGE_KEY_PROFILE);
  };

  const loadMockProfile = async (userId: string) => {
    const storedProfile = localStorage.getItem(STORAGE_KEY_PROFILE);
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      // Create new default profile
      const newProfile: UserProfile = {
        id: userId,
        full_name: 'Demo User',
        cnic_number: '12345-6789012-3',
        date_of_birth: '1990-01-01',
        occupation: 'Business',
        mobile_number: '0300-1234567',
        address: '123 Mock Street, Karachi',
        account_status: 'active',
        created_at: new Date().toISOString(),
      };
      setProfile(newProfile);
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(newProfile));
    }
  };

  const refreshProfile = async () => {
    if (user) {
      await loadMockProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, profile, loading, login, signup, logout, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
