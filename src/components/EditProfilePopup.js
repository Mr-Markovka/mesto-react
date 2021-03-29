import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from '../components/PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props){
    const currentUser = useContext(CurrentUserContext);

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]); 


  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description,
    });
  } 

    return(
        <PopupWithForm isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit} name="profile" title="Редактировать профиль" submit="Сохранить">
        <input id="input-name" className="popup__input input-name" name="name" type="text" placeholder="Имя" defaultValue={name} onChange={handleChangeName}
            minLength="2" maxLength="40" autoComplete="off" required />
        <label className="label">
            <span id="input-name-error" className="error label__span label__span_popup-profile"></span>
        </label>
        <input id="input-about" className="popup__input input-about" name="about" type="text" placeholder="О себе" defaultValue={description} onChange={handleChangeDescription}
            minLength="2" maxLength="200" autoComplete="off" required />
        <label className="label">
            <span id="input-about-error" className="error label__span label__span_popup-profile"></span>
        </label>
    </PopupWithForm>
    );

}

export default EditProfilePopup;