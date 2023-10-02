import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../DefaultHeader";

const EndUserProfile = () => {
  const { nic } = useParams();
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isStatusEditable, setIsStatusEditable] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/EndUser/oneUser/${nic}`)
      .then((response) => {
        setUser(response.data.user);
        setEditedUser(response.data.user);
        setIsStatusEditable(response.data.accRole == "Back Officer");
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [nic]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleUpdateUser = () => {
    axiosInstance
      .put(`/EndUser/profile/${nic}`, editedUser)
      .then((response) => {
        if (response.data.status == "200") {
          alert("Successfully updated");
        } else if (response.data.status == "201") {
          alert("Content is not changed");
        }
      })
      .catch((error) => {
        console.error("Error updating user details:", error);
      });
  };
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Useddr Details</h2>
      <p>
        <strong>NIC:</strong> {user?.nic}
      </p>
      <div>
        <strong>Status:</strong>
        {isStatusEditable ? (
          <div>
            <label>
              <input
                type="radio"
                name="status"
                value="Pending"
                checked={editedUser.status === "Pending"}
                onChange={handleInputChange}
              />
              Pending
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Active"
                checked={editedUser.status === "Active"}
                onChange={handleInputChange}
              />
              Active
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="Deactive"
                checked={editedUser.status === "Deactive"}
                onChange={handleInputChange}
              />
              Deactive
            </label>
          </div>
        ) : (
          editedUser?.status
        )}
      </div>

      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={editedUser.username}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={editedUser.email}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="phone">Contact No:</label>
        <input
          type="name"
          id="phone"
          name="phone"
          value={editedUser.phone}
          onChange={handleInputChange}
        />
      </div>
      <button onClick={handleUpdateUser}>Update</button>
    </div>
  );
};

export default EndUserProfile;
