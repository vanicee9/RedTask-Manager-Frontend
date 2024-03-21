"use client";
import './Modal.scss';
import { Fragment } from "react";



export default function Modal({Icon, title, description, color, open}) {
  return (
    <Fragment>
      {
        open ? 

        <div className="blurry-background">
          <div className="modal" style={{
            borderLeft: `5px solid ${color}`,
          }}>
              <div className="icon-container">
                  
                  <Icon size={"25px"} color={color}/>
              </div>
              <div className="content-container">
                  <div className="heading">
                    <span>{title}</span>
                  </div>
                  <div className="description">
                    <p>{description}</p>
                  </div>
                  <button id = "ok-button" onClick={() => open(false)} >Ok</button>
              </div>
          </div>
        </div>
        : 
        <div></div>
      }

    </Fragment>
  )
}
