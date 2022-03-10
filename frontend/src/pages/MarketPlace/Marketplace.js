/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Coverpic from "../../images/coverpic.svg";
import "./marketplace.scss";
import ApiCard from "../../components/ApiCard/ApiCard";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";
// import axios from "axios";

function Marketplace() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/api`)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setData(result.apis);
      });
  }, []);

  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div className="mainPage">
        <div className="banner">
          <img src={Coverpic} alt="coverpic" />
          <div className="rightPart">
            <div className="r1">
              <div className="title">BACKGROUND IMAGE REMOVER</div>
              <div className="description">100% automatic and free</div>
            </div>
            <Link to="remove-bg">
              <div className="viewButton">View App</div>
            </Link>
          </div>
        </div>
        <div className="subHead">All APIs</div>
        <div className="cardContainer">
          {data.map((data, idx) => (
            <ApiCard
              key={idx}
              name={data.name}
              desc={data.description}
              endPoint={data.endPoint}
            ></ApiCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default Marketplace;
