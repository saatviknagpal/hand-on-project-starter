import React from "react";
import Coverpic from "../../images/coverpic.svg";
import "./marketplace.scss";
import ApiCard from "../../components/ApiCard/ApiCard";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

function Marketplace() {
  let arr = [
    {
      src: Coverpic,
      name: "Backgound Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
    {
      src: Coverpic,
      name: "Backgound Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
    {
      src: Coverpic,
      name: "Backgound Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
    {
      src: Coverpic,
      name: "Backgound Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
    {
      src: Coverpic,
      name: "Backgound Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
    {
      src: Coverpic,
      name: "Backgound Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
    {
      src: Coverpic,
      name: "Backgound Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
    {
      src: Coverpic,
      name: "Backgound Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
  ];

  return (
    <>
      <div className="nav">
        <Navbar />
        <Link to="login">
          <button className="loginButton">Login/Signup</button>
        </Link>
      </div>
      <div className="mainPage">
        <div className="banner">
          <img src={Coverpic} alt="coverpic" />
          <div className="rightPart">
            <div className="r1">
              <div className="title">BACKGROUND IMAGE REMOVER</div>
              <div className="description">100% automatic and free</div>
            </div>
            <div className="viewButton">View App</div>
          </div>
        </div>
        <div className="subHead">All APIs</div>
        <div className="cardContainer">
          {arr.map((data, idx) => (
            <ApiCard
              key={idx}
              src={data.src}
              name={data.name}
              desc={data.desc}
            ></ApiCard>
          ))}
        </div>
      </div>
    </>
  );
}

export default Marketplace;
