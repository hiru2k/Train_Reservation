import React, { useState, useEffect } from "react";
import Switch from "react-switch"; // Import the react-switch component
import axiosInstance from "../../../DefaultHeader";
import { useNavigate } from "react-router-dom";
const ToggleSwitch = ({ isActive, onToggle }) => {
  return (
    <Switch
      onChange={onToggle}
      checked={isActive}
      onColor="#86d3ff"
      onHandleColor="#2693e6"
      handleDiameter={20}
      uncheckedIcon={false}
      checkedIcon={false}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
      height={15}
      width={40}
    />
  );
};

const TravelerList = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/EndUser/getAllUsers")
      .then((response) => {
        // Ensure that each user object has the 'isActive' property
        const usersWithActiveFlag = response.data.map((user) => ({
          ...user,
          isActive: true, // You can set a default value or get it from the API response if available
        }));
        setUsers(usersWithActiveFlag);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  const handleNICClick = (nic) => {
    navigate(`/endUserProfile/${nic}`);
    // axiosInstance
    // .get(`/EndUser/oneUser/${nic}`)
    //.then((response) => {
    // console.log(response.data);
    // })
    //.catch((error) => {
    // console.error("Error fetching user details:", error);
    // });
  };

  return (
    <div>
      <h2>User List</h2>
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
                style={{ cursor: "pointer" }}
              >
                {user.nic}
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TravelerList;
