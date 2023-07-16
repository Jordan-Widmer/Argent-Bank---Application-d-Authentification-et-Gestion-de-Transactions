import React, {useState, useContext} from "react";
import {AuthContext} from "./AuthContext";

function SignIn() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    // Récupération du contexte d'authentification
    const {login} = useContext(AuthContext);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleRememberMeChange = (e) => {
        setRememberMe(e.target.checked);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ici, vous devrez probablement remplacer cette partie par votre propre logique de connexion.
        // Cela pourrait impliquer une requête à votre API pour récupérer le jeton JWT, puis appeler la fonction de connexion.
        const token = await someApi.login(username, password); // Remplacez ceci par votre appel d'API
        login(token);

        // Si "remember me" est sélectionné, stockez les informations d'identification (ou le jeton JWT) dans le local storage
        if (rememberMe) {
            localStorage.setItem("username", username);
            localStorage.setItem("token", token);
        }
    };

    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" checked={rememberMe} onChange={handleRememberMeChange} />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="sign-in-button">
                        Sign In
                    </button>
                </form>
            </section>
        </main>
    );
}

export default SignIn;
