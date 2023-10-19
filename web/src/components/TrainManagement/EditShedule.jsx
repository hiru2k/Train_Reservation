/*
 * Filename: EditSchedule.jsx
 * Description: contains ui functionality for editing train schedules
 * Author: Sathinka Wijesinghe
 */
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Swal from "sweetalert2";

function EditShedule() {
  const { id } = useParams();
  const navigate = useNavigate();
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
    number_of_seats: "",
    isReserved: false,
    intermediateStops: [], //Initialize as an array
    seatClasses: [], // Initialize as an array
  });

  const [newStop, setNewStop] = useState([]);
  const [newClass, setNewClass] = useState([]);

  useEffect(() => {
    // Fetch the traveler's data using the provided ID
    fetch(`http://192.168.8.101:5059/api/train/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data); // Update the form data with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else if (name === "intermediateStops") {
      setFormData({
        ...formData,
        intermediateStops: value.split(",").map((stop) => stop.trim()), // Split comma-separated values into an array
      });
    } else if (name === "seatClasses") {
      setFormData({
        ...formData,
        seatClasses: value.split(",").map((cls) => cls.trim()), // Split comma-separated values into an array
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //checking the train status
    if (formData.trainStatus === "Active") {
      //swal error message
      Swal.fire({
        icon: "error",
        title: "Train Update Error",
        text: "Cannot update an Active train.",
      });
      return;
    }

    console.log(formData);

    try {
      const response = await fetch(
        `http://192.168.8.101:5059/api/train/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        Swal.fire("Success", "Data Updated successfully!", "success");
        navigate(`/trainDetails/${id}`);
      } else {
        Swal.fire("Error", "Error submitting data.", "error");
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Error", "An error occurred while updating the data.", "error");
    }
  };

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="card p-4">
              {}
              <div className="text-center">
                {}
                <h2 className="mb-4">
                  <i className="fas fa-train"></i> Update Train
                </h2>
              </div>
              <hr></hr>
              <form onSubmit={handleSubmit}>
                {}

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
                        value={formData.trainNumber}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="startStation" className="form-label">
                        <strong>Start Station</strong>
                      </label>
                      <select
                        className="form-select"
                        id="startStation"
                        name="startStation"
                        value={formData.startStation}
                        onChange={handleChange}
                      >
                        <option value="">Select a Start Station</option>
                        <option value="Matara">Matara</option>
                        <option value="Trincomalee">Trincomalee</option>
                        <option value=" Batticaloa"> Batticaloa</option>
                        <option value="Vavuniya">Vavuniya</option>
                        <option value="Jaffna">Jaffna</option>
                        {/* Add more options as needed */}
                      </select>
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
                        value={formData.startTime}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="dateAndTime" className="form-label">
                        <strong>Date and Time</strong>
                      </label>
                      <input
                        type="datetime-local"
                        className="form-control"
                        id="dateAndTime"
                        name="dateAndTime"
                        value={formData.dateAndTime}
                        onChange={handleChange}
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
                        value={formData.seatClasses}
                        onChange={handleChange}
                        rows={4} // Adjust the number of rows as needed
                      />
                    </div>

                    {}
                  </Col>

                  <Col>
                    {/* Train Name */}
                    <div className="mb-3">
                      <label htmlFor="trainName" className="form-label">
                        <strong>Train Name</strong>
                      </label>
                      <select
                        className="form-select"
                        id="trainName"
                        name="trainName"
                        value={formData.trainName}
                        onChange={handleChange}
                      >
                        <option value="">Select a Train Name</option>
                        <option value="Kandy Express">Kandy Express</option>
                        <option value="Intercity Express">
                          Intercity Express
                        </option>
                        <option value="Udarata Menike">Udarata Menike</option>
                        <option value="Southern Express">
                          Southern Express
                        </option>
                        <option value="Ruhunu Kumari">Ruhunu Kumari</option>
                        {/* Add more options as needed */}
                      </select>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="endStation" className="form-label">
                        <strong> End Station</strong>
                      </label>
                      <select
                        className="form-select"
                        id="endStation"
                        name="endStation"
                        value={formData.endStation}
                        onChange={handleChange}
                      >
                        <option value="">Select an End Station</option>
                        <option value="Colombo">Colombo</option>
                        <option value="Kandy">Kandy</option>
                        <option value="Badulla">Badulla</option>
                        <option value="Jaffna">Jaffna</option>
                        <option value="Anuradhapura">Anuradhapura</option>
                        {/* Add more options as needed */}
                      </select>
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
                        value={formData.endTime}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="number_of_seats" className="form-label">
                        <strong>Number of Seats</strong>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="number_of_seats"
                        name="number_of_seats"
                        value={formData.number_of_seats}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="intermediateStops" className="form-label">
                        <strong> Intermediate Stops</strong>
                      </label>
                      <textarea
                        className="form-control"
                        id="intermediateStops"
                        name="intermediateStops"
                        value={formData.intermediateStops}
                        onChange={handleChange}
                        rows={4}
                      />
                    </div>

                    {}
                  </Col>
                </Row>

                {}
                {}
                {}

                {}
                {}
                {}
                <hr></hr>

                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg btn-block mt-3"
                  >
                    Update Train Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditShedule;
