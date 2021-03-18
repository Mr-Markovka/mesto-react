import React from 'react';

function ImagePopup(props){
    return (
        <section className={`popup popup-img ${props.card && 'popup_opened'}`}>
        <div className="popup__img-window">
            <button className="popup__btn-close popup-img__btn-close" type="button" onClick={props.onClose}/>
            <img className="popup__image" alt={props.card.title} src={props.card.src} />
            <p className="popup__alt">{props.card.title}</p>
        </div>
        </section>
    );
}
export default ImagePopup;