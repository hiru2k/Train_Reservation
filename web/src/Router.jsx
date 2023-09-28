import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import BrowserRouter and Route from react-router-dom

import Login from "./components/mainpages/auth/Login";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />{" "}
        {/* Use "element" instead of "component" */}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
