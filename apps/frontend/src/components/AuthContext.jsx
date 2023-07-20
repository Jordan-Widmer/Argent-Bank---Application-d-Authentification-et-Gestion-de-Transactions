import React, {useEffect} from "react";
import {fetchUserProfile} from "../api";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logIn, logout, updateProfile} from "../redux/actions";

const getToken = () => localStorage.getItem("jwtToken");
const setToken = (token) => localStorage.setItem("jwtToken", token);
const removeToken = () => localStorage.removeItem("jwtToken");

export const AuthProvider = ({children}) => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const userProfile = useSelector(state => state.userProfile);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token) {
            activeLogin(token);
        }
    }, []);

    const activeLogin = async (token) => {
        setToken(token);
        dispatch(logIn(token)); // Modification ici

        try {
            const userProfile = await fetchUserProfile(token);
            dispatch(updateProfile(userProfile));
            navigate("/profile");
        } catch (error) {
            console.error("Erreur lors de la récupération du profil", error);
            // TODO: show error to user
        }
    };

    const activeLogout = () => {
        removeToken();
        dispatch(logout());
    };

    return (
        <div>
            {isLoggedIn ? (
                <button onClick={activeLogout}>Logout</button>
            ) : (
                <button onClick={() => activeLogin("fakeToken")}>Login</button>
            )}
            {children}
        </div>
    );
};

export default AuthProvider;
