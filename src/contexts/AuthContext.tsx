import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

type UserRole = 'client' | 'team_member' | 'manager' | 'admin';

interface Store {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  storeId?: string; // For clients, this is their store ID
  stores?: Store[]; // For team members and managers, these are the stores they can access
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  canAccessStore: (storeId: string) => boolean;
  getAccessibleStores: () => Store[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

// Sample store data
const stores: Store[] = [
  { id: 'store1', name: 'Acme Şirketi' },
  { id: 'store2', name: 'TechStart A.Ş.' },
  { id: 'store3', name: 'Global Perakende' },
  { id: 'store4', name: 'SağlıkPlus' },
  { id: 'store5', name: 'Urban Giyim' },
  { id: 'store6', name: 'EkoDostu Ürünler' },
  { id: 'store7', name: 'A Firması' },
  { id: 'store8', name: 'B Firması' },
];

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // In a real app, this would make an API call
  const login = async (email: string, password: string) => {
    // Mock login - in a real app, this would validate credentials with an API
    const mockUsers: Record<string, User> = {
      'client@example.com': {
        id: '1',
        name: 'Müşteri Kullanıcı',
        email: 'client@example.com',
        role: 'client',
        storeId: 'store1', // Client is associated with Acme Corporation
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      'afirmasi@example.com': {
        id: '4',
        name: 'A Firması Yöneticisi',
        email: 'afirmasi@example.com',
        role: 'client',
        storeId: 'store7', // A Firması
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      'bfirmasi@example.com': {
        id: '5',
        name: 'B Firması Yöneticisi',
        email: 'bfirmasi@example.com',
        role: 'client',
        storeId: 'store8', // B Firması
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      // Yönetici
      'emirhan@agency.com': {
        id: '6',
        name: 'Emirhan Pirgon',
        email: 'emirhan@agency.com',
        role: 'manager',
        stores: stores, // Tüm mağazalara erişim
        avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      // Ekip Üyeleri
      'zeynep@agency.com': {
        id: '7',
        name: 'Zeynep Yıldız',
        email: 'zeynep@agency.com',
        role: 'team_member',
        stores: stores, // Tüm mağazalara erişim
        avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      'ahmet@agency.com': {
        id: '8',
        name: 'Ahmet Kara',
        email: 'ahmet@agency.com',
        role: 'team_member',
        stores: stores, // Tüm mağazalara erişim
        avatar: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      'elif@agency.com': {
        id: '9',
        name: 'Elif Şahin',
        email: 'elif@agency.com',
        role: 'team_member',
        stores: stores, // Tüm mağazalara erişim
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
    };

    if (mockUsers[email] && password === 'password') {
      const loggedInUser = mockUsers[email];
      setUser(loggedInUser);
      // Save user to localStorage
      localStorage.setItem('user', JSON.stringify(loggedInUser));
    } else {
      throw new Error('Geçersiz kimlik bilgileri');
    }
  };

  const logout = () => {
    setUser(null);
    // Remove user from localStorage
    localStorage.removeItem('user');
  };

  // Check if the user can access a specific store
  const canAccessStore = (storeId: string): boolean => {
    if (!user) return false;

    if (user.role === 'client') {
      // Clients can only access their own store
      return user.storeId === storeId;
    } else if (user.role === 'team_member' || user.role === 'manager' || user.role === 'admin') {
      // Team members, managers, and admins can access all stores
      return true;
    }

    return false;
  };

  // Get all stores the user can access
  const getAccessibleStores = (): Store[] => {
    if (!user) return [];

    if (user.role === 'client' && user.storeId) {
      // Return only the client's store
      const clientStore = stores.find(store => store.id === user.storeId);
      return clientStore ? [clientStore] : [];
    } else if (user.role === 'team_member' || user.role === 'manager' || user.role === 'admin') {
      // Return only A Firması and B Firması for team members, managers, and admins
      return stores.filter(store => store.id === 'store7' || store.id === 'store8');
    }

    return [];
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated: !!user,
    canAccessStore,
    getAccessibleStores,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};