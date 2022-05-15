import React from "react";

function PopupWithForm(props) {
  let popupClass = props.isOpen ? `popup ${props.name}-popup popup_opened` : `popup ${props.name}-popup`;
  return (
    <article className={popupClass}>
      <div className={`popup__container ${props.name}-popup__container`}>
        <button
          type="button"
          className="popup__close-icon"
          onClick={props.onClose}
        />

        <h2 className="popup__title">{props.title}</h2>

        <form
          className={`popup__form ${props.formClass}`}
          onSubmit={props.onSubmit}
          name={props.formName}
        >
          <fieldset className="popup__form-set">
            {props.children}
            <button type="submit" className="popup__button">
              {props.buttonLabel}
            </button>
          </fieldset>
        </form>
      </div>
    </article>
  );
}

export default PopupWithForm;
