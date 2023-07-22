import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Account from "../components/Account";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../redux/actions";
import { updateUserProfile } from "../api";

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
      const updatedProfile = Object.assign({}, userProfile, {
        firstName: newFirstName,
        lastName: newLastName,
      });

      dispatch(updateProfile(updatedProfile));

      try {
        await updateUserProfile(updatedProfile); // Send changes to the database
        setIsEditingName(false);
      } catch (error) {
        console.error("Erreur lors de la mise à jour du profil", error);
        // Handle the profile update error
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
        <h1>
          Welcome back
          <br />
          {userProfile.firstName} {userProfile.lastName}!
        </h1>
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
          <button className="edit-button" onClick={handleEditName}>
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      <Account />
    </main>
  );
}

function UserProfilePage() {
  const userProfile = useSelector((state) => state.userProfile);

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
