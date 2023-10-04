import React from "react";
import Routes from "./Router";
import Header from "./components/header/Header";
import { UserProvider } from "./UserContext";

function App() {
  return (
    <UserProvider>
      <Header />
      <Routes />
    </UserProvider>
  );
}

export default App;
