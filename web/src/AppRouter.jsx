import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/mainpages/auth/Login";
import BookingsHome from "./components/mainpages/ticket-booking";
import NewReservation from "./components/mainpages/ticket-booking/new-reservation";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/bookings" element={<BookingsHome />} />
        <Route path="/bookings/add" element={<NewReservation />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
