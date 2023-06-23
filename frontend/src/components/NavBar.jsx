import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import argentBankLogo from '../assets/img/argentBankLogo.png';

function NavBar() {
  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Lorsque l'utilisateur se déconnecte, supprimer le JWT du localStorage
    localStorage.removeItem('jwtToken');
    setIsLoggedIn(false);
    navigate('/sign-in');
  };

  return (
    <nav className="main-nav">
      <Link to="/" className="main-nav-logo">
        <img
          className="main-nav-logo-image"
          src={argentBankLogo}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {isLoggedIn ? (
          <button onClick={handleSignOut} className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign Out
          </button>
        ) : (
          <Link to="/sign-in" className="main-nav-item">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
