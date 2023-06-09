import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import axios from "axios";

const Navbar = () => {
  const { loggedIn, getLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await axios.get("http://localhost:4000/auth/logout");
    await getLoggedIn();
    navigate("/");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      {loggedIn === false && (
        <>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      )}

      {loggedIn === true && <Link to="/recipes">Recipes</Link>}

      {loggedIn === true && (
        <>
          <Link to="/login">
            <button onClick={logoutHandler}>Logout</button>
          </Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;
