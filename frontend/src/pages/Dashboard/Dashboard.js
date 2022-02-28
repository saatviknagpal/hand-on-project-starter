import React, { useContext, useState } from "react";
import userPic from "../../images/user_img.svg";
import "./dashboard.scss";
import { UserContext } from "../../App";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.status === "ok") {
      localStorage.setItem("accessToken", data.user);
      dispatch({ type: "USER", payload: true });
      alert("Login successful");
      navigate("/");
    } else {
      alert("Invalid Credentials");
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
              Not a member?{" "}
              <a className="redirect" href="/register">
                Register now
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
