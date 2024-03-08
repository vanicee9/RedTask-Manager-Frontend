
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
    <div className="bg-gray-100 p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Task Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" name="description" value={formData.description} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">Deadline</label>
          <input type="date" id="deadline" name="deadline" value={formData.deadline} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="phase" className="block text-sm font-medium text-gray-700">Phase</label>
          <select id="phase" name="phase" value={formData.phase} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" required>
            <option value="new">New</option>
            <option value="UI/UX">UI/UX</option>
            <option value="development">Development</option>
            <option value="testing">Testing</option>
            <option value="UAT">UAT</option>
            <option value="Released">Released</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="assignTo" className="block text-sm font-medium text-gray-700">Assign To</label>
          <input type="text" id="assignTo" name="assignTo" value={formData.assignTo} onChange={handleChange} className="mt-1 p-2 border rounded-md w-full" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
      </form>
    </div>
  );
};

export default TaskForm;


