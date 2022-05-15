import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  let submitButtonText = props.isLoading ? "Изменение..." : "Сохранить";
  const avatarInputRef = React.useRef();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUserAvatar(avatarInputRef.current.value);
    e.target.reset();
  }

  React.useEffect(() => {
    avatarInputRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="new-avatar"
      title="Обновить аватар"
      formName="edit"
      isOpen={props.isOpen}
      formClass="popup__form_type_new-avatar"
      buttonLabel={submitButtonText}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        className="popup__input popup__input_type_avatarlink"
        name="avatarlink"
        id="avatarlink-input"
        placeholder="Введите URL"
        required
        ref={avatarInputRef}
      />
      <span className="popup__form-placeholder avatarlink-input-error" />
    </PopupWithForm>
  );
}
export default EditAvatarPopup;
