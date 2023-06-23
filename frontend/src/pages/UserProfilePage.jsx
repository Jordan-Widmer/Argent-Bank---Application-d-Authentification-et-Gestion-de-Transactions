import React, { useState, useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import Account from '../components/Account';
import Footer from '../components/Footer';
import { fetchUserProfile } from '../api/api';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

function UserProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken'); // Obtenir le jeton JWT du localStorage
    if (!isLoggedIn || !token) {
      navigate('/sign-in');
    } else {
      const fetchData = async () => {
        try {
          const data = await fetchUserProfile(token);
          setUserProfile(data);
        } catch (error) {
          console.error('Erreur lors de la récupération du profil', error);
        }
      };

      fetchData();
    }
  }, [isLoggedIn, navigate]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <main className="main bg-dark">
        <div className="header">
          <h1>Welcome back<br />{userProfile.name}!</h1>
          <button className="edit-button">Edit Name</button>
        </div>
        <h2 className="sr-only">Accounts</h2>
        {userProfile.accounts && userProfile.accounts.map((account) => (
          <Account
            key={account.id}
            title={account.title}
            amount={account.amount}
            description={account.description}
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}

export default UserProfilePage;
