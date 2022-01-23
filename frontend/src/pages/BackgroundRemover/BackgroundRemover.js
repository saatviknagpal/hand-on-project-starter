import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import coverpic from "../../images/coverpic.svg";
import uploadpic from "../../images/upload.svg";
import "./remover.scss";

function BackgroundRemover() {
  return (
    <>
      <Navbar />
      <div className="landingPage">
        <div className="about">
          <div className="leftContainer">
            <h1 className="title">Remove image background</h1>
            <p className="description">100% automatic and free</p>
            <div className="imgContainer">
              <img src={coverpic} alt="user_img" className="userImg" />
            </div>
          </div>
        </div>
        <div className="upload_pic">
          <div className="rightContainer">
            <div className="pictureContainer">
              <img src={uploadpic} alt="" className="gallery" />
            </div>
            <p className="instructions">File should be png, jpg and less than 5mb</p>
            <button className="choose_img">Upload Image</button>
            <p className="instructions">Or drop a file</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default BackgroundRemover;
