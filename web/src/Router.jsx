import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import BrowserRouter and Route from react-router-dom

import Login from "./components/mainpages/auth/Login";
import CreateUser from "./components/mainpages/admin/CreateUser";
import UserProfile from "./components/mainpages/common/UserProfile";
import CreateTravaler from "./components/mainpages/travelAgent/CreateTravaler";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/createTraveler" element={<CreateTravaler />} />

        {}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
