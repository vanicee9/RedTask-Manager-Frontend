"use client";
import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import "./signup.scss";
import CustomButton from "../Button/button";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSignUp(event) {
    event.preventDefault();
    const response = await fetch("http://localhost:3002/api/v1/register", {
      method: "POST",
      header: {
        "Content-Type": "application/json",
        
      },
      body: JSON.stringify({
        email: email,
        phone: phone,
        password: password,
        confirmPassword: confirmPassword,
      }),
    });

    const data = await response.json();
    console.log(data);
  }

  return (
    <form onSubmit={handleSignUp}>
      <div className="container">
        <div className="leftSide">
          <div className="login-details">
            <h2>SIGNUP</h2>
            <p>How I get started lorem ipsum door at?</p>

            <div id="user" className="user-options">
              <MdEmail className="icons" />

              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div id="phone" className="user-options">
              <MdLocalPhone className="icons" />

              <input
                type="number"
                placeholder="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div id="password" className="user-options">
              <FaLock className="icons" />

              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div id="confirm-password" className="user-options">
              <FaLock className="icons" />

              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <div>
              <CustomButton text= "SIGNUP" />
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
