import React from 'react';
import User from './User';
import Options from './Options';
import { FaSignOutAlt } from "react-icons/fa";

const Nav = ({ filterType, changeFilterType }) => {
  return (
    <div className="nav">
      <User />
      <Options filterType={filterType} changeFilterType={ changeFilterType } />
      <div className='signout'>
        <FaSignOutAlt className='icons' />
        Signout
      </div>
    </div>
  )
}

export default Nav