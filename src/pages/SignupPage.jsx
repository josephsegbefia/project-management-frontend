import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";


function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);

  const checkFields = () => {
    if(email === '' || firstName === '' || lastName === '' || password === ''){
      return true;
    }
    false
  }

  const handleSignupSubmit = (e) => {

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
    <div className="SignupPage">
      <h1>Sign Up</h1>

      {isLoading && <p>Loading...</p>}

      <form onSubmit={handleSignupSubmit}>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={handlePassword} />

        <label>First Name:</label>
        <input type="text" name="firstname" value={firstName} onChange={handleFirstName} />

        <label>Last Name:</label>
        <input type="text" name="lastname" value={lastName} onChange={handleLastName} />

        <button type="submit" disabled={checkFields()} >Sign Up</button>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Already have account?</p>
      <Link to={"/login"}> Login</Link>
    </div>
  )
}

export default SignupPage;
