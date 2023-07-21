import React, {useEffect} from "react";
import {fetchUserProfile} from "../api";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logIn, updateProfile} from "../redux/actions";

const getToken = () => {
    const token = localStorage.getItem("jwtToken");
    console.log('getToken:', token);
    return token;
}
const setToken = (token) => {
    console.log('setToken:', token);
    localStorage.setItem("jwtToken", token);
}

export const removeToken = () => {
    console.log('removeToken');
    localStorage.removeItem("jwtToken");
}

export const AuthProvider = ({children}) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => {
        console.log('isLoggedIn:', state.isLoggedIn);
        return state.isLoggedIn;
    });
    const userProfile = useSelector(state => state.userProfile);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token) {
            activeLogin(token);
        }
    }, []);

    const activeLogin = async (token) => {
        dispatch(logIn(token));

        try {
            setToken(token);
            const userProfile = await fetchUserProfile(token);
            dispatch(updateProfile(userProfile));
            navigate("/profile");
        } catch (error) {
            console.error("Erreur lors de la récupération du profil", error);
            // TODO: show error to user
        }
    };

    return (
        <div>
            {children}
        </div>
    );
};

export const activeLogout = () => {
    removeToken();
}

export default AuthProvider;
