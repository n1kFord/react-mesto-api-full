import React from "react";
import { currentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(currentUserContext);
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");

  let submitButtonText = props.isLoading ? "Изменение..." : "Сохранить";

  React.useEffect(() => {
    setUserName(currentUser.name);
    setUserDescription(currentUser.description);
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUserInfo({
      fullname: userName,
      about: userDescription,
    });
  }
  function handleChange(e) {
    e.target.name === "fullname" ? setUserName(e.target.value) : setUserDescription(e.target.value);
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      formName="change"
      isOpen={props.isOpen}
      formClass="popup__form_type_edit"
      buttonLabel={submitButtonText}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_name"
        name="fullname"
        value={userName || ''}
        onChange={handleChange}
        required
        id="fullname-input"
        minLength={2}
        maxLength={40}
        placeholder="Имя"
      />
      <span className="popup__form-placeholder fullname-input-error" />
      <input
        type="text"
        value={userDescription || ''}
        onChange={handleChange}
        className="popup__input popup__input_type_about"
        name="about"
        id="about-input"
        required
        minLength={2}
        maxLength={200}
        placeholder="о себе"
      />
      <span className="popup__form-placeholder about-input-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
