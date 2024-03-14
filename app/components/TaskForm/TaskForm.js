"use client"
import React, { useState } from 'react';
import './TaskForm.scss';

const TaskForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    deadline: '',
    phase: 'New',
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
    <div className="task-form">
      <h2>Task Information</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input 
            type="text" 
            id="title" 
            name="title" 
            value={formData.title}
            onChange={handleChange} 
            placeholder="New Task..."
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            id="description" 
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Task description..."
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="deadline">Deadline Date</label>
          <input 
            type="date" 
            id="deadline" 
            name="deadline" 
            value={formData.deadline}
            onChange={handleChange} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="phase">Phase</label>
          <select 
            id="phase" 
            name="phase" 
            value={formData.phase}
            onChange={handleChange}
          >
            <option value="New">New</option>
            <option value="UI/UX">UI/UX</option>
            <option value="Development">Development</option>
            <option value="Testing">Testing</option>
            <option value="UAT">UAT</option>
            <option value="Released">Released</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="assignTo">Assign To</label>
          <input 
            type="text" 
            id="assignTo" 
            name="assignTo" 
            value={formData.assignTo}
            onChange={handleChange} 
            placeholder="johndoe@gmail.com"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TaskForm;
