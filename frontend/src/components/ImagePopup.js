import React from "react";

function ImagePopup(props) {
  let popupClass = `popup element-popup ${props.isOpen && 'popup_opened'}`;

  return (
    <div className={popupClass}>
      <div className="element-popup__container">
        <button
          type="button"
          className="popup__close-icon"
          onClick={props.onClose}
        />
        <img
          src={props.card.link}
          className="element-popup__image"
          alt={props.card.name}
        />
        <p className="element-popup__text">{props.card.name}</p>
      </div>
    </div>
  );
}

export default ImagePopup;
