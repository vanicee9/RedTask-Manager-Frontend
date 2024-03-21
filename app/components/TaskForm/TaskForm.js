"use client";
import React, { Fragment, useEffect, useState } from "react";
import "./TaskForm.scss";
import Spinner from "../Spinner";
import { IoMdCloseCircle } from "react-icons/io";
import useDebounceSearch from "@/app/utils/useDebouncedSearch";
import ErrorModal from "../ErrorModal/ErrorModal";
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


export default function TaskForm({ taskCard, taskFormclosingFunction, adding, updating }) {

  // For handling form data and showing error
  const [formData, setFormData] = useState({
    id: "",
    title: "",
    description: "",
    deadline: "",
    phase: "New",
    assignTo: "",
    assignFrom: "",
  });
  const [errorObject, setErrorObject] = useState({
    title_error: "",
    description_error: "",
    deadline_error: "",
    phase_error: "",
    assignTo_error: "",
  });
  const [loading, setLoading] = useState(false);

  // For opening and closing of ErrorModal
  const [errorModalObject, setErrorModalObject] = useState({});
  const [openErrorModal, setOpenErrorModal] = useState(false);

  // For Debouncing the results of assignTo
  const [userEmails, setUserEmails] = useState([]);
  const debouncedSearchValue = useDebounceSearch(formData.assignTo);
  useEffect(() => {
    fetch(`${BASE_URL}${VERSION}/users/findByEmail/${debouncedSearchValue}`)
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
  function handleDeadline(event) {
    const { name, value } = event.target;
    let ok = true;
    if (name === "deadline") {
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
  function handleAssignTo(event) {
    const { name, value } = event.target;
    let ok = true;
    if (name === "assignTo") {
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
    ok &= handleTitleAndDescription({
      target: {
        name: "title",
        value: formData.title,
      },
    });
    ok &= handleTitleAndDescription({
      target: {
        name: "description",
        value: formData.description,
      },
    });
    ok &= handleDeadline({
      target: {
        name: "deadline",
        value: formData.deadline,
      },
    });
    ok &= handleAssignTo({
      target: {
        name: "assignTo",
        value: formData.assignTo,
      },
    });

    // Checking if email in assignTo is valid?
    try {
      let response = await fetch(
        `${BASE_URL}/${VERSION}/users/validateUserByEmail/${formData.assignTo}`
      );
      response = await response.json();
      console.log(response);
      if (response && response.success === false) {
        setErrorModalObject({
          title: 'user not found!',
          description: 'Email in assign to does not belong to any account!'
        })
        setOpenErrorModal(true);
      }
    } catch (error) {
      setErrorModalObject({
          title: error.name,
          description: error.description,
        })
      console.log(error);
      ok = false;
    }
    finally{
      setOpenErrorModal(true);
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
    if (!handleValidation()) return false;

    if(adding) {
      try {
        let response = await fetch(`${BASE_URL}/${VERSION}/tasks/`,{
          method: 'POST',
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            deadline: formData.deadline,
            phase: formData.phase,
            assignToMail: formData.assignTo,
            assignFromMail: user.email,
          })
        })

        response = response.json();
        console.log(response);
      } catch (error) {
        console.log("Something went wrong while adding new Task!");
        setErrorModalObject({
          title: error.name || 'Unknown Error',
          description: error.description,
        })
        setOpenErrorModal(true);
      }
    }
    else if(updating) {
      try {
        let response = await fetch(`${BASE_URL}/${VERSION}/tasks/${user.id}`,{
          method: 'PATCH',
          body: JSON.stringify({
            title: formData.title,
            description: formData.description,
            deadline: formData.deadline,
            phase: formData.phase,
            assignToMail: formData.assignTo,
            assignFromMail: user.email,
          })
        })

        response = response.json();
        console.log(response);
      } catch (error) {
        
      }
    }
  }

  return (
    <Fragment>
      {openErrorModal ? (
        <>
          <ErrorModal
            errorTitle={errorModalObject.title}
            errorDescription={errorModalObject.description}
            open={setOpenErrorModal}
          />
        </>
      ) : (
        ""
      )}

      <div className="blur-background">
        <div className="task-form">
          <div className="close-button" onClick={() => taskFormclosingFunction(false)}>
            <IoMdCloseCircle />
          </div>
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
                onBlur={handleTitleAndDescription}
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
              <label htmlFor="deadline">Deadline Date</label>
              <input
                type="date"
                id="deadline"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                onBlur={handleDeadline}
              />
              <div
                className="error-container"
                name="deadline_error"
                id="deadline-error"
              >
                {errorObject.deadline_error}
              </div>
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
              <div
                className="error-container"
                name="phase_error"
                id="phase-error"
              >
                {errorObject.phase_error}
              </div>
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
                onBlur={handleAssignTo}
                list={"suggestion"}
                autoComplete="false"
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
                name="assignTo_error"
                id="assignTo-error"
              >
                {errorObject.assignTo_error}
              </div>
            </div>
            <button type="submit">
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
