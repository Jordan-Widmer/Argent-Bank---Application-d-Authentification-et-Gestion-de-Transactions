import React, { useEffect, useContext, useState } from 'react';
import NavBar from '../components/NavBar';
import Account from '../components/Account';
import Footer from '../components/Footer';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile } from '../api/api';

function User() {
  const { userProfile } = useContext(AuthContext);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    const fetchUserAccounts = async () => {
      try {
        const response = await fetchUserProfile(); // Utiliser la fonction fetchUserProfile
        if (response.status === 200 && response.body) {
          setAccounts(response.body.accounts);
        }
      } catch (error) {
        console.error('Error fetching user accounts', error);
      }
    };

    fetchUserAccounts();
  }, []);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{userProfile.firstName} {userProfile.lastName}!</h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account) => (
        <Account
          key={account.id}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </main>
  );
}

function UserProfilePage() {
  const { isLoggedIn, userProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/sign-in');
    }
  }, [isLoggedIn, navigate]);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <User />
      <Footer />
    </div>
  );
}

export default UserProfilePage;
