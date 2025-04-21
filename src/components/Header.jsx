import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import ScheduleModal from "./ScheduleModal";
import AuthModal from "./AuthModal";

const Header = () => {
  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
          <span className="company-name">Coursera</span>
        </Link>

        <nav className="navbar">
          <ul>
            <li><Link to="/">Головна</Link></li>
            <li><Link to="/info">Про нас</Link></li>
            <li><a href="#courses">Курси</a></li>
            <li>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsScheduleOpen(true);
                }}
              >
                Розклад
              </a>
            </li>
            <li><a href="#footer">Контакти</a></li>
          </ul>
        </nav>

        <div className="header-icons">
          <button className="sign-in-btn" onClick={() => setIsAuthOpen(true)}>
            Вхід
          </button>
          <div className="menu-toggle">&#9776;</div>
        </div>
      </header>

      <ScheduleModal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Header;
