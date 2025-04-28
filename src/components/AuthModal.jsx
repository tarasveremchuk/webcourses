import React, { useState } from "react";
import { auth } from "../services/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

const allowedDomains = ["gmail.com", "ukr.net", "icloud.com", "meta.ua", "i.ua", "hotmail.com"];
  
const AuthModal = ({ isOpen, onClose, setUserName }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupError, setSignupError] = useState("");
  const resetForm = () => {
    setLoginEmail("");
    setLoginPassword("");
    setLoginError("");
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setSignupError("");
    setHasTriedSubmit(false);
  };
  
  const isValidEmail = (email) => {
    // Строга перевірка на формат email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) return false;
  
    const domain = email.split("@")[1];
    return allowedDomains.includes(domain);
  };
  
  

  const isValidName = (name) => /^[A-Za-zА-Яа-яІіЇїЄєҐґ'’\s-]+$/.test(name);

  const handleLogin = async (e) => {
    e.preventDefault();
    setHasTriedSubmit(true);
    setLoginError("");

    if (!isValidEmail(loginEmail)) {
      setLoginError("Невалідна електронна адреса");
      return;
    }

    if (loginPassword.trim().length === 0) {
      setLoginError("Пароль не може бути порожнім");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;
      setUserName(user.displayName || user.email);
      onClose();
    } catch (error) {
      const code = error.code;
      if (code === "auth/user-not-found") {
        setLoginError("Користувача не знайдено");
      } else if (code === "auth/wrong-password") {
        setLoginError("Невірний пароль");
      } else {
        setLoginError("Помилка входу. Спробуйте ще раз.");
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setHasTriedSubmit(true);
    setSignupError("");

    if (!isValidName(signupName)) {
      setSignupError("Ім’я не повинно містити цифри чи спецсимволи");
      return;
    }

    if (!isValidEmail(signupEmail)) {
      setSignupError("Невалідна електронна адреса");
      return;
    }

    if (signupPassword.length < 8 || signupPassword.length > 72) {
      setSignupError("Пароль має бути від 8 до 72 символів");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      const user = userCredential.user;
      await updateProfile(user, { displayName: signupName });
      setUserName(signupName);
      onClose();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        setSignupError("Цей email вже використовується");
      } else {
        setSignupError("Помилка при реєстрації");
      }
    }
  };

  const handleForgotPassword = async () => {
    if (!loginEmail || !isValidEmail(loginEmail)) {
      setLoginError("Введіть коректну електронну адресу");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, loginEmail);
      setLoginError("Лист для відновлення паролю надіслано на вашу пошту");
    } catch (error) {
      setLoginError("Помилка при надсиланні листа. Спробуйте ще раз.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal" onClick={() => {
      resetForm();
      onClose();
    }}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
      <span className="auth-close-btn" onClick={() => {
  resetForm();
  onClose();
}}>&times;</span>
        <h2 className="auth-title">{isLogin ? "З поверненням!" : "Реєстрація"}</h2>

        {isLogin ? (
          <form onSubmit={handleLogin}>
            <label className="auth-label">Електронна пошта *</label>
            <input
              className="auth-input"
              type="text"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
            <label className="auth-label">Пароль *</label>
            <input
              className="auth-input"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              required
            />
         
            <button type="submit" className="auth-submit-btn">Увійти</button>
            {hasTriedSubmit && loginError && (
              <p className="auth-error-msg">{loginError}</p>
            )}
            <p
              className="auth-forgot"
              onClick={handleForgotPassword}
              style={{ cursor: "pointer", marginTop: "8px" }}
            >
              Забули пароль?
            </p>
            <p style={{ marginTop: "12px" }}>
              Вперше на Coursera?{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer", color: "blue" }}
                onClick={() => {
                  setIsLogin(false);
                  setHasTriedSubmit(false);
                  setLoginError("");
                }}
              >
                Реєстрація
              </span>
            </p>
            <p style={{ fontSize: "0.9em", color: "#666", marginTop: "6px" }}>
              Навчайтеся у провідних університетів і компаній у зручний для вас час.
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <label className="auth-label">Повне ім’я *</label>
            <input
              className="auth-input"
              type="text"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
              required
            />
            <label className="auth-label">Електронна пошта *</label>
            <input
              className="auth-input"
              type="text"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              required
            />
            <label className="auth-label">Пароль *</label>
            <input
              className="auth-input"
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              required
            />
            <p style={{ fontSize: "0.9em", color: "#666" }}>Від 8 до 72 символів</p>
            {hasTriedSubmit && signupError && (
              <p className="auth-error-msg">{signupError}</p>
            )}
            <button type="submit" className="auth-submit-btn">Зареєструватися</button>
            <p style={{ marginTop: "12px" }}>
              Ви вже в Coursera?{" "}
              <span
                style={{ textDecoration: "underline", cursor: "pointer", color: "blue" }}
                onClick={() => {
                  setIsLogin(true);
                  setHasTriedSubmit(false);
                  setSignupError("");
                }}
              >
                Увійти
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
