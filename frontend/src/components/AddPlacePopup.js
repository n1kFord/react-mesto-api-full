import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [newCard, setNewCard] = React.useState({ cardname: "", link: "" });
  let submitButtonText = props.isLoading ? "Добавление..." : "Создать";
  function handleChange(e) {
    setNewCard({
      ...newCard,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddPlace({
      cardname: newCard.cardname,
      link: newCard.link,
    });
    setNewCard({
      cardname: "",
      link: "",
    }); // решил оставить, ибо при самбите может произойти ошибка и попап не закроется
  }

  React.useEffect(() => {
    setNewCard({
      cardname: "",
      link: "",
    });
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="card-add"
      title="Новое место"
      formName="add"
      isOpen={props.isOpen}
      formClass="popup__form_type_card-add"
      buttonLabel={submitButtonText}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className="popup__input popup__input_type_card-name"
        name="cardname"
        id="cardname-input"
        minLength={2}
        maxLength={30}
        onChange={handleChange}
        value={newCard.cardname}
        required
        placeholder="Название"
      />
      <span className="popup__form-placeholder cardname-input-error" />
      <input
        type="url"
        className="popup__input popup__input_type_card-link"
        name="link"
        id="link-input"
        onChange={handleChange}
        value={newCard.link}
        required
        placeholder="Ссылка на картинку"
      />
      <span className="popup__form-placeholder link-input-error" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
