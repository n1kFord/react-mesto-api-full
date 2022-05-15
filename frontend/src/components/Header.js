import headerLogoPath from "../images/header__logo.svg";
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <div className="header__container">
        <Link to="main">
          <img
            src={headerLogoPath}
            className="header__logo"
            alt="логотип шапки"
          />
        </Link>
        <Routes>
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__dynamic-link">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__dynamic-link">
                Регистрация
              </Link>
            }
          />
          <Route
            path="/main"
            element={
              <div className="header__ordinary-container">
                <p className="header__email">{props.email}</p>
                <Link
                  to="/sign-in"
                  className="header__dynamic-link header__dynamic-link_type_leave"
                  onClick={props.onUserLeave}
                >
                  Выйти
                </Link>
              </div>
            }
          />
        </Routes>
      </div>
      <div className="header__line" />
    </header>
  );
}

export default Header;
