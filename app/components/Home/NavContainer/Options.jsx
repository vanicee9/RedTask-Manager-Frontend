import React from 'react';
import { FaHome } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { FaTimes } from "react-icons/fa";
import { MdFiberNew } from "react-icons/md";
import { IoTime } from "react-icons/io5";

const Options = ({ filterType, changeFilterType }) => {

  const optionList = [
    {
      icon : <FaHome className='icons' />,
      optionName : "all tasks",
    }, {
      icon : <FaTimes className='icons'  />,
      optionName : "failed",
    }, {
      icon : <TiTick className='icons'  />,
      optionName : "completed",
    }, {
      icon : <IoTime className='icons'  />,
      optionName : "in-process",
    }, {
      icon : <MdFiberNew className='icons'  />,
      optionName : "new",
    },
  ];

  return (
    <ul className='options'>
      {
        optionList.map(e => {
          return (
            <li className={e.optionName===filterType ? "selected" : ""} onClick={() => changeFilterType(e.optionName)} >
              {e.icon}
              <span>{e.optionName}</span>
            </li>
          )
        })
      }
    </ul>
  );
}

export default Options