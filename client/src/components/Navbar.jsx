import React from "react";
import { Link } from "react-router-dom";
import Logo from '../images/logo.png';

export function Navbar() {
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="links">
          <Link className="link" to="/?cat=art" > <h6> Art </h6></Link>
          <Link className="link" to="/?cat=science" > <h6> Science </h6></Link>
          <Link className="link" to="/?cat=technology" > <h6> Technology </h6></Link>
          <Link className="link" to="/?cat=cinema" > <h6> Cinema </h6></Link>
          <Link className="link" to="/?cat=design" > <h6> Design </h6></Link>
          <Link className="link" to="/?cat=food" > <h6> Food</h6></Link>
          <Link className="link" to="/register" ><h6>  Register</h6></Link>
          <span>Joih</span>
          <span>Logout</span>
          <span className="write" >
            <Link className="link" to="/write">Write</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
