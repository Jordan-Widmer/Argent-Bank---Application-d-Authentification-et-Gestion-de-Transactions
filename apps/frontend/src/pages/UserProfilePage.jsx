// UserProfilePage.jsx
import React, {useEffect, useState} from "react";
import NavBar from "../components/NavBar";
import Account from "../components/Account";
import Footer from "../components/Footer";
import {useDispatch, useSelector} from "react-redux";
import {updateProfile} from "../redux/actions";
import {updateUserProfile} from "../api";

function User() {
    const userProfile = useSelector(state => state.userProfile);
    const dispatch = useDispatch();
    const [isEditingName, setIsEditingName] = useState(false);
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");

    useEffect(() => {
        if (userProfile) {
            setNewFirstName(userProfile.firstName);
            setNewLastName(userProfile.lastName);
        }
    }, [userProfile]);

    const handleEditName = () => {
        setIsEditingName(true);
    };

    const handleSaveName = async () => {
        const updatedProfile = Object.assign({}, userProfile, {
            firstName: newFirstName,
            lastName: newLastName
        });

        dispatch(updateProfile(updatedProfile));

        try {
            await updateUserProfile(updatedProfile); // Envoie les changements à la base de données
            setIsEditingName(false);
        } catch (error) {
            console.error("Erreur lors de la mise à jour du profil", error);
            // Gérer l'erreur de la mise à jour du profil
        }
    };

    const handleCancelEdit = () => {
        setIsEditingName(false);
        setNewFirstName(userProfile.firstName);
        setNewLastName(userProfile.lastName);
    };

    return (
        <main className="main bg-dark" style={{flex: "1"}}>
            <div className="header" style={{color: "#fff", marginBottom: "2rem"}}>
                <h1>
                    Welcome back
                    <br />
                    {userProfile.firstName} {userProfile.lastName}!
                </h1>
                {isEditingName ? (
                    <>
                        <div>
                            <input type="text" value={newFirstName} onChange={(e) => setNewFirstName(e.target.value)} />
                            <input type="text" value={newLastName} onChange={(e) => setNewLastName(e.target.value)} />
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
    const userProfile = useSelector(state => state.userProfile);

    if (!userProfile) {
        return <div>Loading...</div>;
    }

    return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <NavBar />
            <User />
            <Footer />
        </div>
    );
}

export default UserProfilePage;
