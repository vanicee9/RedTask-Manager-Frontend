"use client";
import React, { Fragment, useEffect, useState } from "react";
import "./TaskForm.scss";
import Spinner from "../Spinner";
import { IoMdCloseCircle } from "react-icons/io";
import useDebounceSearch from "@/app/utils/useDebouncedSearch";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaCheckCircle } from "react-icons/fa";
import Modal from "../Modal/Modal";
const EMAIL_REGEX =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const VERSION = process.env.NEXT_PUBLIC_VERSION;


// <---------------- For Mocking current user -------------------->
const user ={
    id: '65f91e1ca6cc7625ca459e94',
    name: 'Alice Johnson',
    email: 'alice@example.com'
}


export default function TaskForm({ taskCard, setTaskFormOpenFlag, adding, updating, setSuccess }) {

  // For handling form data and showing error
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    deadlineDate: "",
    phase: "New",
    assignedTo: "",
    assignedFrom: "",
  });
  const [errorObject, setErrorObject] = useState({
    title_error: "",
    description_error: "",
    deadlineDate_error: "",
    phase_error: "",
    assignedTo_error: "",
  });
  const [loading, setLoading] = useState(false);

  // For opening and closing of ErrorModal
  const [modalObject, setModalObject] = useState({});
  const [openModal, setOpenModal] = useState(false);

  // For Debouncing the results of assignedTo
  const [userEmails, setUserEmails] = useState([]);
  const debouncedSearchValue = useDebounceSearch(formData.assignedTo);
  useEffect(() => {
    if(!debouncedSearchValue) return;
    fetch(`${BASE_URL}/${VERSION}/users/findByEmail/${debouncedSearchValue}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setUserEmails(response.data);
      })
      .catch((error) => {
        console.log("Something went wrong while fetching");
        console.log(error);
      });
  }, [debouncedSearchValue]);

  // For filling form with passed props data (Edit Mode of Task)
  useEffect(() => {
    if (Object.keys(taskCard).length > 0) setFormData(taskCard);
  }, [taskCard]);

  // For Showing Small Errors onBur
  function handleTitleAndDescription(event) {
    const { name, value } = event.target;
    let ok = true;
    if (["title", "description"].includes(name)) {
      if (!value) {
        setErrorObject((prev) => ({
          ...prev,
          [`${name}_error`]: `${name} required`,
        }));
        ok = false;
      }
    }
    if (ok) {
      setErrorObject((prev) => ({
        ...prev,
        [`${name}_error`]: "",
      }));
    }
    return ok;
  }
  function handleDeadlineDate(event) {
    const { name, value } = event.target;
    let ok = true;
    if (name === "deadlineDate") {
      if (!value || value < new Date()) {
        setErrorObject((prev) => ({
          ...prev,
          [`${name}_error`]: "Present or future date required",
        }));
        ok = false;
      }
    }
    if (ok) {
      setErrorObject((prev) => ({
        ...prev,
        [`${name}_error`]: "",
      }));
    }
    return ok;
  }
  function handleAssignedTo(event) {
    const { name, value } = event.target;
    let ok = true;
    if (name === "assignedTo") {
      if (!value || !value.match(EMAIL_REGEX)) {
        setErrorObject((prev) => ({
          ...prev,
          [`${name}_error`]: "email not valid",
        }));
        ok = false;
      }
    }
    if (ok) {
      setErrorObject((prev) => ({
        ...prev,
        [`${name}_error`]: "",
      }));
    }
    return ok;
  }

  async function handleValidation(event) {
    let ok = true;
    // Making sure every condition mets
    ok = ok && handleTitleAndDescription({
      target: {
        name: "title",
        value: formData.title,
      },
    });
    ok = ok && handleTitleAndDescription({
      target: {
        name: "description",
        value: formData.description,
      },
    });
    ok = ok && handleDeadlineDate({
      target: {
        name: "deadlineDate",
        value: formData.deadlineDate,
      },
    });
    ok = ok && handleAssignedTo({
      target: {
        name: "assignedTo",
        value: formData.assignedTo,
      },
    });

    if(!ok) {
      setModalObject({
        title: 'Error!',
        description: 'Please fill all the fields',
        Icon: IoMdCloseCircle,
        color: "red",
      })
      setOpenModal(true);
      return ok;
    }

    // Checking if email in assignedTo is valid?
    try {
      let response = await fetch(
        `${BASE_URL}/${VERSION}/users/validateUserByEmail/${formData.assignedTo}`
      );
      response = await response.json();
      console.log(response);
      if (response && response.success === false) {
        setModalObject({
          title: 'user not found!',
          description: 'Email in Assign To does not belong to any account!',
          Icon: IoMdCloseCircle,
          color: "red",
        })
        setOpenModal(true);
        ok = false;
      }
    } catch (error) {
      setModalObject({
          title: error.name,
          description: error.message,
          Icon: IoMdCloseCircle,
          color: 'red',
      })
      console.log(error);
      setOpenModal(true);
      ok = false;
    }

    return ok;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  async function handleSubmit(event) {
    event.preventDefault();

    // checking for all validations before submitting
    const ok = await handleValidation();
    if (!ok) return false;

    if(adding) {
      setLoading(true);
      try {
        let response = await fetch(`${BASE_URL}/${VERSION}/tasks/`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            deadlineDate: formData.deadlineDate,
            phase: formData.phase,
            assignedToMail: formData.assignedTo,
            assignedFromMail: user.email,
          })
        })
        response = await response.json();
        console.log(response);
        setSuccess(true);
        setTaskFormOpenFlag(false);
      } 
      catch (error) {
        console.log("Something went wrong while adding new Task!");
        setModalObject({
          Icon: IoMdCloseCircle,
          title: error.name || 'Unknown Error',
          description: error.description,
          color: "red",
        })
        setOpenModal(true);
      }
      finally{
        setLoading(false);
      }
    }
    else if(updating) {
      try {
        setLoading(true);
        let response = await fetch(`${BASE_URL}/${VERSION}/tasks/${user.id}`,{
          method: 'PATCH',
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            deadlineDate: formData.deadlineDate,
            phase: formData.phase,
            assignedToMail: formData.assignedTo,
            assignedFromMail: user.email,
          })
        })

        response = await response.json();
        console.log(response);
        setSuccess(true);
        setTaskFormOpenFlag(false);

      } 
      catch (error) {
        console.log("Something went wrong while updating Task.");
        setModalObject({
          Icon: IoMdCloseCircle,
          title: error.name,
          description: error.description,
          color: "error"
        })
        setOpenModal(true);
      }
      finally {
        setLoading(false);
      }
    }
  }

  return (
    <Fragment>
      {openModal ? (
        <>
          <Modal
            Icon={modalObject.Icon}
            title={modalObject.title}
            description={modalObject.description}
            color={modalObject.color}
            open={setOpenModal}
          />
        </>
      ) : (
        ""
      )}

      <div className="blur-background">
        <div className="task-form">
          <div className="top-header">
            <h2>Task Information</h2>
            <div className="close-button" onClick={(event) => {
              event.stopPropagation();
              setTaskFormOpenFlag(false)
            }}>
              <IoMdCloseCircle />
            </div>
          </div>
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
                onBlur={handleTitleAndDescription}
                disabled={loading}
              />
              <div
                className="error-container"
                name="title_error"
                id="title-error"
              >
                {errorObject.title_error}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Task description..."
                onBlur={handleTitleAndDescription}
                disabled={loading}
              ></textarea>
              <div
                className="error-container"
                name="description_error"
                id="description-error"
              >
                {errorObject.description_error}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="deadlineDate">Deadline</label>
              <input
                type="date"
                id="deadlineDate"
                name="deadlineDate"
                value={formData.deadlineDate}
                onChange={handleChange}
                onBlur={handleDeadlineDate}
                disabled={loading}
              />
              <div
                className="error-container"
                name="deadlineDate_error"
                id="deadlineDate-error"
              >
                {errorObject.deadlineDate_error}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="phase">Phase</label>
              <select
                id="phase"
                name="phase"
                value={formData.phase}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="New">New</option>
                <option value="UI/UX">UI/UX</option>
                <option value="Development">Development</option>
                <option value="Testing">Testing</option>
                <option value="UAT">UAT</option>
                <option value="Released">Released</option>
              </select>
              <div
                className="error-container"
                name="phase_error"
                id="phase-error"
              >
                {errorObject.phase_error}
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="assignedTo">Assign To</label>
              <input
                type="text"
                id="assignedTo"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                placeholder="johndoe@gmail.com"
                onBlur={handleAssignedTo}
                list={"suggestion"}
                autoComplete="false"
                disabled={loading}
              />
              <datalist id="suggestion">
                {userEmails.length > 0 &&
                  userEmails.map((user, index) => {
                    return (
                      <option key={index} value={user.email}>
                        {user.name}
                      </option>
                    );
                  })}
              </datalist>
              <div
                className="error-container"
                name="assignedTo_error"
                id="assignedTo-error"
              >
                {errorObject.assignedTo_error}
              </div>
            </div>
            <button type="submit" disabled={loading}>
              {loading ? (
                <Spinner color={"#fff"} height={"20"} width={"20"} />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
}
