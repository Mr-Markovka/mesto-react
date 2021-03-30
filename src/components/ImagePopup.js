import React from "react";

function ImagePopup(props) {
  return (
    <section className={`popup popup-img ${props.isOpen && "popup_opened"}`}>
      <div className="popup__img-window">
        <button
          className="popup__btn-close popup-img__btn-close"
          type="button"
          onClick={props.onClose}
        />
        <img
          className="popup__image"
          alt={props.card.name}
          src={props.card.link}
        />
        <p className="popup__alt">{props.card.name}</p>
      </div>
    </section>
  );
}
export default ImagePopup;
