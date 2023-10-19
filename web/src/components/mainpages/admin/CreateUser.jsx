/*
 * Filename: CreateUser.jsx
 * Description: Contains the UI and functionality for creating a new backoffice user+travel agent by admin
 * Author: Hiruni Mudannayake
 */
import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "../../../DefaultHeader";
import "./createUser.css";

function UserRegistration() {
  const formik = useFormik({
    initialValues: {
      Username: "",
      NIC: "",
      Role: "",
      Email: "",
      Password: "",
      Phone: "",
    },
    validationSchema: Yup.object({
      Username: Yup.string().required("Username is required"),
      NIC: Yup.string().required("NIC is required"),
      Role: Yup.string().required("Role is required"),
      Email: Yup.string()
        .email("Invalid Email address")
        .required("Email is required"),
      Password: Yup.string().required("Password is required"),
      Phone: Yup.string()
        .required("Phone number is required")
        .matches(/^\d{10}$/, "Phone number must be 10 digits"),
    }),
    onSubmit: (values, { resetForm }) => {
      axiosInstance
        .post("/User/register", values)
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
    <createUser>
      <div className="background">
        <ul>
          <li></li>
        </ul>
        <div className="form">
          <h2 className="formTitle">Create User Profile</h2>
          <form onSubmit={formik.handleSubmit}>
            <div className="errorAndInput">
              {formik.touched.Username && formik.errors.Username ? (
                <div className="error">{formik.errors.Username}</div>
              ) : null}

              <div className="formfields">
                <label>Username:</label>
                <input type="text" {...formik.getFieldProps("Username")} />
              </div>
            </div>
            <div className="errorAndInput">
              {formik.touched.NIC && formik.errors.NIC ? (
                <div className="error">{formik.errors.NIC}</div>
              ) : null}

              <div className="formfields">
                <label>NIC :</label>
                <input
                  type="text"
                  {...formik.getFieldProps("NIC")}
                  onChange={handleNICChange}
                />
              </div>
            </div>

            <div className="errorAndInput">
              {formik.touched.Password && formik.errors.Password ? (
                <div className="error">{formik.errors.Password}</div>
              ) : null}
              <div className="formfields">
                <label>Password:</label>
                <input type="Password" {...formik.getFieldProps("Password")} />
              </div>
            </div>

            <div className="errorAndInput">
              {formik.touched.Role && formik.errors.Role ? (
                <div className="error">{formik.errors.Role}</div>
              ) : null}
              <div className="formfields">
                <label>Role:</label>
                <select {...formik.getFieldProps("Role")}>
                  <option value="">Select a Role</option>
                  <option value="Back Officer">Back Officer</option>
                  <option value="Travel Agent">Travel Agent</option>
                </select>
              </div>
            </div>
            <div className="errorAndInput">
              {formik.touched.Email && formik.errors.Email ? (
                <div className="error">{formik.errors.Email}</div>
              ) : null}

              <div className="formfields">
                <label>Email:</label>
                <input type="Email" {...formik.getFieldProps("Email")} />
              </div>
            </div>

            <div className="errorAndInput">
              {formik.touched.Phone && formik.errors.Phone ? (
                <div className="error">{formik.errors.Phone}</div>
              ) : null}
              <div className="formfields">
                <label>Phone:</label>
                <input type="text" {...formik.getFieldProps("Phone")} />
              </div>
            </div>

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </createUser>
  );
}

export default UserRegistration;
