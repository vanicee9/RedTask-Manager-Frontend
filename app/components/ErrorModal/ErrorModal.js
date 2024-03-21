"use client";
import { VscError } from "react-icons/vsc";
import './ErrorModal.scss';
import { Fragment } from "react";



export default function ErrorModal({errorTitle, errorDescription, open}) {
  return (
    <Fragment>
      {
        open ? 

        <div className="blurry-background">
          <div className="error-modal">
              <div className="error-heading">
                  <VscError color="red" />
                  <span>{errorTitle}</span>
              </div>

              <div className="error-description">
                  <p>{errorDescription}</p>
              </div>
              <button id = "ok-button" onClick={() => open(false)} >Ok</button>
          </div>
        </div>
        : 
        <div></div>
      }

    </Fragment>
  )
}
