import React from "react";
import logo from "../../images/logo.svg";
import "./navbar.scss";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">
        <img className="logo" src={logo} alt="" />
      </Link>
    </div>
  );
}

export default Navbar;
