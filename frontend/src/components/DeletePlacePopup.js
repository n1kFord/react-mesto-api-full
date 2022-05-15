import React from "react";
import PopupWithForm from "./PopupWithForm";

function DeletePlacePopup(props) {
    
  let submitButtonText = props.isLoading ? "Удаление..." : "Да";

  function handleSubmit(e) {
    e.preventDefault();
    props.onDeletePlace();
  }

  return (
    <PopupWithForm
      name="card-delete"
      title="Вы уверены?"
      formName="delete"
      isOpen={props.isOpen}
      formClass="popup__form_type_delete-popup"
      buttonLabel={submitButtonText}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    />
  );
}

export default DeletePlacePopup;
