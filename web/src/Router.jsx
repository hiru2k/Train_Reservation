import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useUserContext } from "./UserContext";

import Login from "./components/mainpages/auth/Login";
import CreateUser from "./components/mainpages/admin/CreateUser";
import UserProfile from "./components/mainpages/common/UserProfile";
import CreateTraveler from "./components/mainpages/travelAgent/CreateTraveler";
import TravelerList from "./components/mainpages/common/TravelerList";

import EndUserProfile from "./components/mainpages/common/EndUserProfile";
import BackOfficerHome from "./components/mainpages/backOfficer/BackOfficerHome";
import TravelAgentHome from "./components/mainpages/travelAgent/TravelAgentHome";

import TrainForm from "./components/TrainManagement/CreateShedule";
import TrainShedules from "./components/TrainManagement/RetrieveSchedules";
import TrainDetails from "./components/TrainManagement/TrainDetais";
import EditShedule from "./components/TrainManagement/EditShedule";

function Router() {
  const { role } = useUserContext();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        {role === "Admin" && (
          <Route path="/createUser" element={<CreateUser />} />
        )}
        {role === "Back Officer" && (
          <Route path="/backOfficerHome" element={<BackOfficerHome />} />
        )}
        {role === "Travel Agent" && (
          <Route path="/travelAgentHome" element={<TravelAgentHome />} />
        )}

        {(role === "Back Officer" || role === "Travel Agent") && (
          <>
          
          </>       


        )}

<Route path="/trainForm" element={<TrainForm />} />
        <Route path="/trainShedules" element={<TrainShedules />} />
        <Route path="/trainDetails/:id" element={<TrainDetails />} />
        <Route path="/editShedule/:id" element={<EditShedule />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
