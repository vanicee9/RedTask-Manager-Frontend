import React from 'react';
import { FaUserCircle } from "react-icons/fa";

const User = () => {
  return (
    <div className='user'>
        <FaUserCircle className='userPhoto'/>
        <span className='userName'>
          <p>First Name</p>
          <p>Last Name</p>
        </span> 
    </div>
  )
}

export default User