import React from "react";
import { useAuth } from "../../AuthContext";

function Header() {
  const { isAuthenticated, login, logout } = useAuth();

  const handleLoginClick = () => {
    login(); // Call the login function from the context
  };

  const handleLogoutClick = () => {
    logout(); // Call the logout function from the context
  };

  return (
    <div>
      {isAuthenticated ? (
        <button onClick={handleLogoutClick}>Logout</button>
      ) : (
        <button onClick={handleLoginClick}>Login</button>
      )}
    </div>
  );
}
export default Header;
