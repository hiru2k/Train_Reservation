/*
 * Filename: Header.jsx
 * Description: Contains role based header rendering based on the data in the global state
 * Author: Hiruni Mudannayake
 */
import React from "react";
import "./header.css";
import { useUserContext } from "../../UserContext";

function Header() {
  const { isLoggedIn, role, setIsLoggedIn, setRole } = useUserContext();

  const handleLogout = () => {
    localStorage.removeItem("token"); //remove token when loggout
    setIsLoggedIn(false); //update the global state
    setRole(null);
  };

  const renderButtons = () => {
    if (isLoggedIn) {
      if (role === "Travel Agent") {
        return (
          <div className="buttonGroup">
            <a href="/createTraveler">Home</a>

            <a href="/userProfile">Profile</a>

            <a href="/travelerList">Traveler Management</a>
            <a href="/createTraveler">Traveler Creation</a>
          </div>
        );
      } else if (role === "Back Officer") {
        return (
          <div className="buttonGroup">
            <a href="/backOfficerHome">Home</a>

            <a href="/userProfile">Profile</a>

            <a href="/travelerList">Traveler Management</a>
            <a href="/trainForm">Train Management</a>
          </div>
        );
      }
    }

    return null;
  };

  const renderHeader = () => {
    if (isLoggedIn) {
      if (role == "Admin") {
        return <h1 className="heading">Admin Panel</h1>;
      }
      if (role == "Back Officer") {
        return <h1 className="heading">Backofficer Panel</h1>;
      }
      if (role == "Travel Agent") {
        return <h1 className="heading">Travel Agent Panel</h1>;
      }
    } else {
      return <h1 className="heading">Train Booking Management</h1>;
    }
  };

  const renderLoginButton = () => {
    if (isLoggedIn) {
      return (
        <a onClick={handleLogout} href="/login">
          Logout
        </a>
      );
    }
  };

  return (
    <header>
      <ul>
        <div>{renderHeader()}</div>

        <div className="items">
          <li>{renderButtons()}</li>
          <li>{renderLoginButton()}</li>
        </div>
      </ul>
    </header>
  );
}
export default Header;
