import React from "react";
import logo from "../images/logo.svg";
import { Link, Route } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__link" target="_self" href="# ">
        <img className="header__logo" alt="Логотип место Россия." src={logo} />
      </div>
      <Route path="/signup">
        <Link to="/signin" className="header__auth">
          <p className="header__auth-link">Войти</p>
        </Link>
      </Route>
      <Route path="/signin">
        <Link to="/signup" className="header__auth-link">
          <p className="header__auth-link">Регистрация</p>
        </Link>
      </Route>
      <Route exact path="/">
        <Link to="/signin" className="header__auth-link">
          <div className="header__auth-block">
            <p className="header__email">{props.userEmail}</p>
            <p className="header__auth-link" onClick={props.onLogout}>
              Выйти
            </p>
          </div>
        </Link>
      </Route>
    </header>
  );
}

export default Header;
