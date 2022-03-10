import React, { useState } from "react";
import "./apiCard.scss";
import coverPic from "../../images/api.jpg";
import { Icon } from "@iconify/react";
import EditModal from "../EditModal/EditModal";

function ApiCard({ name, desc, endPoint, id }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="apicard">
      <img src={coverPic} alt="MainPic"></img>
      <div>
        <a href={endPoint}>
          <div className="MainHeading">{name}</div>
        </a>
        <div className="container">
          <div className="Description">{desc}</div>
          <button className="editButton">
            <Icon
              icon="akar-icons:edit"
              className="edit"
              onClick={() => {
                setOpenModal(true);
              }}
            />
            {openModal && <EditModal id = {id} closeModal={setOpenModal} />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApiCard;
