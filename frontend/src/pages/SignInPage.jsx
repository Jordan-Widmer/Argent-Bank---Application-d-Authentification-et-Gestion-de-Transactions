import React, { useState, useContext } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { loginUser } from '../api/api';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'; // Importez le contexte d'authentification

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  
  // Utilisez le contexte d'authentification pour accéder à la fonction setIsLoggedIn
  const { setIsLoggedIn } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const credentials = { email: username, password };
      await loginUser(credentials); // This now saves the JWT to local storage
      setIsLoggedIn(true); // Mettez à jour l'état isLoggedIn après une connexion réussie
      navigate('/profile');
    } catch (error) {
      console.error('Erreur d\'authentification', error);
    }
  };

  return (
    <div>
      <NavBar />
      <main className="main bg-dark">
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="input-remember">
              <input type="checkbox" id="remember-me" />
              <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">Sign In</button>
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default SignInPage;
