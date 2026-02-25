import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userName, setUserName] = useState('Гість'); 

  
  useEffect(() => {
    const loadUserName = async () => {
      try {
        const savedName = await AsyncStorage.getItem('user_name');
        if (savedName) {
          setUserName(savedName);
        }
      } catch (e) {
        console.error('Помилка завантаження імені:', e);
      }
    };
    loadUserName();
  }, []);

  return (
    <UserContext.Provider value={{ userName, setUserName }}>
      {children}
    </UserContext.Provider>
  );
};