import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "../../../DefaultHeader";

function UserRegistration() {
  // Define state variables to store user input
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a user object with the collected data
    const user = {
      Id: {},
      Username: name,
      NIC: nic,
      Role: role,
      Email: email,
      Password: nic,
    };

    axiosInstance
      .post("/User/register", user)
      .then((response) => {
        console.log("User registered successfully:", response.data);

        setName("");
        setNic("");
        setRole("");
        setEmail("");
      })
      .catch((error) => {
        console.error("Error occurred while registering user:", error);
      });
  };

  return (
    <div>
      <h2>User Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>NIC :</label>
          <input
            type="text"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select a role</option>
            <option value="Back Officer">Back Officer</option>
            <option value="Travel Agent">Travel Agent</option>
          </select>
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default UserRegistration;
