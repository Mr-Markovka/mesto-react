import React from 'react';
import Header from '../components/Header';
import Main from '../components/Main';
import PopupWithForm from '../components/PopupWithForm';
import ImagePopup from '../components/ImagePopup';
import Footer from '../components/Footer';


function App() {

    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState(false);
    const [isDeletedCard, setIsDeletedCard] = React.useState(false);

    function handleEditAvatarClick (){
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick(){
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick(){
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(card){
        setSelectedCard(card);
    }

    function handleDeleteCardClick(){
        setIsDeletedCard(true);
    }


    function closeAllPopups(){
        setIsEditAvatarPopupOpen(false);
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard(false);
        setIsDeletedCard(false);
    }

  return (
    <div className="page root">

        <Header />
        <Main 
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onDeletedCard={handleDeleteCardClick}
        />
        <Footer />
        <PopupWithForm isOpen={isEditProfilePopupOpen}  onClick={handleEditProfileClick} onClose={closeAllPopups} name="profile" title="Редактировать профиль" submit="Сохранить">
            <input id="input-name" className="popup__input input-name" name="name" type="text" placeholder="Имя"
                minLength="2" maxLength="40" autoComplete="off" required />
            <label className="label">
                <span id="input-name-error" className="error label__span label__span_popup-profile"></span>
            </label>
            <input id="input-about" className="popup__input input-about" name="about" type="text" placeholder="О себе"
                minLength="2" maxLength="200" autoComplete="off" required />
            <label className="label">
                <span id="input-about-error" className="error label__span label__span_popup-profile"></span>
            </label>
        </PopupWithForm>

        <PopupWithForm isOpen={isEditAvatarPopupOpen} onClick={handleEditAvatarClick} onClose={closeAllPopups} name="avatar" title="Обновить аватар" submit="Сохранить">
            <input id="input-link-avatar" className="popup__input  popup-avatar__input input-avatar input-link"
                name="avatar" type="url" placeholder="Ссылка на аватар" autoComplete="off" required />
            <label className="label">
                <span id="input-link-avatar-error" className="error label__span"></span>
            </label>
        </PopupWithForm>

        <PopupWithForm isOpen={isAddPlacePopupOpen} onClick={handleAddPlaceClick} onClose={closeAllPopups} name="add" title="Новое место" submit="Создать">
            <input id="input-title" className="popup__input popup-add__input input-title" name="name" type="text"
                minLength="2" maxLength="30" placeholder="Название" autoComplete="off" required />
            <label className="label">
                <span id="input-title-error" className="error label__span"></span>
            </label>
            <input id="input-link" className="popup__input popup-add__input input-link" name="link" type="url"
                placeholder="Ссылка на картинку" autoComplete="off" required />
            <label className="label">
                <span id="input-link-error" className="error label__span"></span>
            </label>
        </PopupWithForm>

        <PopupWithForm isOpen={isDeletedCard} onClick={handleDeleteCardClick} onClose={closeAllPopups} name="confirm" title="Вы уверены?" submit="Да"/>

        <ImagePopup card={selectedCard} onClose={closeAllPopups} name="img" title=""/>

    </div>
  
  );
}

export default App;
