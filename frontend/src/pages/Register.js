import React, { useContext, useState } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setpasswordVerify] = useState("");
  const [errorState, setErrorState] = useState(null);
  const { setLoggedUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const registerData = {
        username: username,
        password: password,
        passwordVerify: passwordVerify,
      };
      const result = await axios.post(
        "http://localhost:4000/auth/register",
        registerData
      );
      setLoggedUser(result.data);
      navigate("/");
    } catch (e) {
      setErrorState(e.response.data.errorMessage);
    }
  };

  return (
    <div>
      <h1>Register a new account</h1>
      <form onSubmit={submitHandler}>
        <input
          type="string"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={(e) => setpasswordVerify(e.target.value)}
          value={passwordVerify}
        />
        <button type="submit">Register</button>
      </form>
      {errorState}
    </div>
  );
};

export default Register;
