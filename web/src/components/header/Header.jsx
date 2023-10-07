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
          <div>
            <button type="button">
              <a href="/travelAgentHome">Home</a>
            </button>
            <button type="button">
              <a href="/userProfile">Profile</a>
            </button>
            <button type="button">
              <a href="/travelerList">Traveler Management</a>
            </button>
          </div>
        );
      } else if (role === "Back Officer") {
        return (
          <div>
            <button type="button">
              <a href="/backOfficerHome">Home</a>
            </button>
            <button type="button">
              <a href="/userProfile">Profile</a>
            </button>
            <button type="button">
              <a href="/travelerList">Traveler Management</a>
            </button>
          </div>
        );
      }
    }

    return null;
  };

  const renderLoginButton = () => {
    if (isLoggedIn) {
      return (
        <button type="button" onClick={handleLogout}>
          <a href="/login">Logout</a>
        </button>
      );
    }
  };

  return (
    <div className="header">
      <div>
        <h1>Train Booking Management</h1>
      </div>
      <div className="buttons">
        {renderButtons()}
        {renderLoginButton()}
      </div>
    </div>
  );
}
export default Header;
