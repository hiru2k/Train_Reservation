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
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

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
    // Check if new password matches the confirmed password
    if (newPassword !== confirmNewPassword) {
      alert("New password and confirm password do not match.");
      return;
    }

    axiosInstance
      .put(`User/profile/${user.nic}`, {
        updatedUser: {
          username: editedName,
          email: editedEmail,
        },
        currentPassword: currentPassword,
        newPassword: newPassword,
      })
      .then((response) => {
        if (response.data.status == "200") {
          alert("Successfully updated");
        } else if (response.data.status == "201") {
          alert("Content is changed");
        } else {
          alert(
            "Failed to update user details. Please check your current password."
          );
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
            {user.phone}
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
              Current Password:
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="userDetailsEditItems">
            <label>
              New Password:
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
          </div>
          <div className="userDetailsEditItems">
            <label>
              Confirm New Password:
              <input
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
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
