import React, { useState } from "react";
import Switch from "react-switch"; // Import the react-switch component

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
  const [users, setUsers] = useState([
    { id: 1, name: "User 1", isActive: true },
    { id: 2, name: "User 2", isActive: false },
    { id: 3, name: "User 3", isActive: true },
  ]);

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  const handleToggle = (id) => {
    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, isActive: !user.isActive } : user
    );
    setUsers(updatedUsers);
  };

  return (
    <div>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <ToggleSwitch
                  isActive={user.isActive}
                  onToggle={() => handleToggle(user.id)}
                />
              </td>
              <td>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
                <button>Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TravelerList;
