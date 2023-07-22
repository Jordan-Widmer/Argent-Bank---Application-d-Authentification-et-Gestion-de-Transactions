import React, { useEffect } from "react";
import { fetchUserProfile } from "../api";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn, updateProfile } from "../redux/actions";

const getToken = () => {
  return localStorage.getItem("jwtToken");
};

const setToken = (token) => {
  localStorage.setItem("jwtToken", token);
};

const removeToken = () => {
  localStorage.removeItem("jwtToken");
};

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const userProfile = useSelector((state) => state.userProfile);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getToken();
    if (token && !isLoggedIn) {
      handleLogin(token);
    }
  }, [isLoggedIn]); // Run the effect only when isLoggedIn changes

  const handleLogin = async (token) => {
    try {
      setToken(token);
      dispatch(logIn(token));
      const userProfile = await fetchUserProfile(token);
      dispatch(updateProfile(userProfile));
      navigate("/profile");
    } catch (error) {
      console.error("Erreur lors de la récupération du profil", error);
      // TODO: Show error to the user
    }
  };

  return <div>{children}</div>;
};

export const handleLogout = () => {
  removeToken();
  // TODO: Dispatch logout action to update the state, if necessary
};

export default AuthProvider;
