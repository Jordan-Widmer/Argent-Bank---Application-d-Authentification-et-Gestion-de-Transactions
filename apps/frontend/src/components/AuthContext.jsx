import React, {createContext, useState, useEffect} from "react";
import {fetchUserProfile} from "../api";
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {userProfile} from "../store/actions/userActions.js";
import {useProfile} from "../hooks/useProfile";
import {useToken} from "../hooks/useToken";
export const AuthContext = createContext();

const {getToken, setToken, removeToken} = useToken();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [localUserProfile, setLocalUserProfile] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(true);

    useEffect(() => {
        const token = getToken("jwtToken");
        if (token) {
            login(token);
            dispatch(userProfile());
        }

        return () => {
            setMounted(false);
        };
    }, []);

    const login = async (token) => {
        setToken("jwtToken", token);
        setIsLoggedIn(true);

        try {
            const userProfile = useProfile().get();
            if (!mounted) {
                return;
            }
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
        removeToken("jwtToken");
        setIsLoggedIn(false);
        setLocalUserProfile(null);
    };

    return <AuthContext.Provider value={{isLoggedIn, login: activeLogin, logout}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
