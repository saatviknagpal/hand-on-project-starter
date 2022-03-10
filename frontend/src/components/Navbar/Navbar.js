import React, { useEffect, useState } from "react";
import logo from "../../images/logo.png";
import "./navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Modal from "../Modal/Modal";
import axios from "axios";

function Navbar() {
  const [openModal, setOpenModal] = useState(false);
  const [authState, setAuthState] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:1337/auth", {
        headers: {
          authorization: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState(false);
        } else {
          setAuthState(true);
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState(false);
    navigate("/");
  };

  const RenderMenu = () => {
    if (
      (authState && window.location.pathname == "/") ||
      (authState && window.location.pathname == "/apis")
    ) {
      return (
        <>
          <div className="menu">
            <Link to="/apis" className="nav-link">
              My APIs
            </Link>
            <Link to="/apis" className="nav-link">
              My Account
            </Link>
            <button
              className="modal"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              +New API
            </button>
            {openModal && <Modal closeModal={setOpenModal} />}
            <Icon icon="icon-park:logout" className="logout" onClick={logout} />
          </div>
        </>
      );
    } else if (window.location.pathname == "/") {
      return (
        <>
          <div className="nav">
            <Link to="login">
              <button className="loginButton">Login/Signup</button>
            </Link>
          </div>
        </>
      );
    } else {
      return null;
    }
  };
  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={logo} alt="" />
      </Link>

      <RenderMenu />
    </div>
  );
}

export default Navbar;
