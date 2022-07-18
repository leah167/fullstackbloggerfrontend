import React, { useState } from "react";
import "./Modal.css";
import { useNavigate } from "react-router-dom";

const Modal = (props) => {
  const navigate = useNavigate();
  if (!props.show) {
    return <></>;
  }

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h4 className="modal-title">{props.title}</h4>
        </div>
        <div className="modal-body">{props.children}</div>
        <div className="modal-footer">
          <button
            onClick={() => {
              props.putUpdatedBlog();
              props.onClose();
              navigate("/"); // Navigate back to main blogs page
              window.location.reload(); // Refreshes main blogs page WITH update applied
            }}
          >
            Update Blog
          </button>
          <button onClick={props.onClose} className="button">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
