/*
 * Filename: Login.jsx
 * Description: Contains the UI and functionality for user logging(admin, back officer, travel agent)
 * Author: Hiruni Mudannayake
 */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import loginImage from "../../../../public/assets/login1.jpg";
import axiosInstance from "../../../DefaultHeader";
import { useUserContext } from "../../../UserContext";

function Login() {
  const { setIsLoggedIn, setRole } = useUserContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    const apiUrl = "/User/login";

    axiosInstance
      .post(apiUrl, {
        username: username,
        password: password,
      })
      .then((response) => {
        const data = response.data;

        if (data.success) {
          setIsLoggedIn(true); //update the global state
          setRole(data.role);

          localStorage.setItem("token", data.token);

          if (data.role == "Admin") {
            navigate("/createUser");
          } else if (data.role == "Back Officer") {
            navigate("/backOfficerHome");
          } else {
            navigate("/travelAgentHome");
          }

          alert("sucessfully login.");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error occurred while processing your request.");
      });
  };

  return (
    <login>
      <div className="background">
        <div>
          <img src={loginImage} alt="" />
        </div>
        <div className="form">
          <h2 className="formTitle">Login</h2>

          <input
            className="formFields"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            className="formFields"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="formBtn" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </login>
  );
}

export default Login;
