import React from "react";
import Logo from "../images/logo.png";

export function Footer() {
  return (
    <footer>
      <img src={Logo} alt="logo" />
      <span>
        Made with and <b>ReactJS</b>
      </span>
    </footer>
  );
}
