import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    let { email, password } = userData;
    e.preventDefault();
    onRegister({ email, password }).catch((err) =>
      setMessage(err.message || "Что-то пошло не так!")
    );
  };

  const [message, setMessage] = useState("");

  return (
    <div className="signRoute">
      <p className="signRoute__header">Регистрация</p>
      <form className="register__form" name="signup" onSubmit={handleSubmit}>
        <input
          id="input-email"
          className="signRoute__input"
          name="email"
          type="email"
          placeholder="Email"
          value={userData.email}
          onChange={handleChange}
          autoComplete="off"
          required
        />

        <input
          id="input-password"
          className="signRoute__input"
          name="password"
          type="password"
          placeholder="Пароль"
          value={userData.password}
          onChange={handleChange}
          minLength="2"
          maxLength="20"
          autoComplete="off"
          required
        />
        <span id="signRoute-error" className="signRoute__error">
          {message}
        </span>

        <button className="signRoute__btn-submit" type="submit">
          Зарегистрироваться
        </button>
      </form>

      <div className="signRoute__bottom">
        <p className="signRoute__question">Уже зарегистрированы?</p>
        <Link to="signin" className="signRoute__login-link">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
