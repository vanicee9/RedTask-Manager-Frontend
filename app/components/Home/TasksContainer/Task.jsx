import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Task = () => {
  return (
    <div className='task'>
      <div className="title">Update Passwords</div>
      <div className="description">Review online accounts and update passwords for better security. Use a password manager to keep track.</div>
      <div className="date">13/10/2023</div>
      <div className="bottom">
        <div className="status" data-status="Completed">Completed</div>
        <div className="task-buttons">
          <FaEdit className='icons edit'/>
          <MdDelete className='icons delete'/>
        </div>
      </div>
    </div>
  )
}

export default Task