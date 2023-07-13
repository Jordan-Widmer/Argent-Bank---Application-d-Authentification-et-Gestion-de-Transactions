import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {AuthContext} from "./AuthContext";
import argentBankLogo from "../assets/img/argentBankLogo.png";

function NavBar() {
    const {isLoggedIn, userProfile, logout} = useContext(AuthContext);

    const handleSignOut = () => {
        logout();
    };

    return (
        <header className="main-header">
            <nav className="main-nav">
                <Link to="/" className="main-nav-logo">
                    <img className="main-nav-logo-image" src={argentBankLogo} alt="Argent Bank Logo" />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    {isLoggedIn ? (
                        <>
                            <Link to="/profile" className="main-nav-item">
                                <i className="fa fa-user-circle" />
                                {userProfile?.firstName}
                            </Link>
                            <Link to="/sign-in" onClick={handleSignOut} className="main-nav-item">
                                <i className="fa fa-sign-out" />
                                Sign Out
                            </Link>
                        </>
                    ) : (
                        <Link to="/sign-in" className="main-nav-item">
                            <i className="fa fa-user-circle" />
                            Sign In
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
