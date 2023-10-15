import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Breadcrumb } from "react-bootstrap";
import Layout from "../../../layout";
import trainData from "./trainData";
import stationData from "./stationData";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const currencies = ["USD", "EUR", "GBP"];

export default function NewReservation() {
  const navigate = useNavigate(); 

  const [formData, setFormData] = useState({
    id: "",
    trainName: "",
    departureStation: "",
    arrivalStation: "",
    seatNumber: "",
    passengerName: "",
    passengerAddress: "",
    emergencyContact: "",
    nic: "",
    status: "PENDING",
    fare: "",
    currency: "USD",
    selectedSeats: [],
    maxSeatNumber: 0,
    bookedDate: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const storedBookingData = JSON.parse(localStorage.getItem("booking"));
    if (storedBookingData) {
      const selectedTrain = trainData.find(
        (train) => train.id === storedBookingData.trainID
      );
      if (selectedTrain) {
        const bookedTimeDate = storedBookingData.bookedDate.substring(0, 10);
        const bookedTimeTime = storedBookingData.bookedDate.substring(11, 16);

        const startTimeDate = storedBookingData.startTime.substring(0, 10);
        const startTimeTime = storedBookingData.startTime.substring(11, 16);
      
        const endTimeDate = storedBookingData.endTime.substring(0, 10);
        const endTimeTime = storedBookingData.endTime.substring(11, 16);

        const bookedDateTime = bookedTimeDate + " " + bookedTimeTime;
        const startDateTime = startTimeDate + " " + startTimeTime;
        const endDateTime = endTimeDate + " " + endTimeTime;

        setFormData({
          ...storedBookingData,
          maxSeatNumber: selectedTrain.maxSeatNumber,
          bookedDate: bookedDateTime,
          startTime: startDateTime,
          endTime: endDateTime,
        });
      }
    } else {
      setFormData({
        trainName: "",
        departureStation: "",
        arrivalStation: "",
        passengerName: "",
        passengerAddress: "",
        emergencyContact: "",
        nic: "",
        status: "PENDING",
        fare: "",
        currency: "USD",
        selectedSeats: [],
        maxSeatNumber: 0,
        bookedDate: "",
        startTime: "",
        endTime: "",
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTrainChange = (e) => {
    const selectedTrainName = e.target.value;
    // Find the selected train from the train data
    const selectedTrain = trainData.find(
      (train) => train.name === selectedTrainName
    );
    if (selectedTrain) {
      setFormData({
        ...formData,
        trainName: selectedTrain.name,
        maxSeatNumber: selectedTrain.maxSeatNumber,
        selectedSeats: [],
      });
    }
  };

  const handleSeatChange = (e) => {
    const { value } = e.target;
    const updatedSelectedSeats = [...formData.selectedSeats];

    if (formData.selectedSeats.includes(parseInt(value))) {
      const seatIndex = updatedSelectedSeats.indexOf(parseInt(value));
      updatedSelectedSeats.splice(seatIndex, 1);
    } else if (updatedSelectedSeats.length < 4) {
      updatedSelectedSeats.push(parseInt(value));
    }

    setFormData({ ...formData, selectedSeats: updatedSelectedSeats });
  };

  const handleSubmit = async (formData) => {
    // Before submitting, update the formData status to "APPROVED"
    const updatedFormData = { ...formData, status: "APPROVED" };
    console.log("updatedFormData", updatedFormData);

    var response = null;

    try {
      if (formData) {
        // Send the updatedFormData to your backend API using Axios
        response = await axios.post(
          `https://localhost:7103/api/Reservation/updateReservation/${formData.id}`,
          updatedFormData
        );
      } else {
        response = await axios.post(
          "https://localhost:7103/api/Reservation/newReservation",
          updatedFormData
        );
      }

      // Handle success, e.g., show a success message or redirect
      console.log("Response from the server:", response.data);

      // Redirect to /bookings page after successful submission
      
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error("Error:", error);
      // Handle the error, show an error message to the user, etc.
    }
    localStorage.removeItem("booking");
    navigate("/bookings");
  };

  return (
    <Layout>
      <Container className="my-5">
        <Breadcrumb>
          <Breadcrumb.Item href="/bookings">Reservations</Breadcrumb.Item>
          <Breadcrumb.Item active>New Reservation</Breadcrumb.Item>
        </Breadcrumb>
        <h1 className="text-center">New Reservation</h1>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="trainName">
                <Form.Label>Train Name</Form.Label>
                <Form.Control
                  as="select"
                  name="trainName"
                  value={formData.trainName}
                  onChange={handleTrainChange}
                  required
                >
                  <option value="">Select Train</option>
                  {trainData.map((train, index) => (
                    <option key={index} value={train.name}>
                      {train.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="departureStation">
                <Form.Label>Departure Station</Form.Label>
                <Form.Control
                  as="select"
                  name="departureStation"
                  value={formData.departureStation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Station</option>
                  {stationData.map((station, index) => (
                    <option key={index} value={station.name}>
                      {station.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="arrivalStation">
                <Form.Label>Arrival Station</Form.Label>
                <Form.Control
                  as="select"
                  name="arrivalStation"
                  value={formData.arrivalStation}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Station</option>
                  {stationData.map((station, index) => (
                    <option key={index} value={station.name}>
                      {station.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="emergencyContact">
                <Form.Label>Emergency Contact</Form.Label>
                <Form.Control
                  type="text"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="nic">
                <Form.Label>NIC</Form.Label>
                <Form.Control
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="nic">
                <Form.Label>Booked Date</Form.Label>
                <Form.Control
                  type="text"
                  name="nic"
                  value={formData.bookedDate}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
              <Form.Group controlId="nic">
                <Form.Label>Starting Date & Time</Form.Label>
                <Form.Control
                  type="text"
                  name="nic"
                  value={formData.startTime}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="passengerName">
                <Form.Label>Passenger Name</Form.Label>
                <Form.Control
                  type="text"
                  name="passengerName"
                  value={formData.passengerName}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="passengerAddress">
                <Form.Label>Passenger Address</Form.Label>
                <Form.Control
                  type="text"
                  name="passengerAddress"
                  value={formData.passengerAddress}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="fare">
                <Form.Label>Fare</Form.Label>
                <Form.Control
                  type="number"
                  name="fare"
                  value={formData.fare}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="currency">
                <Form.Label>Currency</Form.Label>
                <Form.Control
                  as="select"
                  name="currency"
                  value={formData.currency}
                  onChange={handleChange}
                  required
                >
                  {currencies.map((currency, index) => (
                    <option key={index} value={currency}>
                      {currency}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="seatsNeeded">
                <Form.Label>Seats Needed</Form.Label>
                <Form.Control
                  type="number"
                  name="seatsNeeded"
                  value={formData.seatsNeeded}
                  onChange={handleChange}
                  required
                />
              </Form.Group>
              <Form.Group controlId="nic">
                <Form.Label>Ending Date & Time</Form.Label>
                <Form.Control
                  type="text"
                  name="nic"
                  value={formData.endTime}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="selectedSeats" className="my-4">
            <Form.Label
              className="mb-3"
              style={{ fontSize: "1.2rem", fontWeight: "bold" }}
            >
              Select Seats
            </Form.Label>
            <div className="d-flex flex-wrap justify-content-start">
              {Array.from({ length: formData.maxSeatNumber }, (_, index) => (
                <div className="p-2">
                  <Form.Check
                    key={index}
                    type="checkbox"
                    id={`S${index + 1}`}
                    label={`S${index + 1}`}
                    name="selectedSeats"
                    value={index + 1}
                    onChange={handleSeatChange}
                    disabled={
                      formData.selectedSeats.length >= 4 &&
                      !formData.selectedSeats.includes(index + 1)
                    }
                    style={{ fontSize: "1rem", fontWeight: "500" }}
                  />
                </div>
              ))}
            </div>
            <Form.Text
              className="text-muted my-4"
              style={{ fontSize: "0.9rem" }}
            >
              Selected {formData.selectedSeats.length} out of 4 seats.
            </Form.Text>
            <Form.Text
              className="text-muted my-4 mx-4"
              style={{ fontSize: "0.9rem" }}
            >
                {formData.selectedSeats && Array.isArray(formData.selectedSeats)
                  ? formData.selectedSeats.join(", ")
                  : "N/A"}
            </Form.Text>
          </Form.Group>

          <div className="text-center my-5">
            <Button type="submit" variant="primary">
              Submit
            </Button>
          </div>
        </Form>
      </Container>
    </Layout>
  );
}
