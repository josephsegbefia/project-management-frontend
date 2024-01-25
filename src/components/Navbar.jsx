/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {
  // Subscribe to the AuthContext to gain access to
  // the values from AuthContext.Provider `value` prop
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="https://bulma.io">
          {/* <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" /> */}
        </a>

        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button">
                <Link to="/">
                  <strong>Home</strong>
                </Link>
              </button>
            </div>
          </div>

          {isLoggedIn && (
            <div className="navbar-item">
              <div className="buttons">
                <button className="button">
                  <Link to = {`/${user._id}/projects`}>
                    <strong>Projects</strong>
                  </Link>
                </button>
              </div>
            </div>
          )}
        </div>

        {!isLoggedIn && (
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button className="button is-primary">
                  <Link to="/signup">
                    <strong>Sign up</strong>
                  </Link>
                </button>
                <button className="button is-light">
                  <Link to="/login">Log in</Link>
                </button>
              </div>
            </div>
          </div>
        )}

        {isLoggedIn && (
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <button onClick={logOutUser} className="button is-danger">
                <Link>Log Out</Link>
              </button>
            </div>
          </div>
        </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
