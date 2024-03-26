import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Account from "../components/Account";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions";
import { fetchUserProfile, updateUserProfile } from "../api";

function User() {
  const userProfile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newFirstName, setNewFirstName] = useState(userProfile?.firstName || "");
  const [newLastName, setNewLastName] = useState(userProfile?.lastName || "");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const validateNames = () => {
    const nameRegex = /^[a-zA-Z]+$/;

    if (!newFirstName || !nameRegex.test(newFirstName)) {
      setFirstNameError("Please enter a valid first name.");
      return false;
    } else {
      setFirstNameError("");
    }

    if (!newLastName || !nameRegex.test(newLastName)) {
      setLastNameError("Please enter a valid last name.");
      return false;
    } else {
      setLastNameError("");
    }

    return true;
  };

  const handleSaveName = async () => {
    const isValid = validateNames();

    if (isValid) {
      const updatedProfile = { ...userProfile, firstName: newFirstName, lastName: newLastName };

      dispatch(updateProfile(updatedProfile));

      try {
        await updateUserProfile(updatedProfile); // Send changes to the database
        setIsEditingName(false);
      } catch (error) {
        console.error("Erreur lors de la mise à jour du profil", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setNewFirstName(userProfile?.firstName || "");
    setNewLastName(userProfile?.lastName || "");
    setFirstNameError("");
    setLastNameError("");
  };

  return (
    <main className="main bg-dark" style={{ flex: "1" }}>
      <div className="header" style={{ color: "#fff", marginBottom: "2rem" }}>
        <h1>Welcome back<br />{userProfile.firstName} {userProfile.lastName}!</h1>
        {isEditingName ? (
          <>
            <div>
              <input type="text" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} />
              {firstNameError && <p style={{ color: "red" }}>{firstNameError}</p>}
              <input type="text" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} />
              {lastNameError && <p style={{ color: "red" }}>{lastNameError}</p>}
            </div>
            <div>
              <button onClick={handleSaveName}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </div>
          </>
        ) : (
          <button className="edit-button" onClick={handleEditName}>Edit Name</button>
        )}
      </div>
      <Account />
    </main>
  );
}

function UserProfilePage() {
  const dispatch = useDispatch();
  const { isLoggedIn, token } = useSelector(state => ({
    isLoggedIn: state.isLoggedIn,
    token: state.token
  }));

  useEffect(() => {
    const loadProfile = async () => {
      if (isLoggedIn && token) {
        try {
          const userProfileData = await fetchUserProfile(token);
          dispatch(updateProfile(userProfileData));
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };

    loadProfile();
  }, [isLoggedIn, token, dispatch]);

  const userProfile = useSelector(state => state.userProfile);

  if (!userProfile) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <NavBar />
      <User />
      <Footer />
    </div>
  );
}

export default UserProfilePage;
