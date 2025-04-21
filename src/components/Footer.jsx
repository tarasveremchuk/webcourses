import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png"; 
import "boxicons/css/boxicons.min.css"; 
import "../assets/styles/main.css"; 

const Footer = () => {
  return (
    <footer className="footer" id="footer">
      <div className="footer-container">
        <div className="subscribe-card">
          <h3>Підпишись на Нашу Розсилку</h3>
          <p>Отримуй останні новини та ексклюзивні пропозиції.</p>
          <input type="email" placeholder="Введи свій EMAIL" className="email-input" />
          <button className="subscribe-button">Підписатись</button>
          <p className="terms-text">
            Натискаючи "підписатися", ви погоджуєтеся з нашими{" "}
            <Link to="/terms" style={{ textDecoration: "underline" }}>
              умовами використання
            </Link>.
          </p>
        </div>

        <div className="info-section">
          <div className="info-columns">
            <div>
              <h4>Компанія</h4>
              <ul>
                <li><Link to="/info#company"
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}>Про нас</Link></li>
                <li><Link to="/info#company"    onClick={() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}>Кар'єри</Link></li>
                <li><Link to="/info#company"    onClick={() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}>Преса</Link></li>
              </ul>
            </div>
            <div>
              <h4>Інформація</h4>
              <ul>
                <li><Link to="/info#info"    onClick={() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}>Блог</Link></li>
                <li><Link to="/info#info"    onClick={() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}>Ціни</Link></li>
                <li><Link to="/info#info"    onClick={() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}>Партнери</Link></li>
              </ul>
            </div>
            <div>
              <h4>Help</h4>
              <ul>
                <li><Link to="/info#help"    onClick={() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}>Підтримка</Link></li>
                <li><Link to="/info#help"    onClick={() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}>Контакти</Link></li>
                <li><Link to="/info#help"    onClick={() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}>FAQs</Link></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <div className="social-icons">
              <a href="https://www.instagram.com/"><i className='bx bxl-instagram'></i></a>
              <a href="https://www.tiktok.com/"><i className='bx bxl-tiktok'></i></a>
              <a href="https://www.youtube.com/"><i className='bx bxl-youtube'></i></a>
            </div>
            <div className="footer-bottom-content">
              <div className="footer-left">
                <img src={logo} alt="Company Logo" className="footer-logo" />
              </div>
              <div className="footer-right">
                <div className="policy-text">
                  <Link to="/privacy" style={{ textDecoration: "underline" }}>Політика конфіденційності</Link> |{" "}
                  <Link to="/terms" style={{ textDecoration: "underline" }}>Умови використання</Link><br />
                  Ваші дані є важливими для нас, і ми прагнемо забезпечити максимальний рівень їх безпеки під час використання наших курсів.
                  Наші курси призначені лише для осіб віком від 18 років.
                  Всі матеріали, що надаються на курсах, є власністю Courslab Inc. і не можуть бути використані без дозволу.<br />
                  &copy; 2025 Courslab Inc. 340 S Lemon Ave #7499, Walnut, CA 91789
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
