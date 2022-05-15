import React from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";

function Card(obj) {
  const newCard = obj.card;
  const currentUser = React.useContext(currentUserContext);
  const isOwner = newCard.owner === currentUser.id;
  let isLiked = newCard.likes.some((i) => i === currentUser.id);
  const cardLikeButtonClass = isLiked ? "element__like element__like_type_active" : "element__like";

  function handleCardClick(){
    obj.onClick(newCard.name, newCard.link);
  }

  function handleCardLike(){
    obj.onLike(newCard);
  }

  function handleCardDelete(){
    obj.onDelete(newCard);
  }

  return (
    <article className="element">
      <img
        src={newCard.link}
        className="element__image"
        onClick={handleCardClick}
        alt={newCard.name.toLowerCase()}
      />

      {isOwner && (
          <button
            className="element__delete-icon"
            onClick={handleCardDelete}
            alt="иконка удаления"
          />
      )}

      <div className="elements__ordinary-container">
        <h2 className="element__text">{newCard.name}</h2>
        <div className="element__like-container">
          <button
            type="button"
            className={cardLikeButtonClass}
            onClick={handleCardLike}
          />
          <span className="element__counter">{newCard.likes.length}</span>
        </div>
      </div>
    </article>
  );
}

export default Card;
