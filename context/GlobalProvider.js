import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, logoutUser } from '../lib/appwrite';
import { useNavigation } from '@react-navigation/native';

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const initUser = async () => {
      try {
        const result = await getCurrentUser();
        if (result) {
          setUser(result);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    initUser();
  }, []);

  const logout = async () => {
    await logoutUser();
    setUser(null);
    setIsLoggedIn(false);
    navigation.navigate('/');
  };

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading, logout }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
