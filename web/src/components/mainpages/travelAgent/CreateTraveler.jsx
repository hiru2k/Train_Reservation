//Create traveler account by travel agent
import React, { useState } from "react";

function CreateTraveler() {
  // Define state variables to store user input
  const [name, setName] = useState("");
  const [nic, setNic] = useState("");
  const [email, setEmail] = useState("");

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a user object with the collected data
    const user = {
      name: name,
      nic: nic,

      email: email,
      password: nic, // Set NIC as the password
    };

    // You can perform further actions here, such as sending the user data to a server
    // For demonstration purposes, we'll log the user object to the console
    console.log(user);

    // Clear the form fields
    setName("");
    setNic("");

    setEmail("");
  };

  return (
    <div>
      <h2>Create Traveler</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>NIC :</label>
          <input
            type="text"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
}

export default CreateTraveler;
