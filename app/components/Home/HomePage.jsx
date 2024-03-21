import React from 'react'
import Nav from './Nav';
import TaskContainer from './TaskContainer';
import './Styles/homeStyle.scss';

const HomePage = () => {
  return (
    <div className='home'>
      <Nav />
      <TaskContainer />
    </div>
  )
}

export default HomePage;