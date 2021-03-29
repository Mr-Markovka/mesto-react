import React, { useRef } from 'react';
import PopupWithForm from '../components/PopupWithForm';

function AddPlacePopup(props){

    const cardNameRef = useRef();
    const cardLinkRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();
      
        props.onAddPlace({
            name: cardNameRef.current.value,
                link: cardLinkRef.current.value
        });
    } 

    return(
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name="add" title="Новое место" submit="Создать">
            <input id="input-title" className="popup__input popup-add__input input-title" name="name" type="text" ref={cardNameRef}
                minLength="2" maxLength="30" placeholder="Название" autoComplete="off" required />
            <label className="label">
                <span id="input-title-error" className="error label__span"></span>
            </label>
            <input id="input-link" className="popup__input popup-add__input input-link" name="link" type="url" ref={cardLinkRef}
                placeholder="Ссылка на картинку" autoComplete="off" required />
            <label className="label">
                <span id="input-link-error" className="error label__span"></span>
            </label>
        </PopupWithForm>

    );

}

export default AddPlacePopup;