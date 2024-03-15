import React from 'react'
import { FaLock} from 'react-icons/fa';
import { MdLocalPhone } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import './signup.scss'

export default function SignUp() {
  return (
    <div className="container">
      <div className="leftSide">
        <div className="login-details">
          <h1>SIGNUP</h1>
          <p>How I get started lorem ipsum door at?</p>

          <div id="username" className="user-options">
          <MdEmail  className='icons'/>


            <input type="text" placeholder="Email" />
          </div>
          
           <div id="phone" className="user-options">
         
           <MdLocalPhone  className='icons' />

            <input type="number" placeholder="Phone Number" />
          </div>
          <div id="password" className="user-options">
            <FaLock className="icons" />

            <input type="password" placeholder="Password" />
          </div>
           
          <div id="confirm-password" className="user-options">
            <FaLock className="icons" />

            <input type="password" placeholder="Confirm Password" />
          </div>

         

          <div>
            <button id="btn">SIGN NOW</button>
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
  );
}

  