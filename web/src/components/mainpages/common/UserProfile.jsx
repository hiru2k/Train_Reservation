//View and Update Back Officer and Travel Agent Profiles by them selves
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../DefaultHeader";

function UserProfile() {
  const [user, setUser] = useState({
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
    axiosInstance
      .get("User/profile")
      .then((response) => {
        setUser(response.data);
        setEditedName(response.data.username);
        setEditedEmail(response.data.email);
        setEditedPassword(response.data.password);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const handleSaveChanges = () => {
    axiosInstance
      .put(`User/profile/${user.nic}`, {
        username: editedName,
        email: editedEmail,
        password: editedPassword,
      })
      .then((response) => {
        if (response.data.status == "200") {
          alert("Successfully updated");
        } else if (response.data.status == "201") {
          alert("Content is changed");
        }
      })
      .catch((error) => {
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
