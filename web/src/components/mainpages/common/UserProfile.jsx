//View and Update Back Officer and Travel Agent Profiles by them selves
import React, { useState, useEffect } from "react";
import axios from "axios";
import axiosInstance from "../../../DefaultHeader";

function UserProfile() {
  const [editedUser, seteditedUser] = useState({
    username: "",
    email: "",
    password: "",
    nic: "",
    role: "",
  });

  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");
  const [editedPassword, setEditedPassword] = useState("");

  useEffect(() => {
    // Fetch user profile data from the API endpoint
    axiosInstance
      .get("User/profile")
      .then((response) => {
        setUser(response.data); // Assuming the API response contains user data
        setEditedName(response.data.username);
        setEditedEmail(response.data.email);
        setEditedPassword(response.data.password);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []); // The empty dependency array ensures this effect runs once after the initial render

  const handleSaveChanges = () => {
    // Perform actions here to save the edited fields to the server
    // For this example, let's assume there's a PUT API endpoint to update user data
    axios
      .put(`User/profile/update/${editedUser.email}`, {
        username: editedName,
        email: editedEmail,
        password: editedPassword,
      })
      .then((response) => {
        // Handle success, if needed
        console.log("Changes saved successfully!");
      })
      .catch((error) => {
        // Handle error, if needed
        console.error("Error saving changes:", error);
      });
  };
  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <strong>Name:</strong>
        {user.username}
      </div>
      <div>
        <strong>NIC:</strong>
        {user.nic}
      </div>
      <div>
        <strong>Role:</strong>
        {user.role}
      </div>
      <div>
        <strong>Email:</strong>
        {user.email}
      </div>
      <div>
        <strong>Password:</strong>
        {user.password}
      </div>
      <div>
        <button onClick={handleSaveChanges}>Save Changes</button>
      </div>
      <div>
        <label>
          Edit Name:
          <input
            type="text"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Edit Email:
          <input
            type="email"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Edit Password:
          <input
            type="password"
            value={editedPassword}
            onChange={(e) => setEditedPassword(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
}

export default UserProfile;
