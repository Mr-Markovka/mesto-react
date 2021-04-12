import React, { useState } from "react";

function Login({ onLogin }) {
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
    e.preventDefault();
    onLogin(userData).catch((err) =>
      setMessage(err.message || "Что-то пошло не так!")
    );
  };
  const [message, setMessage] = useState("");

  return (
    <div className="signRoute login">
      <p className="signRoute__header">Вход</p>
      <form className="register__form" name="signin" onSubmit={handleSubmit}>
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
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
