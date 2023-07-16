import React, { createContext, useState, useEffect } from "react";
import { fetchUserProfile } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setUserProfile } from "../store/actions";

export const AuthContext = createContext();

const getToken = () => localStorage.getItem("jwtToken");
const setToken = (token) => localStorage.setItem("jwtToken", token);
const removeToken = () => localStorage.removeItem("jwtToken");

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [localUserProfile, setLocalUserProfile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      login(token);
    }

    return () => {
      setMounted(false);
    };
  }, []);

  const login = async (token) => {
    setToken(token);
    setIsLoggedIn(true);

    try {
      const userProfile = await fetchUserProfile(token);
      if (!mounted) return;
      setLocalUserProfile(userProfile);
      dispatch(setUserProfile(userProfile));
    } catch (error) {
      console.error("Erreur lors de la récupération du profil", error);
      // TODO: show error to user
    }
  };

  const activeLogin = async (token) => {
    await login(token);
    if (localUserProfile) {
      navigate("/profile");
    }
  };

  const logout = () => {
    removeToken();
    setIsLoggedIn(false);
    setLocalUserProfile(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, login: activeLogin, logout, userProfile: localUserProfile, setUserProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
