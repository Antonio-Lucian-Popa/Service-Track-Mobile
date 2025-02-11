import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';
import AuthStack from './AuthStack';
import Tabs from './Tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiService from '../services/AuthService';

export default function RootNavigator() {
  const { userToken, setUserToken } = useAuth(); // ✅ Acum avem `setUserToken`
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLogin = async () => {
      const savedToken = await AsyncStorage.getItem('accessToken');
      if (savedToken) {
        setUserToken(savedToken); // ✅ Setăm token-ul dacă există deja
      } else {
        const refreshToken = await AsyncStorage.getItem('refreshToken');
        if (refreshToken) {
          const newToken = await apiService.refreshAccessToken();
          if (newToken) {
            setUserToken(newToken); // ✅ Setăm accessToken reîmprospătat
          }
        }
      }
      setLoading(false);
    };

    checkLogin();
  }, [setUserToken]);

  if (loading) return null;

  return <NavigationContainer>{userToken ? <Tabs /> : <AuthStack />}</NavigationContainer>;
}
