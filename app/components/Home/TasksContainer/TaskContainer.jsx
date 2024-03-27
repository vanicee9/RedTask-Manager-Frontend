import React from 'react';
import { MdAddCircleOutline } from "react-icons/md";
import Task from './Task';

const TaskContainer = () => {
  return (
    <div className='task-container'>
      <div className="task-container-top">
        <div className="selected-name">All Tasks</div>
        <div className="add-more"><MdAddCircleOutline className='icons'/></div>
      </div>
      <div className="progress">
        <div className="done"></div>
      </div>
      <div className="main-container">
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
        <Task />
      </div>
    </div>
  )
}

export default TaskContainer;