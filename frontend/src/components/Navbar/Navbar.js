import React from "react";
import logo from "../../images/logo.svg"
import "./navbar.scss"

function Navbar() {
  return (
    <div className="navbar">
        <img src={logo} alt="" />
    </div>
  );
}

export default Navbar;