import { useState } from "react";
import { Container, Card, Nav, Tab, Button } from "react-bootstrap";
import BookingCard from "./booking-card";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

BookingList.propTypes = {
  bookingsData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default function BookingList({ bookingsData }) {
  const [tabValue, setTabValue] = useState(0);

  const filterBookingsByStatus = (status) =>
    bookingsData.filter((booking) => booking.status === status);

  const renderBookings = (bookings) =>
    bookings.map((booking) => (
      <BookingCard key={booking.id} booking={booking} />
    ));

  return (
    <Container fluid className="my-4">
      <Card bg="light" border="primary">
        <Card.Body>
          <h1 className="text-center font-weight-bold mb-4">
            BOOKING REQUESTS
          </h1>
          <div className="d-flex justify-content-end">
            <Link
              to={{
                pathname: "/bookings/add",
              }}
            >
              <Button variant="success" className="my-3">
                Add New Reservation
              </Button>
            </Link>
          </div>
          <Tab.Container
            activeKey={tabValue}
            onSelect={(key) => setTabValue(key)}
          >
            <Nav variant="tabs" className="mb-2">
              <Nav.Item>
                <Nav.Link eventKey={0} className="text-primary">
                  Pending
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={1} className="text-primary">
                  Reserved
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={2} className="text-primary">
                  Rejected
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Tab.Content>
              <Tab.Pane eventKey={0}>
                {renderBookings(filterBookingsByStatus("PENDING"))}
              </Tab.Pane>
              <Tab.Pane eventKey={1}>
                {renderBookings(filterBookingsByStatus("APPROVED"))}
              </Tab.Pane>
              <Tab.Pane eventKey={2}>
                {renderBookings(filterBookingsByStatus("REJECTED"))}
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Card.Body>
      </Card>
    </Container>
  );
}
