import React, { useEffect } from "react";
import Coverpic from "../../images/coverpic.svg";
import "./marketplace.scss";
import ApiCard from "../../components/ApiCard/ApiCard";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

function Marketplace() {
  const callMarketplace = async () => {
    try {
      const res = await fetch("/", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      console.log(data);

      if (!res.status === 200) {
        const error = new Error(res.error);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    return () => {
      callMarketplace();
    };
  }, []);

  let arr = [
    {
      src: Coverpic,
      name: "Background Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
    {
      src: Coverpic,
      name: "Background Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
    {
      src: Coverpic,
      name: "Background Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
    {
      src: Coverpic,
      name: "Background Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
    {
      src: Coverpic,
      name: "Background Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
    {
      src: Coverpic,
      name: "Background Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
    {
      src: Coverpic,
      name: "Background Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
    {
      src: Coverpic,
      name: "Background Remove",
      desc: "The description of the API in quick brief and we will truncate it here.",
    },
  ];

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
