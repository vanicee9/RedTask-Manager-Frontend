"use client";
import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import "./signup.scss";
import CustomButton from "../Button/button";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    if (name === "email") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value) ? "" : "Invalid email address",
      }));
    } else if (name === "confirmPassword") {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: validateConfirmPassword(
          value,
          formData.password
        )
          ? ""
          : "Passwords do not match",
      }));
    }
  };

  const validateEmail = (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const validateConfirmPassword = (value, password) => {
    return value === password;
  };

  async function handleSignUp(event) {
    event.preventDefault();

    
    if (formErrors.email || formErrors.confirmPassword) {
      console.log("Form contains errors. Please correct them.");
      return;
    }

    
    const response = await fetch("http://localhost:3002/api/v1/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <form onSubmit={handleSignUp}>
      <div className="container">
        <div className="leftSide">
          <div className="login-details">
            <h1>SIGNUP</h1>
            <p>How I get started lorem ipsum door at?</p>

            <div id="user" className="user-options">
              <MdEmail className="icons" />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {formErrors.email && (
              <p className="error" style={{ color: "red" }}>
                {formErrors.email}
              </p>
            )}

            <div id="phone" className="user-options">
              <MdLocalPhone className="icons" />
              <input
                type="number"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div id="password" className="user-options">
              <FaLock className="icons" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div id="confirm-password" className="user-options">
              <FaLock className="icons" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            {formErrors.confirmPassword && (
            <p className="error" style={{ color: "red" }}>
            {formErrors.confirmPassword}
            </p>
  )}
            <div>
              <CustomButton text="SIGNUP" />
            </div>
          </div>
        </div>

        <div className="rightSide">
          <div id="inner-div">
            <p> Very good works are waiting for you sign up now!!</p>
            <img id="girl" src="/unnamed.png" alt="image" />
          </div>
        </div>
      </div>
    </form>
  );
}
