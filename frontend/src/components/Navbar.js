import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";

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
    <nav className={showmobileNav ? "" : "nav-hidden"}>
      <div className="nav-logo">
        <Link to="/">ReciME</Link>
      </div>

      <div className="nav-main">
        {loggedIn === true && <Link to="/recipes">Recipes</Link>}
        {loggedIn === true && <Link to="/newrecipe">New Recipe</Link>}
      </div>

      <div className="nav-auth">
        {loggedIn === false && (
          <>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
          </>
        )}
        {loggedIn === true && (
          <>
            <Link to="/">
              <button onClick={logoutHandler}>Logout</button>
            </Link>
          </>
        )}
        {loggedIn === true && (
          <>
            <Link to="/" className="nav-user">
              {loggedUser}
            </Link>
          </>
        )}
      </div>

      <div className="nav-mobile-icon">
        <GiHamburgerMenu />
      </div>
    </nav>
  );
};

export default Navbar;
