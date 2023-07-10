import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {AuthProvider} from "../components/AuthContext";
import HomePage from "../pages/HomePage";
import UserProfilePage from "../pages/UserProfilePage";
import SignInPage from "../pages/SignInPage";

function Paths() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/profile" element={<UserProfilePage />} />
                    <Route path="/sign-in" element={<SignInPage />} />
                </Routes>
            </AuthProvider>
        </Router>
    );
}

export default Paths;
