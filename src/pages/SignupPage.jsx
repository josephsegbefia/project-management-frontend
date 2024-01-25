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

  const checkFields = () => {
    if(email === '' || firstName === '' || lastName === '' || password === ''){
      return true;
    }
    false
  }

  const handleSignupSubmit = (e) => {
    setIsLoading(loading => !loading)
    e.preventDefault();
    // Create an object representing the request body
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
                      type="text"
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
                      type="text"
                      placeholder="Repeat Password"
                      value={lastName}
                      onChange={handleLastName}
                    />
                    <span className="icon is-small is-left">
                      <FontAwesomeIcon icon = {faLock}/>
                    </span>
                  </p>
                </div>
              </div>
            </div>

          </form>



    </div>


      {/* <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handlePassword} />

        <label>First Name:</label>
        <input type="text" name="firstname" value={firstName} onChange={handleFirstName} />

        <label>Last Name:</label>
        <input type="text" name="lastname" value={lastName} onChange={handleLastName} />

        <button type="submit" disabled={checkFields()} >Sign Up</button>
      </form> */}

      <form>

      </form>



      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}

export default SignupPage;
