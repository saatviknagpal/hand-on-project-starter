import React from "react";
import "./modal.scss";

function Modal({ closeModal }) {
  return (
    <>
      <div className="modalBackground">
        <div className="modalContainer">
          <div className="closeBtn">
            <button
              onClick={() => {
                closeModal(false);
              }}
              className="cross"
            >
              {" "}
              X{" "}
            </button>
          </div>
          <div>
            <div className="modalTitle">Add new API</div>
            <form className="apiForm">
              <input type="text" placeholder="API Name" />
              <input type="text" placeholder="API Endpoint" />
              <textarea
                name=""
                id=""
                cols="15"
                rows="5"
                placeholder="Description of API"
              ></textarea>
              <input type="submit" value="Add API" id="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
