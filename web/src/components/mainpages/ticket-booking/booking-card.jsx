import { useState } from "react";
import { Card, Button, Collapse, Container, Row, Col } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useNavigate } from "react-router-dom";

BookingCard.propTypes = {
  booking: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default function BookingCard({ booking }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate(); 

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleDeleteBooking = async (booking) => {
    try {
      // Send a DELETE request to your backend API to delete the booking
      await axios.delete(`your_backend_api_url/${booking.id}`);
  
      // Optionally, you can show a success message to the user here
  
      // Redirect to the /bookings page or perform any other necessary actions
      navigate("/bookings");
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error:", error);
      // Handle the error, show an error message to the user, etc.
    }
  };
  

  return (
    <Card className="my-2" bg="light" border="primary">
      <Card.Body onClick={handleExpand} style={{ cursor: "pointer" }}>
        <Container>
          <Card.Title className="font-weight-bold">
            Booking ID: {booking.id}
          </Card.Title>
          <Row>
            <Col>
              <Card.Text className="font-weight-bold">
                Train Name: {booking.trainName}
              </Card.Text>
              <Card.Text className="font-weight-bold">
                Departure Station: {booking.departureStation}
              </Card.Text>
            </Col>
            <Col>
              <Card.Text className="font-weight-bold">
                Seat Numbers:{" "}
                {booking.selectedSeats && Array.isArray(booking.selectedSeats)
                  ? booking.selectedSeats.join(", ")
                  : "N/A"}
              </Card.Text>

              <Card.Text className="font-weight-bold">
                Arrival Station: {booking.arrivalStation}
              </Card.Text>
            </Col>
            <Col xs="auto">
              <Button variant="link" className="p-0" onClick={handleExpand}>
                <FaAngleDown
                  style={{
                    transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </Button>
            </Col>
          </Row>
        </Container>
      </Card.Body>
      <Collapse in={expanded}>
        <Card.Footer bg="info" text="white">
          <Container>
            <Row>
              <Col>
                <Card.Text className="font-weight-bold">
                  Status: {booking.status}
                </Card.Text>
              </Col>
              <Col>
                <Card.Text className="font-weight-bold">
                  Passenger Name: {booking.passengerName}
                </Card.Text>
              </Col>
              <Col xs="auto">
                <Card.Text className="font-weight-bold">
                  Fare: {booking.currency} {booking.fare}
                </Card.Text>
              </Col>
            </Row>
            <Row className="mt-2">
              <div className="d-flex justify-content-end">
                {booking.status === "REJECTED" && (
                  <Button 
                  variant="danger" 
                  className="mr-2 mx-1" 
                  onClick={() => {handleDeleteBooking(booking) }}>
                    Delete
                  </Button>
                )}
                {booking.status === "APPROVED" && (
                  <>
                    <Link
                      to={{
                        pathname: "/bookings/add",
                        state: { bookingData: booking },
                      }}
                    >
                      <Button
                        variant="primary"
                        className="mr-2 mx-1"
                        onClick={() => {
                          localStorage.setItem(
                            "booking",
                            JSON.stringify(booking)
                          );
                        }}
                      >
                        Update
                      </Button>
                    </Link>
                  </>
                )}
                {booking.status === "PENDING" && (
                  <>
                    <Link
                      to={{
                        pathname: "/bookings/add",
                        state: { bookingData: booking },
                      }}
                    >
                      <Button
                        variant="primary"
                        className="mr-2 mx-1"
                        onClick={() => {
                          localStorage.setItem(
                            "booking",
                            JSON.stringify(booking)
                          );
                        }}
                      >
                        Approve and Add Reservation
                      </Button>
                    </Link>
                    <Button variant="danger" className="mr-2 mx-1">
                      Reject
                    </Button>
                  </>
                )}
              </div>
            </Row>
          </Container>
        </Card.Footer>
      </Collapse>
    </Card>
  );
}
