/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const API_URL = "http://localhost:5005";


function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleRepeatPassword = (e) => setRepeatPassword(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const [reload, setReload] = useState(false);

  const checkFields = () => {
    if(email === '' || firstName === '' || lastName === '' || password === '' || repeatPassword === ''){
      return true;
    }
    false
  }

  const checkPasswordFields = () => {
    if(password !== repeatPassword){
      const error = 'Passwords do not match. Please review them';
      setErrorMessage(error);
      setPassword("");
      setRepeatPassword("");
    }
    return;
  }

  const reloadPage = () => {
    setReload(reload => !reload);
    setErrorMessage(undefined);
  }


  const handleSignupSubmit = (e) => {
    setIsLoading(loading => !loading)
    e.preventDefault();
    // Create an object representing the request body
    checkPasswordFields();
    const requestBody = { email, password, firstName, lastName };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        setIsLoading(loading => !loading)
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };


  return (
    <div className = "container">
      <div className="SignupPage">
        <h1 className = 'has-text-centered is-size-3 has-text-primary'>Sign Up</h1>
        <div className = "columns">
          <div className = "column is-half is-offset-one-quarter">
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
          </div>
        </div>
        <form onSubmit={handleSignupSubmit}>
          <div className = "columns">
            <div className = "column is-one-quarter is-offset-one-quarter">
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={handleFirstName}
                  />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon = {faUser}/>
                  </span>
                </p>
              </div>
            </div>

            <div className = "column is-one-quarter">
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={handleLastName}
                  />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon = {faUser}/>
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className = "columns">
            <div className = "column is-half is-offset-one-quarter">
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
                    <FontAwesomeIcon icon = {faEnvelope}/>
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className = "columns">
            <div className = "column is-one-quarter is-offset-one-quarter">
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="password"
                    placeholder="Passord"
                    value={password}
                    onChange={handlePassword}
                  />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon = {faLock}/>
                  </span>
                </p>
              </div>
            </div>

            <div className = "column is-one-quarter">
              <div className="field">
                <p className="control has-icons-left has-icons-right">
                  <input
                    className="input"
                    type="password"
                    placeholder="Repeat Password"
                    value={repeatPassword}
                    onChange={handleRepeatPassword}
                  />
                  <span className="icon is-small is-left">
                    <FontAwesomeIcon icon = {faLock}/>
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className = "columns">
            <div className = "column is-half is-offset-one-quarter">
              <p className="control">
                <button className="button is-success" disabled = {checkFields()}>Sign Up</button>
              </p>
            </div>
          </div>

          <div className = "columns">
            <div className = "column is-one-quarter is-offset-one-quarter">
              <p>Already have account?</p>
              <Link to={"/login"}> Login</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignupPage;
