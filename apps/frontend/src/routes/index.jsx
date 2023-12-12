import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../components/AuthContext";
import HomePage from "../pages/HomePage";
import UserProfilePage from "../pages/UserProfilePage";
import SignInPage from "../pages/SignInPage";
import TransactionsPage from "../pages/TransactionsPage"; // Assurez-vous d'importer votre nouveau composant de page
import PrivateRoute from "../components/PrivateRoute";

function Paths() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<PrivateRoute><UserProfilePage /></PrivateRoute>} />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/transactions" element={<PrivateRoute><TransactionsPage /></PrivateRoute>} /> {/* Nouvelle route pour les transactions */}
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default Paths;
