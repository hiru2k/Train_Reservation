import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const history = useNavigate();

  const handleLogin = () => {
    const apiUrl = "https://localhost:7103/api/User/login";

    axios
      .post(apiUrl, {
        Username: username,
        Password: password,
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setLoggedIn(true);
          localStorage.setItem("token", data.token);

          // Check user role and redirect accordingly
          if (data.role == "admin") {
            window.location.href = "/createUser";
          } else if (data.role == "Back Officer") {
            window.location.href = "/travelerList";
          } else {
            window.location.href = "/createTraveler";
          }

          alert("sucessfully login.");
        } else {
          alert(data.message); // Show the error message from the server
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error occurred while processing your request.");
      });
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login">
      <div className="background">
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div>
            <button onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
