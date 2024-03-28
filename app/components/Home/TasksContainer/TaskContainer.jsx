import React, { useCallback, useEffect, useState } from 'react';
import { MdAddCircleOutline } from "react-icons/md";
import Task from './TaskCard';

const TaskContainer = ({data, filterType}) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (filterType=="all tasks")
      setFilteredData(data);
    else
      setFilteredData(data.filter(e => e.status===filterType));
  }, [filterType]);

  const showTasks = () => {
    return (
      filteredData.map((e,i) => <Task data={e} key={i}/>)
    )
  };
  
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
        {showTasks()}
      </div>
    </div>
  )
}

export default TaskContainer;