import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import Coverpic from "../../images/coverpic.svg";
import ApiCard from "../../components/ApiCard/ApiCard";
import "./apis.scss";
export default function Apis() {
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
    
  ];
  return (
    <>
      <div className="nav">
        <Navbar />
      </div>
      <div className="container">
          <div className="title">
            <h1 className="apiHeading">Your uploaded APIs</h1>
            </div>
            <div className="cards">
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
