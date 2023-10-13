import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Import BrowserRouter and Route from react-router-dom

import Login from "./components/mainpages/auth/Login";
import CreateUser from "./components/mainpages/admin/CreateUser";
import UserProfile from "./components/mainpages/common/UserProfile";
import CreateTraveler from "./components/mainpages/travelAgent/CreateTraveler";
import TravelerList from "./components/mainpages/common/TravelerList";
import UpdateTraveler from "./components/mainpages/travelAgent/UpdateTraveler";
import EndUserProfile from "./components/mainpages/common/EndUserProfile";

import TrainForm from "./components/TrainManagement/CreateShedule";
import TrainShedules from "./components/TrainManagement/RetrieveSchedules";
import TrainDetails from "./components/TrainManagement/TrainDetais";
import EditShedule from "./components/TrainManagement/EditShedule";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/createUser" element={<CreateUser />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/createTraveler" element={<CreateTraveler />} />
        <Route path="/travelerList" element={<TravelerList />} />
        <Route path="/updateTraveler" element={<UpdateTraveler />} />
        <Route path="/endUserProfile/:nic" element={<EndUserProfile />} />
        <Route path="/trainForm" element={<TrainForm />} />
        <Route path="/trainShedules" element={<TrainShedules />} />
        <Route path="/trainDetails/:id" element={<TrainDetails />} />
        <Route path="/editShedule/:id" element={<EditShedule />} />


        {}
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
