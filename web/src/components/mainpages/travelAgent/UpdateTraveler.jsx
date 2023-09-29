import React, { useState } from "react";

const UpdateTraveler = () => {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    NIC: "123456789",
    email: "johndoe@example.com",
    password: "********", // Password should not be stored in plain text for security reasons
  });

  const handleNameChange = (e) => {
    setUserInfo({ ...userInfo, name: e.target.value });
  };

  const handleNICChange = (e) => {
    setUserInfo({ ...userInfo, NIC: e.target.value });
  };

  const handleEmailChange = (e) => {
    setUserInfo({ ...userInfo, email: e.target.value });
  };

  return (
    <div>
      <label>
        Name:
        <input type="text" value={userInfo.name} onChange={handleNameChange} />
      </label>
      <br />
      <label>
        NIC:
        <input type="text" value={userInfo.NIC} onChange={handleNICChange} />
      </label>
      <br />
      <label>
        Email:
        <input
          type="email"
          value={userInfo.email}
          onChange={handleEmailChange}
        />
      </label>
      <br />
      <label>
        Password: {userInfo.password}
        {/* Display password without editing option */}
      </label>
    </div>
  );
};

export default UpdateTraveler;
