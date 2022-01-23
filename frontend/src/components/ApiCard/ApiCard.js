import React from "react";
import "./apiCard.scss";

function ApiCard({ src, name, desc }) {
  return (
    <div className="apicard">
      <img src={src} alt="MainPic"></img>
      <div className="container">
        <div className="MainHeading">{name}</div>
        <div className="Description">{desc}</div>
      </div>
    </div>
  );
}

export default ApiCard;
