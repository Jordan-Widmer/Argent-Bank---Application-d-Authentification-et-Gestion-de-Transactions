import React, { createContext, useState, useEffect } from "react";
import { fetchUserProfile } from '../api';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      login(token);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const login = async (token) => {
    localStorage.setItem('jwtToken', token);
    setIsLoggedIn(true);

    try {
      const userProfile = await fetchUserProfile(token);
      setUserProfile(userProfile);
    } catch (error) {
      console.error('Erreur lors de la récupération du profil', error);
    }

    navigate('/profile'); // Redirige vers la page /profile après la connexion réussie
  };

  const logout = () => {
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, userProfile, setUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
