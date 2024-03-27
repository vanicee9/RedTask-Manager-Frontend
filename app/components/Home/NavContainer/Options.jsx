import React from 'react';
import { FaHome } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { TbUrgent } from "react-icons/tb";
import { TiTick } from "react-icons/ti";

const Options = () => {
  return (
    <ul className='options'>
      <li className="selected"><FaHome className='icons' /><span>all tasks</span></li>
      <li><FaListCheck className='icons' /><span>important</span></li>
      <li><TiTick className='icons' /><span>completed!</span></li>
      <li><TbUrgent className='icons' /><span>do it now</span></li>
    </ul>
  )
}

export default Options