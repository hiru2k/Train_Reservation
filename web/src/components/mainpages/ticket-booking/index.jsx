import React, { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import Layout from "../../../layout";
import BookingList from "./bookings";
import axios from 'axios';

export default function BookingsHome() {
  const [bookingsData, setBookingsData] = useState([]);

  useEffect(() => {
    // Fetch the data from the backend
    async function fetchBookings() {
      try {
        const response = await axios.get('https://localhost:7103/api/Reservation/getAllReservations');
        setBookingsData(response.data);
      } catch (error) {
        console.error('Error fetching the bookings:', error);
        // Handle the error. For example, you might want to set some state
        // to show an error message to the user.
      }
    }

    fetchBookings();
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  return (
    <Layout>
      <Container>
        <BookingList bookingsData={bookingsData} />
      </Container>
    </Layout>
  );
}
