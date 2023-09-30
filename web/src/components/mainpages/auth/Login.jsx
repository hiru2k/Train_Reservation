import React, { useState } from "react";
import axios from "axios";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    const apiUrl = "https://localhost:7103/api/User/login";

    // Make a POST request to the login API using Axios
    axios
      .post(apiUrl, {
        Username: username,
        Password: password,
        Email: "",
        NIC: "",
        Role: "",
        Phone: "",
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setLoggedIn(true);
        } else {
          alert("Invalid username or password");
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
        {loggedIn ? (
          <div>
            <h2>Welcome, {username}!</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}

export default Login;
