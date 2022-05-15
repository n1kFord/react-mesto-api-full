import React from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [authInfo, setAuthInfo] = React.useState({ email: "", password: "" });
  function handleChange(e) {
    setAuthInfo({
      ...authInfo,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAuthRegister(authInfo);
    setAuthInfo({ email: "", password: "" });
  }
  return (
    <div className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__form-set">
          <input
            type="email"
            name="email"
            value={authInfo.email}
            onChange={handleChange}
            placeholder="Email"
            className="auth__input"
            required
          />
          <input
            type="password"
            name="password"
            value={authInfo.password}
            onChange={handleChange}
            placeholder="Пароль"
            className="auth__input"
            required
          />
          <button type="submit" className="auth__button auth__button_type_reg">
            Зарегистрироваться
          </button>
        </fieldset>
      </form>
      <Link to="/sign-in" className="auth__hint">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
