import React from 'react';
import User from './User';
import Options from './Options';

const Nav = () => {
  return (
    <div className="nav">
      <User />
      <Options />
      <div className='signout'>
        Signout
      </div>
    </div>
  )
}

export default Nav