import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth"; // Імпортуємо onAuthStateChanged
import { auth } from "../services/firebase"; // Імпортуємо auth з firebase.js
import logo from "../assets/images/logo.png";
import ScheduleModal from "./ScheduleModal";
import AuthModal from "./AuthModal";
import { useNavigate } from "react-router-dom"; // додай на початку

const Header = () => {
  const navigate = useNavigate(); // всередині компонента

  const [isScheduleOpen, setIsScheduleOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [userName, setUserName] = useState(null);

  // Використовуємо useEffect для перевірки стану автентифікації
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName || user.email);
      } else {
        setUserName(null);
      }
    });

    return () => unsubscribe(); // Очищаємо підписку
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUserName(null);
      navigate("/"); // переходимо на головну
      window.location.reload(); // оновлюємо сторінку повністю
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <header className="header">
        <Link to="/" className="logo">
          <img src={logo} alt="Logo" />
          <span className="company-name">Coursera</span>
        </Link>

        <nav className="navbar">
          <ul>
            <li>
              <Link
                to="/"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              >
                Головна
              </Link>
            </li>
            <li><Link to="/info">Про нас</Link></li>
            <li><Link to="/courses">Курси</Link></li>
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
            <li><Link to="/info">Контакти</Link></li>
          </ul>
        </nav>

        <div className="header-icons">
          {userName ? (
            <>
              <Link to="/profile" className="user-button">
                {userName}
              </Link>
              <i
  className="bx bx-log-out logout-icon"
  onClick={handleLogout}
  title="Вийти"
></i>

            </>
          ) : (
            <button className="sign-in-btn" onClick={() => setIsAuthOpen(true)}>
              Вхід
            </button>
          )}
          <div className="menu-toggle">&#9776;</div>
        </div>
      </header>

      <ScheduleModal isOpen={isScheduleOpen} onClose={() => setIsScheduleOpen(false)} />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        setUserName={setUserName}
      />
    </>
  );
};

export default Header;
