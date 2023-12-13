import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { updateUserProfile } from "../api";
import { updateProfile } from "../redux/actions";

// Account table moved outside the component
const accounts = [
  {
    title: "Argent Bank Checking (x8349)",
    amount: "$2,082.79",
    description: "Available Balance",
    accountType: "checking", // Make sure to add this property to match the URL segment
  },
  {
    title: "Argent Bank Savings (x6712)",
    amount: "$10,928.42",
    description: "Available Balance",
    accountType: "savings", // Make sure to add this property to match the URL segment
  },
  {
    title: "Argent Bank Credit Card (x8349)",
    amount: "$184.30",
    description: "Current Balance",
    accountType: "credit-card", // Make sure to add this property to match the URL segment
  },
];

// Separate component for each account section
function AccountSection({ account }) {
  const userProfile = useSelector((state) => state.userProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate for redirection
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

  // Update the redirectToTransactions function to include the account type
  const redirectToTransactions = () => {
    navigate(`/transactions/${account.accountType}`); // Navigate to the dynamic route
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
          <button className="transaction-button" onClick={redirectToTransactions}>
            View transactions
          </button>
        )}
      </div>
    </section>
  );
}

// Component for the list of accounts
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
