//View and Update Back Officer and Travel Agent Profiles by them selves
import React, { useState } from "react";

function UserProfile() {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    password: "********",
    nic: "12345", // You can include additional properties as needed
    role: "User",
  };
  // Define state variables to manage the editable fields
  const [editedName, setEditedName] = useState(user.name);
  const [editedEmail, setEditedEmail] = useState(user.email);
  const [editedPassword, setEditedPassword] = useState(user.password);

  // Function to handle the submission of edited fields
  const handleSaveChanges = () => {
    // You can perform actions here to save the edited fields to a server or update the user object.
    // For this example, we will simply update the local state with the edited values.
    user.name = editedName;
    user.email = editedEmail;
    user.password = editedPassword;

    // You can also send an API request to save the changes on the server.
    // Example: axios.put('/api/updateUser', user).then(response => { ... });

    alert("Changes saved successfully!");
  };

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        <strong>Name:</strong>
        {user.name}
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
