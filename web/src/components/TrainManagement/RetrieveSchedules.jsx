/*
* Filename: RetrieveSchedule.jsx
* Description: contains ui functionality for retrieving train schedules
* Author: Sathinka Wijesinghe
*/

import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

import img1 from "../../../src/images/train.png";

import { Link } from "react-router-dom";
import "./slidebar.css";
import NavbarTM from "./NavBarTM";

function TrainShedules() {
  const navigate = useNavigate();
  const handleAddTrainClick = () => {
    navigate("/trainShedules");
  };

  const handleAddTrainClickB = () => {
    navigate("/trainForm");
  };
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    // Fetch trains when the component mounts
    fetch("https://localhost:7103/api/train/")
      .then((response) => response.json())
      .then((data) => setTrains(data))
      .catch((error) => console.error("Error:", error));
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  // Slider settings
  const sliderSettings = {
    infinite: true,
    slidesToShow: 2, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    variableWidth: true, // Allows each slide to have variable width
  };

  return (
    <div>
      <NavbarTM />
      <div className="container mt-5">
        <Row>
   

          <Col sm={12}>
            <h1 className="text-center mb-4">Train Details</h1>
            <hr></hr>
            <div className="row">
              {trains.map((train) => (
                <div key={train.Id} className="col-md-6 mb-3">
                  <div className="list-group">
                    <Link
                      to={`/trainDetails/${train.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <li className="list-group-item" variant="danger">
                        <Row>
                          <Col sm={3}>
                            <img
                              src={img1}
                              alt={`Profile of ${train.trainName}`}
                              className="img-thumbnail rounded-circle mb-2"
                              width="100"
                              height="100"
                            />
                          </Col>

                          <Col sm={6}>
                            <Row>
                              <Col sm={6}>
                                <h5 className="mb-2">
                                  <strong>Train Name:</strong>
                                </h5>
                                <p className="mb-2">
                                  <strong>Start Station:</strong>
                                </p>
                                <p>
                                  <strong>End Station:</strong>
                                </p>
                                <p>
                                  <strong>Time:</strong>
                                </p>
                              </Col>

                              <Col>
                                <h5 className="mb-2">{train.trainName}</h5>
                                <p className="mb-2">{train.startStation}</p>
                                <p>{train.endStation}</p>
                                <p>{train.startTime}</p>
                              </Col>
                            </Row>
                          </Col>

                          <Col className="d-flex justify-content-center align-items-center">
                            {/* <Button variant="success">{traveler.accountStatus}</Button> */}

                            {train.trainStatus === "Active" ? (
                              <Button variant="primary" className="ms-2">
                                Active
                              </Button>
                            ) : (
                              <Button variant="danger" className="ms-2">
                                Not Active
                              </Button>
                            )}
                          </Col>
                        </Row>
                      </li>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default TrainShedules;
