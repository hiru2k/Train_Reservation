/*
 * Filename: CreateTraveler.jsx
 * Description: Contains the UI and functionality for creating traveler accoounts by travel agents
 * Author: Hiruni Mudannayake
 */
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../DefaultHeader";
import "./createTraveler.css";
import BackgroundImage from "../../../../public/assets/create_traveler2.jpg";

function CreateTraveler() {
  const [role] = useState("User");
  const [status] = useState("Pending");
  const formik = useFormik({
    initialValues: {
      Username: "",
      NIC: "",

      Email: "",
      Password: "",
      Phone: "",
    },
    validationSchema: Yup.object({
      Username: Yup.string().required("Username is required"),
      NIC: Yup.string().required("NIC is required"),

      Email: Yup.string()
        .email("Invalid Email address")
        .required("Email is required"),
      Password: Yup.string().required("Password is required"),
      Phone: Yup.string()
        .required("Phone number is required")
        .matches(/^\d{10}$/, "Phone number must be 10 digits"),
    }),
    onSubmit: (values, { resetForm }) => {
      values.Role = role;
      values.Status = status; //append the role to valus before sending to backend
      axiosInstance
        .post("/EndUser/register", values)
        .then((response) => {
          if (response.data.status == "200") {
            alert("You have successfully registered");
            resetForm();
          } else if (response.data.status == "401") {
            alert("User already exists");
          } else if (response.data.status == "405") {
            alert("Admin access denied");
          } else {
            alert(response.message);
          }
        })
        .catch((error) => {
          console.error("Error occurred while registering user:", error);
        });
    },
  });

  const handleNICChange = (e) => {
    const nicValue = e.target.value;
    formik.setFieldValue("NIC", nicValue);
    formik.setFieldValue("Password", nicValue); // Set Password field to NIC value
  };

  return (
    <createTraveler>
      <div className="background">
        <div className="form">
          <h2>Create traveler account</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="formRow">
              <div>
                <input
                  className="inputsInRow"
                  type="text"
                  placeholder="Username"
                  {...formik.getFieldProps("Username")}
                />
                {formik.touched.Username && formik.errors.Username ? (
                  <div className="error">{formik.errors.Username}</div>
                ) : null}
              </div>
              <div>
                <input
                  className="inputsInRow"
                  placeholder="NIC"
                  type="text"
                  {...formik.getFieldProps("NIC")}
                  onChange={handleNICChange}
                />
                {formik.touched.NIC && formik.errors.NIC ? (
                  <div className="error">{formik.errors.NIC}</div>
                ) : null}
              </div>
            </div>
            <div>
              <input
                className="inputPassword"
                type="Password"
                placeholder="Password"
                {...formik.getFieldProps("Password")}
              />
              {formik.touched.Password && formik.errors.Password ? (
                <div className="error">{formik.errors.Password}</div>
              ) : null}
            </div>
            <div className="formRow">
              <div>
                <input
                  className="inputsInRow"
                  type="Email"
                  placeholder="Email"
                  {...formik.getFieldProps("Email")}
                />
                {formik.touched.Email && formik.errors.Email ? (
                  <div className="error">{formik.errors.Email}</div>
                ) : null}
              </div>
              <div>
                <input
                  className="inputsInRow"
                  type="Phone"
                  placeholder="Phone"
                  {...formik.getFieldProps("Phone")}
                />
                {formik.touched.Phone && formik.errors.Phone ? (
                  <div className="error">{formik.errors.Phone}</div>
                ) : null}
              </div>
            </div>
            <div>
              <button type="submit">Create</button>
            </div>
          </form>
        </div>
        <ul>
          <li>
            {" "}
            <img src={BackgroundImage} alt="" />
          </li>
        </ul>
      </div>
    </createTraveler>
  );
}

export default CreateTraveler;
