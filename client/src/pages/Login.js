import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom';


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  let history = useNavigate();

  const login = () => {
    const data = { username: username, password: password };
    axios.post("http://localhost:1620/auth/login", data)
  .then((response) => {
    if(response.data.error)
      alert(response.data.error);
    else {sessionStorage.setItem("accessToken", response.data);
      history("/home");
  }})
  .catch((error) => {
    console.error("Login error:", error);
    setError("Invalid username or password");
  });

  };

  return (
    <div className="loginContainer">
      <label>Username:</label>
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
      />
      {error && <span className="error">{error}</span>}
      <button onClick={login}> Login </button>
    </div>
  );
}

export default Login;
