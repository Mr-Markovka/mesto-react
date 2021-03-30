import React, { useRef } from "react";
import PopupWithForm from "../components/PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      name="avatar"
      title="Обновить аватар"
      submit="Сохранить"
    >
      <input
        id="input-link-avatar"
        className="popup__input  popup-avatar__input input-avatar input-link"
        ref={avatarRef}
        name="avatar"
        type="url"
        placeholder="Ссылка на аватар"
        autoComplete="off"
        required
      />
      <label className="label">
        <span id="input-link-avatar-error" className="error label__span"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
