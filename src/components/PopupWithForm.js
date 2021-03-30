import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup-${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <form
        className="popup__form"
        name="form"
        onSubmit={props.onSubmit}
        noValidate
      >
        <button
          className="popup__btn-close"
          type="button"
          onClick={props.onClose}
        />
        <h2 className="popup__header">{props.title}</h2>

        {props.children}

        <button
          className="popup__btn-submit popup-profile__btn-submit"
          type="submit"
        >
          {props.submit}
        </button>
      </form>
    </section>
  );
}

export default PopupWithForm;
