import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import coverpic from "../../images/coverpic.svg";
import uploadpic from "../../images/upload.svg";
import axios from "axios";
import "./remover.scss";

function BackgroundRemover() {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose Image");
  const [uploadedFile, setUploadedFile] = useState({});
  const [style, setStyle] = useState("pictureContainer");

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(
        "http://localhost:1337/api/removebg",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
    } catch (err) {
      if (err.response.status === 500) {
        console.log("There was a problem with the server");
      } else {
        console.log(err.response.data.msg);
      }
    }
  };

  const changeStyle = () => {
    setStyle("invisible");
    setFilename("Choose Image")
  };

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
            {uploadedFile ? (
              <div className="uploaded_pic">
                <img
                  style={{ width: "50%" }}
                  src={uploadedFile.filePath}
                  alt=""
                />
              </div>
            ) : null}
            <div className={style}>
              <img src={uploadpic} alt="" className="gallery" />
              <p className="instructions">
              File should be png, jpg and less than 5mb
            </p>
            </div>
            
            <form onSubmit={onSubmit} className="form-group">
              <div className="choose_img">
                <input
                  id="file-upload"
                  type="file"
                  accept="image/png, image/gif, image/jpeg"
                  onChange={onChange}
                />
                <label htmlFor="file-upload">{filename}</label>
              </div>
              <input
                type="submit"
                value="Upload ->"
                className="choose_img"
                style={{ cursor: "pointer" }}
                onClick={changeStyle}
              />
              <p className="instructions">Or drop a file</p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default BackgroundRemover;
