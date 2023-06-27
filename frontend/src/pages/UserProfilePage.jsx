import React, { useEffect, useContext } from 'react';
import NavBar from '../components/NavBar';
import Account from '../components/Account';
import Footer from '../components/Footer';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';

function User() {
  const { userProfile } = useContext(AuthContext);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Welcome back<br />{userProfile.firstName} {userProfile.lastName}!</h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {userProfile.accounts ? userProfile.accounts.map((account) => (
        <Account
          key={account.id}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      )) : <div>Loading accounts...</div>}
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
      <NavBar userProfile={userProfile} />
      <User />
      <Footer />
    </div>
  );
}

export default UserProfilePage;
