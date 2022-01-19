import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import userPic from "../../images/user_img.svg";
import "./dashboard.scss";

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="dashboard">
        <div className="left">
          <div className="leftContainer">
            <div className="imgContainer">
              <img src={userPic} alt="user_img" className="userImg" />
            </div>
            <h1 className="title">Welcome to your Dashboard</h1>
            <p className="description">
              Your uploaded APIs will be displayed here once you login to your
              account
            </p>
          </div>
        </div>
        <div className="right">
          <div className="rightContainer">
            <h1>Login to your account</h1>
            <form className="loginForm">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email address"
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
              />
              <input type="submit" value="Login/Signup" id="submit" />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
