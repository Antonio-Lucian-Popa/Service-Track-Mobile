import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../services/AuthService';
import { Alert } from 'react-native';

type AuthContextType = {
  userToken: string | null;
  setUserToken: (token: string | null) => void; // ✅ Adăugat setUserToken
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null); // ✅ Adăugat în state

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem('accessToken');
      if (savedToken) {
        setUserToken(savedToken);
      }
    };
    loadToken();
  }, []);

  const login = async (username: string, password: string) => {
    const response = await apiService.login(username, password);
    if (response) {
      setUserToken(response.access); // ✅ Setăm accessToken în context
      await AsyncStorage.setItem('accessToken', response.access);
    } else {
      Alert.alert('Autentificare eșuată');
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    setUserToken(null); // ✅ Resetăm token-ul
  };

  return (
    <AuthContext.Provider value={{ userToken, setUserToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth trebuie folosit în interiorul AuthProvider');
  }
  return context;
};
