import React from "react";
import logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
      <a className="header__link" target="_self" href="# ">
        <img className="header__logo" alt="Логотип место Россия." src={logo} />
      </a>
    </header>
  );
}

export default Header;
