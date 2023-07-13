import React, {createContext, useState, useEffect} from "react";
import {fetchUserProfile} from "../api";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext();

const getToken = () => localStorage.getItem("jwtToken");
const setToken = (token) => localStorage.setItem("jwtToken", token);
const removeToken = () => localStorage.removeItem("jwtToken");

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token) {
            login(token);
        }
    }, []);

    const login = async (token) => {
        setToken(token);
        setIsLoggedIn(true);

        try {
            const userProfile = await fetchUserProfile(token);
            setUserProfile(userProfile);
        } catch (error) {
            console.error("Erreur lors de la récupération du profil", error);
            // TODO: show error to user
        }
    };

    const activeLogin = async (token) => {
        await login(token);
        if (userProfile) {
            navigate("/profile");
        }
    };

    const logout = () => {
        removeToken();
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, login: activeLogin, logout, userProfile, setUserProfile}}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
