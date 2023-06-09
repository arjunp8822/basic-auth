import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Recipes from "./pages/Recipes";
import Navbar from "./components/Navbar";
import axios from "axios";
import AuthContext from "./context/AuthContext";

import { useContext } from "react";

axios.defaults.withCredentials = true;

function App() {
  const { loggedIn } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <Routes className="App">
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {loggedIn === true && <Route path="/recipes" element={<Recipes />} />}
      </Routes>
    </>
  );
}

export default App;
