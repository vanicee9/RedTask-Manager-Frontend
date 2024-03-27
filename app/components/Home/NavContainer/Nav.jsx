import React from 'react';
import User from './User';
import Options from './Options';
import { FaSignOutAlt } from "react-icons/fa";

const Nav = () => {
  return (
    <div className="nav">
      <User />
      <Options />
      <div className='signout'>
        <FaSignOutAlt className='icons' />
        Signout
      </div>
    </div>
  )
}

export default Nav