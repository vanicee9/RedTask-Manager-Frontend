import React from 'react'
import Nav from './NavContainer/Nav';
import TaskContainer from './TasksContainer/TaskContainer';
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