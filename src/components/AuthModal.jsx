import React, { useState } from "react";

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);

  // Login values & errors
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Signup values & errors
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  const [signupNameError, setSignupNameError] = useState("");
  const [signupEmailError, setSignupEmailError] = useState("");
  const [signupPasswordError, setSignupPasswordError] = useState("");

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidName = (name) =>
    /^[A-Za-zА-Яа-яІіЇїЄєҐґ'’\s-]+$/.test(name);

  const handleLogin = (e) => {
    e.preventDefault();

    let valid = true;

    if (!isValidEmail(loginEmail)) {
      setEmailError("Невалідний email");
      valid = false;
    } else {
      setEmailError("");
    }

    if (loginPassword.trim().length === 0) {
      setPasswordError("Пароль не може бути порожнім");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    console.log("Login:", loginEmail);
    onClose();
  };

  const handleSignup = (e) => {
    e.preventDefault();

    let valid = true;

    if (!isValidName(signupName)) {
      setSignupNameError("Ім’я не повинно містити цифри чи спецсимволи");
      valid = false;
    } else {
      setSignupNameError("");
    }

    if (!isValidEmail(signupEmail)) {
      setSignupEmailError("Невалідний email");
      valid = false;
    } else {
      setSignupEmailError("");
    }

    if (signupPassword.length < 6) {
      setSignupPasswordError("Пароль повинен містити щонайменше 6 символів");
      valid = false;
    } else {
      setSignupPasswordError("");
    }

    if (!valid) return;

    console.log("Signup:", signupEmail);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        <h2 id="modal-title">{isLogin ? "Sign In" : "Sign Up"}</h2>

        {isLogin ? (
          <form id="auth-form" onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginEmail}
              onChange={(e) => {
                setLoginEmail(e.target.value);
                setEmailError(isValidEmail(e.target.value) ? "" : "Невалідний email");
              }}
              required
            />
            <p className="error-message">{emailError}</p>

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginPassword}
              onChange={(e) => {
                setLoginPassword(e.target.value);
                setPasswordError(e.target.value.trim() ? "" : "Пароль не може бути порожнім");
              }}
              required
            />
            <p className="error-message">{passwordError}</p>

            <button type="submit">Login</button>
            <p>
              Don't have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(false); }}>
                Sign Up
              </a>
            </p>
          </form>
        ) : (
          <form id="signup-form" onSubmit={handleSignup}>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              value={signupName}
              onChange={(e) => {
                setSignupName(e.target.value);
                setSignupNameError(isValidName(e.target.value) ? "" : "Ім’я не повинно містити цифри чи спецсимволи");
              }}
              required
            />
            <p className="error-message">{signupNameError}</p>

            <input
              type="email"
              name="signup-email"
              placeholder="Email"
              value={signupEmail}
              onChange={(e) => {
                setSignupEmail(e.target.value);
                setSignupEmailError(isValidEmail(e.target.value) ? "" : "Невалідний email");
              }}
              required
            />
            <p className="error-message">{signupEmailError}</p>

            <input
              type="password"
              name="signup-password"
              placeholder="Password"
              value={signupPassword}
              onChange={(e) => {
                setSignupPassword(e.target.value);
                setSignupPasswordError(
                  e.target.value.length >= 6 ? "" : "Пароль повинен містити щонайменше 6 символів"
                );
              }}
              required
            />
            <p className="error-message">{signupPasswordError}</p>

            <button type="submit">Register</button>
            <p>
              Already have an account?{" "}
              <a href="#" onClick={(e) => { e.preventDefault(); setIsLogin(true); }}>
                Sign In
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthModal;
