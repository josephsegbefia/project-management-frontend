/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [reload, setReload] = useState(false);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const reloadPage = () => {
    setReload(reload => !reload);
    setErrorMessage(undefined);
  }

  useEffect(() => {
    // Empty
  }, [reload]);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="container">
      <div className="LoginPage columns">
        <div className="column is-half is-offset-one-quarter login">
          <h1 className = 'has-text-centered is-size-3 has-text-primary'>Login</h1>
          {errorMessage && (
          <article className="message is-danger">
            <div className="message-header">
              <p>Error</p>
              <button onClick = {reloadPage} className="delete" aria-label="delete"></button>
            </div>
            <div className = "message-body">
              {errorMessage}
            </div>
          </article>
        )}
          <form onSubmit={handleLoginSubmit}>
            <div className="field">
              <p className="control has-icons-left has-icons-right">
                <input
                  className="input"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={handleEmail}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-envelope"></i>
                </span>
              </p>
            </div>

            <div className="field">
              <p className="control has-icons-left">
                <input
                  className="input"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={handlePassword}
                />
                <span className="icon is-small is-left">
                  <i className="fas fa-lock"></i>
                </span>
              </p>
            </div>

            <p className="control">
              <button className="button is-success">Login</button>
            </p>
          </form>
          {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
          <p>Don't have an account yet?</p>
          <Link to={"/signup"}> Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
