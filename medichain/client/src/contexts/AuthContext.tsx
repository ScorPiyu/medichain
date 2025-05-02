
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

type User = {
  name: string;
  email: string;
  role: string;
  profileImage?: string;
} | null;

type AuthContextType = {
  user: User;
  isLoading: boolean;
  login: (email: string, password: string, role : string, name:string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('healthUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role:string, name:string) => {
    try {
      setIsLoading(true);
      // This would be an API call in production
      // Mocking authentication for now
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, simulate different user roles
      let mockUser = {
        email,
        role,
        name,
        profileImage: ''
      };
      
      
      // if (email.includes('doctor')) {
      //   mockUser = {
      //     id: 'doc123',
      //     name: 'Dr. Jane Smith',
      //     email,
      //     role:,
      //     profileImage: '/placeholder.svg'
      //   };
      // } else if (email.includes('admin')) {
      //   mockUser = {
      //     id: 'adm123',
      //     name: 'Admin User',
      //     email,
      //     role: 'admin' as const,
      //     profileImage: '/placeholder.svg'
      //   };
      // } else {
      //   mockUser = {
      //     id: 'pat123',
      //     name: 'John Doe',
      //     email,
      //     role: 'patient' as const,
      //     profileImage: '/placeholder.svg'
      //   };
      // }
      
      setUser(mockUser);
      localStorage.setItem('healthUser', JSON.stringify(mockUser));
      
      toast({
        title: "Login successful",
        description: `Welcome back, ${mockUser.name}!`,
      });
      
      // Redirect based on role
      navigate(`/dashboard/${mockUser.role}`);
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Invalid email or password",
        variant: "destructive",
      });
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: any) => {
    try {
      setIsLoading(true);
      // This would be an API call in production
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser = {
        id: 'new123',
        name: userData.name,
        email: userData.email,
        role: userData.role
      };
      
      setUser(newUser);
      localStorage.setItem('healthUser', JSON.stringify(newUser));
      
      toast({
        title: "Registration successful",
        description: "Your account has been created!",
      });
      
      navigate(`/dashboard/${newUser.role}`);
    } catch (error) {
      toast({
        title: "Registration failed",
        description: "There was an error creating your account",
        variant: "destructive",
      });
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log("logged out")
    localStorage.setItem("loggedIn", "");
    localStorage.setItem("email", "");
    setUser(null);
    localStorage.removeItem('healthUser');
    
    navigate('/login');
    window.location.reload();

    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
