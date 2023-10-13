import React from "react";
import Routes from "./Router";
import Header from "./components/header/Header";
import { UserProvider } from "./UserContext";
import AppRoutes from "./AppRouter";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <UserProvider>
      <Header />
      <AppRoutes />
      <Routes />
    </UserProvider>
  );
}

export default App;
