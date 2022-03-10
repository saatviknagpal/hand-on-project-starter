/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ApiCard from "../../components/ApiCard/ApiCard";
import "./apis.scss";
import { useNavigate } from "react-router-dom";
export default function Apis() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("accessToken") == null) {
      navigate("/login");
    }

    fetch(`${process.env.REACT_APP_BACKEND_URL}/api/myapi`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setData(result.myapi);
      });
  }, []);

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div className="container">
        <div className="title">
          <h1 className="apiHeading">Your uploaded APIs</h1>
        </div>
        {data.length == 0 ? (
          <p className="text">No APIs Uploaded</p>
        ) : (
          <>
            <div className="cards">
              {data.map((data, idx) => (
                <ApiCard
                  key={idx}
                  name={data.name}
                  desc={data.description}
                  endPoint={data.endPoint}
                  id={data._id}
                ></ApiCard>
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
