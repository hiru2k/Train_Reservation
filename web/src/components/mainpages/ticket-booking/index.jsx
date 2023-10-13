import { Container } from "react-bootstrap";
import Layout from "../../../layout";
import BookingList from "./bookings";
import bookingsData from "./bookingsData";

export default function BookingsHome() {
  return (
    <Layout>
      <Container>
        <BookingList bookingsData={bookingsData} />
      </Container>
    </Layout>
  );
}
