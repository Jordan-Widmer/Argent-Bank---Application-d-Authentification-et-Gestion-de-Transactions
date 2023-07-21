import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../api";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { logIn } from "../redux/actions";

function SignInPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const credentials = { email: username, password };
            const response = await loginUser(credentials);

            console.log("Status:", response.status);
            console.log("Body:", response.body);

            if (response.status === 200 && response.body && response.body.token) {
                localStorage.setItem("jwtToken", response.body.token);
                dispatch(logIn(response.body.token));
                navigate("/profile", { replace: true });
            } else {
                throw new Error("Erreur d'authentification");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <NavBar />
            <main className="main bg-dark" style={{ flex: "1", display: "flex", flexDirection: "column", alignItems: "center", padding: "2rem" }}>
                <section className="sign-in-content">
                    <i className="fa fa-user-circle sign-in-icon"></i>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="input-wrapper">
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="input-wrapper">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="input-remember">
                            <input type="checkbox" id="remember-me" />
                            <label htmlFor="remember-me">Remember me</label>
                        </div>
                        <button type="submit" className="sign-in-button">
                            Sign In
                        </button>
                    </form>
                </section>
            </main>
            <Footer />
        </div>
    );
}

export default SignInPage;
