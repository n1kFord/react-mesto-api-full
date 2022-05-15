import React from "react";

function Login(props) {
  const [authInfo, setAuthInfo] = React.useState({ email: "", password: "" });
  function handleChange(e) {
    setAuthInfo({
      ...authInfo,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAuthLogin(authInfo);
    setAuthInfo({ ...authInfo, password: "" });
  }
  return (
    <div className="auth">
      {/* сделал один класс, ибо они одинаковые. в будущем можно будет делать _type_login если нужно будет добавлять уникальности */}
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <fieldset className="auth__form-set">
          <input
            type="email"
            name="email"
            value={authInfo.email}
            placeholder="Email"
            className="auth__input"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            value={authInfo.password}
            placeholder="Пароль"
            className="auth__input"
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth__button auth__button_type_log">
            Войти
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default Login;
