import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip(props) {
  return (
    <section
      className={`popup popup-infoTooltip ${props.isOpen && "popup_opened"}`}
    >
      {props.status === "success" ? (
        <div className="popup__form">
          <button
            className="popup__btn-close"
            type="button"
            onClick={props.onClose}
          />
          <img className="popup-infoTooltip__image" src={success} />
          <p className="popup-infoTooltip__message">
            Вы успешно зарегистрировались!
          </p>
        </div>
      ) : (
        <div className="popup__form">
          <button
            className="popup__btn-close"
            type="button"
            onClick={props.onClose}
          />
          <img className="popup-infoTooltip__image" src={fail} />
          <p className="popup-infoTooltip__message">
            Что-то пошло не так! Попробуйте ещё раз.
          </p>
        </div>
      )}
    </section>
  );
}

export default InfoTooltip;
