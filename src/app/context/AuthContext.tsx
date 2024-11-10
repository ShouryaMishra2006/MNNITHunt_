"use client"
import { createContext, useState, ReactNode, useEffect } from 'react';

// Define User type
export type User = {
  _id: string;
  email: string;
  name: string;
} | null;

type AuthContextType = {
  user: User;
  setUser: (user: User) => void;
};

// Initialize context with default values
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:5217/auth/user", {
          credentials: 'include'
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          setUser(null); // User is not authenticated
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
