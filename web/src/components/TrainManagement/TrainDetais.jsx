import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col, Form } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";

function TrainDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trainNumber, setTrainNumber] = useState("");
  const [trainName, setTrainName] = useState("");
  const [trainType, setTrainType] = useState("");
  const [travelDuration, setTravelDuration] = useState("");
  const [className, setClassName] = useState("");
  const [startStation, setStartStation] = useState("");

  const [endStation, setEndStation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [trainStatus, setTrainStatus] = useState("");
  const [dateAndTime, setDateAndTime] = useState("");
  const [isReserved, setIsReserved] = useState(false);
  const [intermediateStops, setIntermediateStops] = useState([]);
  const [seatClasses, setSeatClasses] = useState([]); // Initialize as an array
  const [numberOfSeats, setNumberOfSeats] = useState("");

  const [isActivated, setIsActivated] = useState(false);

  const [reservation, setReservation] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const displayRows = showAll ? reservation : reservation.slice(0, 4);

  const [formData, setFormData] = useState({
    trainNumber: "",
    trainName: "",
    trainType: "",
    travelDuration: "",
    className: "",
    startStation: "",
    endStation: "",
    startTime: "",
    endTime: "",
    trainStatus: "",
    dateAndTime: "",
    isReserved: false,
    number_of_seats: "",
    intermediateStops: [],
    seatClasses: [], // Initialize as an array
  });

  useEffect(() => {
    // Fetch user data from the API
    fetch(`http://192.168.8.159:5059/api/train/${id}`)
      .then((response) => response.json())
      .then((data) => {
        // Set the state values with the data from the API response
        setTrainNumber(data.trainNumber);
        setTrainName(data.trainName);
        setTrainType(data.trainType);
        setTravelDuration(data.travelDuration);
        setClassName(data.className);
        setStartStation(data.startStation);
        setEndStation(data.endStation);
        setStartTime(data.startTime);
        setEndTime(data.endTime);
        setTrainStatus(data.trainStatus);
        setDateAndTime(data.dateAndTime);
        setIsReserved(data.isReserved);
        setIntermediateStops(data.intermediateStops);
        setSeatClasses(data.seatClasses);
        setNumberOfSeats(data.number_of_seats);

        setIsActivated(data.trainStatus === "Active" ? true : false);
      })
      .catch((error) => console.error("Error:", error));
  }, []); // T

  /* eslint-disable no-restricted-globals */
  // function deleteTrain(id) {
  //   if (confirm("Are you sure you want to cancel this train?")) {
  //     fetch(`https://localhost:7103/api/train/${id}`, {
  //       method: "DELETE",
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           // Successful deletion, you can perform any desired actions here
  //           alert("Train Cancel successfully");

  //           navigate("/trainShedules");
  //         } else {
  //           alert("Failed to delete train");
  //         }
  //       })
  //       .catch((error) => {
  //         console.error("Error:", error);
  //         alert("An error occurred while deleting the train");
  //       });
  //   }
  // }

  function deleteTrain(id) {
    if (reservation.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Train Cancellation Error",
        text: "This train has reservations and cannot be canceled.",
      });
      return; // Do not proceed with deletion
    }

    Swal.fire({
      title: "Confirm Train Cancellation",
      text: "Are you sure you want to cancel this train?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://192.168.8.159:5059/api/train/${id}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              Swal.fire("Success", "Train Cancelled successfully", "success");
              navigate("/trainShedules");
            } else {
              Swal.fire("Error", "Failed to delete train", "error");
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            Swal.fire(
              "Error",
              "An error occurred while deleting the train",
              "error"
            );
          });
      }
    });
  }

  const handleAccountStatusChange = () => {
    // Toggle the account status state
    setIsActivated(!isActivated);

    // Convert the state to the string format expected by the API
    const newAccountStatus = isActivated ? "Inactive" : "Active";

    // Send a PUT request to update the account status in the API
    fetch(`https://localhost:7103/api/train/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        trainNumber: trainNumber,
        trainName: trainName,
        trainType: trainType,
        travelDuration: travelDuration,
        className: className,
        startStation: startStation,
        endStation: endStation,
        startTime: startTime,
        endTime: endTime,
        trainStatus: newAccountStatus,
        dateAndTime: dateAndTime,
        isReserved: isReserved,
        number_of_seats: numberOfSeats,
        intermediateStops: intermediateStops,
        seatClasses: seatClasses,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // console.log("Account status updated successfully");
          // alert("Train Status Updated successfully");
          Swal.fire({
            icon: "success",
            title: "Train Status Updated successfully",
          });
          console.log("Account status updated successfully");
        } else {
          // console.error("Failed to update account status");
          Swal.fire({
            icon: "error",
            title: "Failed to update account status",
          });
          console.error("Failed to update account status");
        }
      })
      .catch((error) => {
        console.error("Error updating account status:", error);
      });
  };

  // useEffect(() => {
  //   const url = 'https://localhost:7103/api/Reservation/getReservationsByTrainName/' + trainName + '/';

  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setReservation(data);
  //     })
  //     .catch((error) => console.error('Error fetching data: ', error));
  // }, []); // The empty dependency array ensures the effect runs once when the component mounts

  useEffect(() => {
    const delay = 1000; // 2 seconds (2000 milliseconds)
    const url =
      "http://192.168.8.159:5059/api/Reservation/getReservationsByTrainName/" +
      trainName +
      "/";

    const fetchData = () => {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setReservation(data);
        })
        .catch((error) => console.error("Error fetching data: ", error));
    };

    // Use setTimeout to delay fetching the data
    const timeoutId = setTimeout(fetchData, delay);

    // Clear the timeout if the component unmounts before the 2 seconds
    return () => clearTimeout(timeoutId);
  }, [trainName]); // Include any dependencies you need in the array

  return (
    <div>
     
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card p-4">
              {/* <h2 className="mb-4">Add New Train</h2> */}
              <div className="text-center">
                {/* <h2 className="mb-4">Add New Train</h2> */}
                <h2 className="mb-4">
                  <i className="fas fa-train"></i> Train Details
                </h2>
              </div>
              <hr></hr>
              <form>
                {/* Train Number */}

                <Row>
                  <Col>
                    <div className="mb-3">
                      <label htmlFor="trainNumber" className="form-label">
                        <strong>Train Number</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="trainNumber"
                        name="trainNumber"
                        value={trainNumber}
                        disabled
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="startStation" className="form-label">
                        <strong>Start Station</strong>
                      </label>
                      {/* <select
                        className="form-select"
                        id="startStation"
                        name="startStation"
                        value={startStation}
                        disabled
                      >
                        <option value="">Select a Start Station</option>
                        <option value="Station 1">Station 1</option>
                        <option value="Station 2">Station 2</option>
                
                      </select> */}
                      <input
                        type="text"
                        className="form-control"
                        id="startStation"
                        name="startStation"
                        value={startStation}
                        disabled
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="startTime" className="form-label">
                        <strong>Start Time</strong>
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        id="startTime"
                        name="startTime"
                        value={startTime}
                        disabled
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="dateAndTime" className="form-label">
                        <strong>Date and Time</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="dateAndTime"
                        name="dateAndTime"
                        value={dateAndTime}
                        disabled
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="seatClasses" className="form-label">
                        <strong>Seat Classes</strong>
                      </label>
                      <textarea
                        className="form-control"
                        id="seatClasses"
                        name="seatClasses"
                        value={intermediateStops.join(",")}
                        rows={4} // Adjust the number of rows as needed
                        disabled
                      />
                    </div>
                  </Col>

                  <Col>
                    {/* Train Name */}
                    <div className="mb-3">
                      <label htmlFor="trainName" className="form-label">
                        <strong>Train Name</strong>
                      </label>
                      {/* <select
                        className="form-select"
                        id="trainName"
                        name="trainName"
                        value={trainName}
                        disabled
                      >
                        <option value="">Select a Train Name</option>
                        <option value="Train 1">Train 1</option>
                        <option value="Train 2">Train 2</option>
                     
                      </select> */}
                      <input
                        type="text"
                        className="form-control"
                        id="trainName"
                        name="trainName"
                        value={trainName}
                        disabled
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="endStation" className="form-label">
                        <strong>End Station</strong>
                      </label>
                      {/* <select
                        className="form-select"
                        id="endStation"
                        name="endStation"
                        value={endStation}
                        disabled
                      >
                        <option value="">Select an End Station</option>
                        <option value="Station 1">Station 1</option>
                        <option value="Station 2">Station 2</option>
                       
                      </select> */}
                      <input
                        type="text"
                        className="form-control"
                        id="endStation"
                        name="endStation"
                        value={endStation}
                        disabled
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="endTime" className="form-label">
                        <strong>End Time</strong>
                      </label>
                      <input
                        type="time"
                        className="form-control"
                        id="endTime"
                        name="endTime"
                        value={endTime}
                        disabled
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="numberOfSeats" className="form-label">
                        <strong>Number of Seats</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="numberOfSeats"
                        name="numberOfSeats"
                        value={numberOfSeats}
                        disabled
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="intermediateStops" className="form-label">
                        <strong>Intermediate Stops</strong>
                      </label>
                      <textarea
                        className="form-control"
                        id="intermediateStops"
                        name="intermediateStops"
                        value={intermediateStops}
                        disabled
                        rows={4}
                      />
                    </div>
                  </Col>
                </Row>

                <hr></hr>
                <div>
                  {/* <table className="table">
        <thead>
          <tr>
          <th>NIC</th>
          <th>Passenger Name</th>
       
            <th>Departure Station</th>
            <th>Arrival Station</th>
      
          
        
       
            <th>Fare</th>
            <th>Currency</th>
            <th>Seats Needed</th>
          </tr>
        </thead>
        <tbody>
          {reservation.map((reservationItem, index) => (
            <tr key={index}>
                  <td>{reservationItem.nic}</td>
                  <td>{reservationItem.passengerName}</td>
            
           
              <td>{reservationItem.departureStation}</td>
              <td>{reservationItem.arrivalStation}</td>
           
          
          
          
              <td>{reservationItem.fare}</td>
              <td>{reservationItem.currency}</td>
              <td>{reservationItem.seatsNeeded}</td>
            </tr>
          ))}
        </tbody>
      </table> */}
                  <h2 className="mb-4">
                    <i className="fas fa-book"></i>&nbsp;&nbsp; Reservation
                    Details
                  </h2>
                  {/* <table className="table table-striped table-bordered">
  <thead className="thead-dark">
    <tr>
      <th>NIC</th>
      <th>Passenger Name</th>
      <th>Departure Station</th>
      <th>Arrival Station</th>
      <th>Fare</th>
      <th>Currency</th>
      <th>Seats Needed</th>
    </tr>
  </thead>
  <tbody>
    {reservation.map((reservationItem, index) => (
      <tr key={index}>
        <td>{reservationItem.nic}</td>
        <td>{reservationItem.passengerName}</td>
        <td>{reservationItem.departureStation}</td>
        <td>{reservationItem.arrivalStation}</td>
        <td>{reservationItem.fare}</td>
        <td>{reservationItem.currency}</td>
        <td>{reservationItem.seatsNeeded}</td>
      </tr>
    ))}
  </tbody>
</table> */}

                  <div>
                    <table className="table table-striped table-bordered">
                      <thead className="thead-dark">
                        <tr>
                          <th>NIC</th>
                          <th>Passenger Name</th>
                          <th>Departure Station</th>
                          <th>Arrival Station</th>
                          <th>Fare</th>
                          <th>Currency</th>
                          <th>Seats Needed</th>
                        </tr>
                      </thead>
                      <tbody>
                        {displayRows.map((reservationItem, index) => (
                          <tr key={index}>
                            <td>{reservationItem.nic}</td>
                            <td>{reservationItem.passengerName}</td>
                            <td>{reservationItem.departureStation}</td>
                            <td>{reservationItem.arrivalStation}</td>
                            <td>{reservationItem.fare}</td>
                            <td>{reservationItem.currency}</td>
                            <td>{reservationItem.seatsNeeded}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {reservation.length > 4 && (
                      <button
                        className="btn btn-primary"
                        onClick={() => setShowAll(!showAll)}
                      >
                        {/* {showAll ? 'Show Less' : 'Show More'} */}
                        {showAll ? (
                          <div>
                            <i className="fas fa-angle-double-up"></i>
                            &nbsp;&nbsp;Show Less
                          </div>
                        ) : (
                          <div>
                            <i className="fas fa-angle-double-down"></i>
                            &nbsp;&nbsp;Show More
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                </div>
                <hr></hr>

                <Row>
                  <Col>
                    <div className="col-sm-12 mt-5">
                      <Link
                        to={`/editShedule/${id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <a className="btn btn-primary">
                          <i class="fa fa-edit" aria-hidden="true">
                            &nbsp;&nbsp;Edit Train Shedules
                          </i>{" "}
                        </a>
                      </Link>
                    </div>
                  </Col>

                  <Col>
                    <div className="col-sm-12 mt-5">
                      {/* <button type="button" class="btn btn-danger" onclick="deleteTraveler('${id}')">Delete</button>         */}
                      {/* <button type="button" class="btn btn-danger" onclick={deleteTraveler(`${id}`)}>
  <i class="fa fa-trash" aria-hidden="true"> </i>Delete
</button> */}
                      <button
                        type="button"
                        className="btn btn-danger"
                        onClick={() => deleteTrain(id)}
                      >
                        <i className="fas fa-times" aria-hidden="true">
                          &nbsp;&nbsp;Cancel Train
                        </i>
                      </button>
                    </div>
                  </Col>

                  <Col>
                    <div className="col-sm-12 mt-5">
                      <Form.Check
                        type="switch"
                        id="account-switch"
                        // label={`Account Status: ${isAccountActive ? 'Active' : 'Inactive'}`}
                        checked={isActivated}
                        onChange={handleAccountStatusChange}
                      />

                      {isActivated ? (
                        <p className="text-success">Train is active</p>
                      ) : (
                        <p className="text-danger">Train is inactive</p>
                      )}
                    </div>
                  </Col>
                </Row>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrainDetails;
