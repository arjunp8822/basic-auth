import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorState, setErrorState] = useState(null);
  const navigate = useNavigate();
  const { getLoggedIn, setLoggedUser } = useContext(AuthContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const loginData = {
        username: username,
        password: password,
      };
      const result = await axios.post(
        "http://localhost:4000/auth/login",
        loginData
      );
      setLoggedUser(result.data);
      await getLoggedIn();
      navigate("/");
    } catch (e) {
      setErrorState(e.response.data.errorMessage);
    }
  };

  return (
    <div>
      <h1>Login to your account</h1>
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
        <button type="submit">Login</button>
      </form>
      {errorState}
    </div>
  );
};

export default Login;
