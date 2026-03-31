import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { api } from '../services/api';

type UserProps = {
  id: string;
  nome: string;
  email: string;
  role: 'ADMIN' | 'CUSTOMER';
};

type AuthContextData = {
  user: UserProps | null;
  isAuthenticated: boolean;
  signIn: (token: string, userData: UserProps) => void;
  signOut: () => void;
  loading: boolean;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);

  // Verifica se já tem usuário logado quando a aplicação carregar
  useEffect(() => {
    async function loadStorageData() {
      const token = localStorage.getItem('@TechStore:token');

      if (token) {
        try {
          // Bate na rota para confirmar se o token ainda é válido
          const response = await api.get('/me');
          setUser(response.data);
        } catch (err) {
          console.error("Erro ao validar token", err);
          signOut();
        }
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);

  function signIn(token: string, userData: UserProps) {
    localStorage.setItem('@TechStore:token', token);
    setUser(userData);
  }

  function signOut() {
    localStorage.removeItem('@TechStore:token');
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
