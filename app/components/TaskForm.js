"use client";

import { useState } from 'react';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    phase: 'new',
    assignTo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="bg-slate-200 w-1/4 p-6 rounded-md shadow-md hover:bg-white hover:border-black hover:border-2">
      <h2 className="text-xl text-center font-bold mb-5">Task Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm  text-gray-950 font-bold">Title</label>
          <input type="text" id="title" name="title" value={formData.title} placeholder='New Task...' onChange={handleChange} className="mt-1 p-2 border rounded-md w-full font-semibold" required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm text-gray-950 font-bold">Description</label>
          <textarea id="description" name="description" value={formData.description} placeholder='Task description...' onChange={handleChange} className="mt-1 p-2 border rounded-md w-full font-semibold" required />
        </div>
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-sm text-gray-950 font-bold">Deadline</label>
          <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full font-semibold" required />
        </div>
        <div className="mb-4">
          <label htmlFor="phase" className="block text-sm text-gray-950 font-bold">Phase</label>
          <select id="phase" name="phase" value={formData.phase} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full font-semibold" required>
            <option value="new">New</option>
            <option value="UI/UX">UI/UX</option>
            <option value="development">Development</option>
            <option value="testing">Testing</option>
            <option value="UAT">UAT</option>
            <option value="Released">Released</option>
          </select>
        </div>
        <div className="mb-5">
          <label htmlFor="assignTo" className="block text-sm text-gray-950 font-bold">Assign To</label>
          <input type="text" id="assignTo" name="assignTo" placeholder='johndoe@gmail.com' value={formData.assignTo} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full font-semibold" required />
        </div>
        <button type="submit" className="bg-black w-full text-white px-4 py-2 rounded-md hover:bg-white hover:text-black hover:border-black hover:border-2 font-semibold">Submit</button>
      </form>
    </div>
  );
};

export default TaskForm;



