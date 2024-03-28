"use client"

import React, { useState } from 'react'
import Nav from './NavContainer/Nav';
import TaskContainer from './TasksContainer/TaskContainer';
import './Styles/homeStyle.scss';
import mockData from './mockData';

const HomePage = () => {
  const [filterType, setFilterType] = useState("all tasks");
  const changeFilterType = x => {
    setFilterType(x);
    console.log(x)
  };

  return (
    <div className='home'>
      <Nav filterType={filterType} changeFilterType={changeFilterType} />
      <TaskContainer data={mockData} filterType={filterType} />
    </div>
  )
}

export default HomePage;