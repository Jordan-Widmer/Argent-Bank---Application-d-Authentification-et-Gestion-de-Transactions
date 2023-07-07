import React, { useEffect, useContext, useState } from 'react';
import NavBar from '../components/NavBar';
import Account from '../components/Account';
import Footer from '../components/Footer';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import { fetchUserProfile, updateUserProfile } from '../api';

function User() {
  const { userProfile, setUserProfile } = useContext(AuthContext);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newLastName, setNewLastName] = useState('');

  useEffect(() => {
    if (userProfile) {
      setNewFirstName(userProfile.body.firstName);
      setNewLastName(userProfile.body.lastName);
    }
  }, [userProfile]);

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleSaveName = async () => {
    const updatedUserProfile = Object.assign(userProfile);
    updatedUserProfile.body.firstName = newFirstName;
    updatedUserProfile.body.lastName = newLastName;
    setUserProfile(updatedUserProfile);

    try {
      await updateUserProfile(userProfile.token, newFirstName, newLastName); // Envoie les changements à la base de données 
      setIsEditingName(false);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil', error);
      // Gérer l'erreur de la mise à jour du profil
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setNewFirstName(userProfile.body.firstName);
    setNewLastName(userProfile.body.lastName);
  };

  return (
    <main className="main bg-dark" style={{ flex: '1' }}>
      <div className="header" style={{ color: '#fff', marginBottom: '2rem' }}>
        {isEditingName ? (
          <>
            <input
              type="text"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
            <input
              type="text"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
            <button onClick={handleSaveName}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <>
            <h1>
              Welcome back<br />
              {userProfile.body.firstName} {userProfile.body.lastName}!
            </h1>
            <button className="edit-button" onClick={handleEditName}>
              Edit Name
            </button>
          </>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account />
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
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <NavBar userProfile={userProfile} />
      <User />
      <Footer />
    </div>
  );
}

export default UserProfilePage;
