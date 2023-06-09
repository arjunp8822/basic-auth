import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVerify, setpasswordVerify] = useState("");
  const [errorState, setErrorState] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const registerData = {
        username: username,
        password: password,
        passwordVerify: passwordVerify,
      };
      await axios.post("http://localhost:4000/auth/register", registerData);
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
