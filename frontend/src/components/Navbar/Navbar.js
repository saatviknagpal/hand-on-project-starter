import React, { useContext, useState } from "react";
import logo from "../../images/logo.svg";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Modal from "../Modal/Modal";

function Navbar() {
  const { state } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);

  const RenderMenu = () => {
    if (state && window.location.pathname == "/") {
      return (
        <>
          <div className="menu">
            <Link to="apis" className="nav-link">
              My APIs
            </Link>
            <Link to="account" className="nav-link">
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
            {openModal && <Modal closeModal={setOpenModal}/>}
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
