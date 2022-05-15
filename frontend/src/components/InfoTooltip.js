import React from "react";
import authSuccessPath from '../images/auth-success.svg';
import authErrorPath from '../images/auth-error.svg';

function InfoToolTip(props) {
  let status = props.status;
  let popupClass = props.isOpen ? `popup popup_opened` : `popup`;
  return (
    <div className={popupClass}>
      <div className="popup__container popup__container_type_auth">
        <button
          type="button"
          className="popup__close-icon"
          onClick={props.onClose}
        />
        <img src={status ? authSuccessPath : authErrorPath} alt="статус регистрации" className="popup__auth__icon"/>
        <h2 className="popup__auth__title">{status ? `Вы успешно зарегистрировались!` : `Что-то пошло не так! Попробуйте ещё раз.`}</h2>
      </div>
    </div>
  );
}

export default InfoToolTip;
