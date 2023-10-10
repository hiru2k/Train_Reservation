/*
 * Filename: UserProfile.jsx
 * Description: Contains the UI and functionality for viewing and updating Back Officer and Travel Agent Profiles by them selves
 * Author: Hiruni Mudannayake
 */

import React, { useState, useEffect } from "react";
import axiosInstance from "../../../DefaultHeader";
import "./userProfile.css";
import BackgroundImage from "../../../../public/assets/prof_background3.jpg";

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
    <userProfile>
      <img src={BackgroundImage} alt="" />
      <div className="background">
        <div className="userDetailsView">
          <h2>User Profile</h2>
          <div className="userDetailsFirstViewItem">
            <lable>Username:</lable>
            {user.username}
          </div>
          <div className="userDetailsViewItems">
            <lable>National Identity Card(NIC):</lable>
            {user.nic}
          </div>
          <div className="userDetailsViewItems">
            <lable>Role:</lable>
            {user.role}
          </div>
          <div className="userDetailsViewItems">
            <lable>Email Address:</lable>
            {user.email}
          </div>
          <div className="userDetailsViewItems">
            <lable>Phone No</lable>
            {user.password}
          </div>
        </div>
        <div className="userDetailsEdit">
          <h2>Edit User Details</h2>
          <div className="userDetailsEditItems">
            <label>
              Username:
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </label>
          </div>
          <div className="userDetailsEditItems">
            <label>
              Email:
              <input
                type="email"
                value={editedEmail}
                onChange={(e) => setEditedEmail(e.target.value)}
              />
            </label>
          </div>
          <div className="userDetailsEditItems">
            <label>
              Password:
              <input
                type="password"
                value={editedPassword}
                onChange={(e) => setEditedPassword(e.target.value)}
              />
            </label>
          </div>
          <div>
            <button onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </div>
      </div>
    </userProfile>
  );
}

export default UserProfile;
