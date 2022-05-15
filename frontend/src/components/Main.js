import React from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";
import Card from "./Card";
import profileImageAfterPath from "../images/profile__image_after.svg";

function Main(props) {
  const user = React.useContext(currentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <div className="profile__main-container">
          <div
            className="profile__picture-container"
            onClick={props.onNewAvatar}
          >
            <img
              src={user.avatar}
              className="profile__image"
              alt="аватарка пользователя"
            />
            <img
              src={profileImageAfterPath}
              className="profile__avatar-edit"
              alt="Редактирование"
            />
          </div>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__name">{user.name}</h1>
              <p className="profile__about">{user.description}</p>
            </div>
            <button
              type="button"
              className="profile__edit-button"
              aria-label="редактировать профиль"
              onClick={props.onEditProfile}
            />
          </div>
        </div>
        <button
          type="button"
          className="profile__button"
          onClick={props.onCardAddButton}
        />
      </section>
      <section className="elements">
        {props.cardList.map((card) => (
          <Card
            card={card}
            key={card._id}
            currentUser={user}
            onClick={props.onCardClick}
            onDelete={props.onCardDelete}
            onLike={props.onCardLike}
          />
        ))}
        {/* первоначальный рендер карточек */}
      </section>
    </main>
  );
}

export default Main;
