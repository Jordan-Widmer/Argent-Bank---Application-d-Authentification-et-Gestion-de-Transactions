import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions";
import { loginUser } from "../api";

function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const dispatch = useDispatch();

  const handleUsernameChange = (e) => {
    const { value } = e.target;
    setUsername(value);
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setPassword(value);
  };

  const handleRememberMeChange = (e) => {
    const { checked } = e.target;
    setRememberMe(checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setLoginError("Please enter both username and password.");
      return;
    }

    try {
      const { token } = await loginUser({ username, password });
      setLoginError(null);
      dispatch(login(token));

      if (rememberMe) {
        localStorage.setItem("username", username);
        localStorage.setItem("token", token);
      }
    } catch (error) {
      setLoginError("Authentication failed. Please check your credentials.");
    }
  };

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} autoComplete="off">
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
          {loginError && <p style={{ color: "red" }}>{loginError}</p>}
        </form>
      </section>
    </main>
  );
}

export default SignIn;
