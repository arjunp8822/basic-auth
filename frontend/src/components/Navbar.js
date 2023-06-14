import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiFillCloseCircle } from "react-icons/ai";

const Navbar = () => {
  const { loggedIn, getLoggedIn, loggedUser } = useContext(AuthContext);
  const [showmobileNav, setShowMobileNav] = useState(false);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await axios.get("http://localhost:4000/auth/logout");
    await getLoggedIn();
    navigate("/");
  };

  return (
    <nav>
      <div className="nav-logo">
        <Link to="/">ReciME</Link>
      </div>

      <div className={showmobileNav ? "nav-list" : "nav-list nav-hidden"}>
        <div className="nav-main">
          <Link to="/recipes" onClick={() => setShowMobileNav(false)}>
            Recipes
          </Link>
          {loggedIn === true && (
            <Link to="/newrecipe" onClick={() => setShowMobileNav(false)}>
              New Recipe
            </Link>
          )}
        </div>

        <div className="nav-auth">
          <div className="close-button" onClick={() => setShowMobileNav(false)}>
            <AiFillCloseCircle />
          </div>
          <div className="nav-credentials">
            {loggedIn === false && (
              <>
                <Link
                  to="/register"
                  className="register"
                  onClick={() => setShowMobileNav(false)}
                >
                  Register
                </Link>
                <Link to="/login" onClick={() => setShowMobileNav(false)}>
                  Login
                </Link>
              </>
            )}

            {loggedIn === true && (
              <>
                <Link
                  to="/"
                  className="nav-user"
                  onClick={() => setShowMobileNav(false)}
                >
                  {loggedUser}
                </Link>
              </>
            )}
            {loggedIn === true && (
              <>
                <Link to="/" onClick={() => setShowMobileNav(false)}>
                  <button onClick={logoutHandler}>Logout</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      <div
        className="nav-mobile-icon"
        onClick={() => setShowMobileNav(!showmobileNav)}
      >
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
