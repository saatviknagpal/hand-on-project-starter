import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import coverpic from "../../images/coverpic.svg";
import uploadpic from "../../images/upload.svg";
import axios from "axios";
import "./remover.scss";

function BackgroundRemover() {
  const fileInputRef = useRef();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [bgRemovedImage, setBgRemovedImage] = useState("");

  useEffect(() => {
    if (bgRemovedImage) {
      setPreview("data:image/png;base64," + bgRemovedImage);
    } else if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        console.log(reader.result);
        axios
          // eslint-disable-next-line no-undef
          .post(`${process.env.REACT_APP_BACKEND_URL}/upload`, {
            image: reader.result,
          })
          .then((res) => {
            console.log(res.data.result_b64);
            setBgRemovedImage(res.data.result_b64);
          });
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  }, [image, bgRemovedImage]);

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
            {preview ? (
              <div className="uploaded_pic">
                <img
                  style={{ objectFit: "cover", maxWidth: "80%" }}
                  src={preview}
                  alt=""
                />
                <button
                  className="choose_img"
                  onClick={(event) => {
                    event.preventDefault();
                    setImage(null);
                    setBgRemovedImage(null);
                  }}
                >
                  Remove Image
                </button>
                {bgRemovedImage && (
                  <a
                    href={`data:image/png;base64,${bgRemovedImage}`}
                    download={"Image.png"}
                    className="choose_img"
                    style={{ textDecoration: "none" }}
                  >
                    Download Image
                  </a>
                )}
              </div>
            ) : (
              <div>
                <div className="pictureContainer">
                  <img src={uploadpic} alt="" className="gallery" />
                  <p className="instructions">
                    File should be png, jpg and less than 5mb
                  </p>
                </div>

                <form className="form-group">
                  <input
                    id="file-upload"
                    type="file"
                    ref={fileInputRef}
                    style = {{display: "none"}}
                    accept="image/jpeg, image/png"
                    onChange={(event) => {
                      const file = event.target.files[0];
                      if (file) {
                        if (!file.type.includes("image")) {
                          setImage(null);
                          return alert("File format must be .jpg, .png, .jpeg");
                        } else if (file.size > 4999999) {
                          setImage(null);
                          return alert("File size should be less than 5MB");
                        } else {
                          setImage(file);
                        }
                      } else {
                        setImage(null);
                      }
                    }}
                  />

                  <input
                    type="submit"
                    value="Upload ->"
                    className="choose_img"
                    style={{ cursor: "pointer" }}
                    onClick={(event) => {
                      event.preventDefault();
                      fileInputRef.current.click();
                    }}
                  />
                  <p className="instructions">Or drop a file</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default BackgroundRemover;
