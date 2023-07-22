import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../api";
import { updateProfile } from "../redux/actions";

// Move the accounts array outside the component
const accounts = [
  {
    title: "Argent Bank Checking (x8349)",
    amount: "$2,082.79",
    description: "Available Balance",
  },
  {
    title: "Argent Bank Savings (x6712)",
    amount: "$10,928.42",
    description: "Available Balance",
  },
  {
    title: "Argent Bank Credit Card (x8349)",
    amount: "$184.30",
    description: "Current Balance",
  },
];

// Create a separate component for each account section
function AccountSection({ account }) {
  const userProfile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const [isEditingName, setIsEditingName] = useState(false);
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [error, setError] = useState(null);

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleSaveName = () => {
    if (!userProfile) {
      return;
    }

    const updatedProfile = {
      ...userProfile,
      firstName: newFirstName,
      lastName: newLastName,
    };

    updateUserProfile(updatedProfile)
      .then(() => {
        dispatch(updateProfile(updatedProfile));
        setIsEditingName(false);
        setError(null);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to update profile.");
      });
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setNewFirstName("");
    setNewLastName("");
  };

  return (
    <section className="account">
      <div className="account-content-wrapper">
        <h3 className="account-title">{account.title}</h3>
        <p className="account-amount">{account.amount}</p>
        <p className="account-amount-description">{account.description}</p>
      </div>
      <div className="account-content-wrapper cta">
        {isEditingName ? (
          <>
            <input
              type="text"
              placeholder="Enter new first name"
              value={newFirstName}
              onChange={(e) => setNewFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter new last name"
              value={newLastName}
              onChange={(e) => setNewLastName(e.target.value)}
            />
            <button onClick={handleSaveName}>Save</button>
            <button onClick={handleCancelEdit}>Cancel</button>
            {error && <p>{error}</p>}
          </>
        ) : (
          <button className="transaction-button" onClick={handleEditName}>
            View transactions
          </button>
        )}
      </div>
    </section>
  );
}

function Account() {
  return (
    <>
      {accounts.map((account, index) => (
        <AccountSection account={account} key={index} />
      ))}
    </>
  );
}

export default Account;
