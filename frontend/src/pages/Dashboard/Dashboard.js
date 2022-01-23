import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import userPic from "../../images/user_img.svg";
import "./dashboard.scss";

function Dashboard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.user) {
      localStorage.setItem("token", data.user);
      alert("Login successful");
      window.location.href = "/";
    } else {
      alert("Please check your username and password");
    }
  }
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
            <form className="loginForm" onSubmit={loginUser}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                id="email"
                placeholder="Email address"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                id="password"
                placeholder="Password"
              />
              <input type="submit" value="Login" id="submit" />
            </form>
            <div className="register">
              Not a member? <a className="redirect" href="/register">Register now</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
