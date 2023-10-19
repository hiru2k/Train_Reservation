/*
 * Filename: TravelerList.jsx
 * Description: Contains the UI and functionality for viewing all end travelers in a list and navigating to their profiles
 * Author: Hiruni Mudannayake
 */
import React, { useState, useEffect } from "react";
import axiosInstance from "../../../DefaultHeader";
import { useNavigate } from "react-router-dom";
import "./travelerList.css";

const TravelerList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/EndUser/getAllUsers")
      .then((response) => {
        const usersWithActiveFlag = response.data.map((user) => ({
          ...user,
          isActive: true,
        }));
        setUsers(usersWithActiveFlag);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleNICClick = (nic) => {
    navigate(`/endUserProfile/${nic}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "#005aff";
      case "Deactive":
        return "#c94c4c";
      case "Pending":
        return "black";
      default:
        return "white";
    }
  };

  return (
    <travelerList>
      <div className="background">
        <table>
          <thead>
            <tr>
              <th>NIC</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td
                  onClick={() => handleNICClick(user.nic)}
                  style={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    textDecoration: "underline",
                    textDecorationColor: "grey",
                    textDecorationThickness: "3px",
                  }}
                >
                  {user.nic}
                </td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <div
                    style={{
                      width: "100px",
                      height: "30px",
                      borderRadius: "8px",
                      marginLeft: "150px",
                      fontSize: "16px",
                      color: "white",
                      padding: "2px",
                      backgroundColor: getStatusColor(user.status),
                    }}
                  >
                    {user.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </travelerList>
  );
};

export default TravelerList;
