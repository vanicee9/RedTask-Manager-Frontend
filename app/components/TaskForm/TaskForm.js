"use client"
import React, { useEffect, useState } from 'react';
import './TaskForm.scss';
import Spinner from '../Spinner';
import useDebounceSearch from '@/app/utils/useDebouncedSearch';
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const VERSION = process.env.NEXT_PUBLIC_VERSION;
export default function TaskForm({taskCard}) {

  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    deadline: '',
    phase: 'New',
    assignTo: '',
    assignFrom: '',
  });
  const [errorObject, setErrorObject] = useState({
    title_error: '',
    description_error: '',
    deadline_error: '',
    phase_error: '',
    assignTo_error: '',
  }) 
  const [loading, setLoading] = useState(true);


  const debouncedSearchValue = useDebounceSearch(formData.assignTo);
  useEffect(() => {
    fetch(`${BASE_URL}${VERSION}/users/findByEmail/${debouncedSearchValue}`)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((error) => {
      console.log("Something went wrong while fetching");
      console.log(error);
    })
  },[debouncedSearchValue])

  useEffect(() => {
    if(Object.keys(taskCard).length > 0) setFormData(taskCard)
  },[taskCard])


  function handleValidation(event){
    const {name, value} = event.target;
    let ok = true;
    if(['title', 'description'].includes(name)) {
      if(!value){
        setErrorObject((prev) => ({
          ...prev,
          [`${name}_error`]: `${name} required`
        }))
        ok = false;
      }
    }
    else if(name === 'deadline') {
      if(!value || value < new Date()) {
        setErrorObject((prev) => ({
          ...prev,
          [`${name}_error`]: 'Present or future date required'
        }))
        ok = false;
      }
    }
    else if (name === 'assignTo') {
      if(!value || !value.match(EMAIL_REGEX)) {
        setErrorObject((prev) => ({
          ...prev,
          [`${name}_error`]: 'email not valid'
        }))
        ok = false;
      }
    }
    


    if(ok){
      setErrorObject((prev) => ({
        ...prev,
        [`${name}_error`]: ''
      }))
    }

    return ok;
  }

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
      <div className="blur-background">
            <div className="task-form">
              <h2>Task Information</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label  htmlFor="title">Title</label>
                  <input 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={formData.title}
                    onChange={handleChange} 
                    placeholder="New Task..."
                    onBlur={handleValidation}
                  />
                  <div className="error-container" name="title_error" id="title-error">{errorObject.title_error}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea 
                    id="description" 
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Task description..."
                    onBlur={handleValidation}

                  ></textarea>
                  <div className="error-container" name="description_error" id="description-error">{errorObject.description_error}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="deadline">Deadline Date</label>
                  <input 
                    type="date" 
                    id="deadline" 
                    name="deadline" 
                    value={formData.deadline}
                    onChange={handleChange} 
                    onBlur={handleValidation}
                  />
                  <div className="error-container" name="deadline_error" id="deadline-error">{errorObject.deadline_error}</div>
                </div>
                <div className="form-group">
                  <label htmlFor="phase">Phase</label>
                  <select 
                    id="phase" 
                    name="phase" 
                    value={formData.phase}
                    onChange={handleChange}
                    onBlur={handleValidation}
                  >
                    <option value="New">New</option>
                    <option value="UI/UX">UI/UX</option>
                    <option value="Development">Development</option>
                    <option value="Testing">Testing</option>
                    <option value="UAT">UAT</option>
                    <option value="Released">Released</option>
                  </select>
                  <div className="error-container" name="phase_error" id="phase-error">{errorObject.phase_error}</div>
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
                    onBlur={handleValidation}
                  />
                  <div className="error-container" name="assignTo_error" id="assignTo-error">{errorObject.assignTo_error}</div>
                </div>
                <button type="submit">
                  {
                    loading ? <Spinner color={"#fff"} height={"25"} width={"25"}/> : "Submit"
                  }
                </button>
              </form>
            </div>
      </div>
  );
}
