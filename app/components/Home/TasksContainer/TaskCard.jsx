import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Task = ({ data }) => {
  return (
    <div className='task'>
      <div className="title">{data.title}</div>
      <div className="description">{data.description}</div>
      <div className="date">
        <div className="start-date">{data.start_date}</div>
        <div className='to-date'></div>
        <div className="end-date">{data.end_date}</div>
      </div>
      <div className="bottom">
        <div className="status" data-status={data.status}>{data.status}</div>
        <div className="task-buttons">
          <FaEdit className='icons edit'/>
          <MdDelete className='icons delete'/>
        </div>
      </div>
    </div>
  )
}

export default Task