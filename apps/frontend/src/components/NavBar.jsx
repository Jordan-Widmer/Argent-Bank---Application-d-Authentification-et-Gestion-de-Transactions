import React from "react";
import {Link} from "react-router-dom";
import argentBankLogo from "../assets/img/argentBankLogo.png";
import {useSelector, useDispatch} from "react-redux";
import {logout} from "../redux/actions";

function NavBar() {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.isLoggedIn);
    const userProfile = useSelector(state => state.userProfile);

    const handleSignOut = () => {
        dispatch(logout());
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
