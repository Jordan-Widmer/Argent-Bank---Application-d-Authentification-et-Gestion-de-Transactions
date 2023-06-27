import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../components/AuthContext';
import { loginUser } from '../api/api';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      login(token);
      navigate('/profile'); // Redirige automatiquement si un token est présent
    }
  }, [login, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const credentials = { email: username, password };
      const response = await loginUser(credentials);
  
      console.log('Status:', response.status); // log pour vérifier le statut
      console.log('Body:', response.body); // log pour vérifier les données de la réponse
  
      if (response.status === 200 && response.body && response.body.token) {
        login(response.body.token);
        navigate('/profile'); // Redirige vers la page /profile après la connexion réussie
      } else {
        throw new Error('Erreur d\'authentification');
      }
    } catch (error) {
      console.error(error);
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
