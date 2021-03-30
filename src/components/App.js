import React from "react";
import Header from "../components/Header";
import Main from "../components/Main";
import ImagePopup from "../components/ImagePopup";
import Footer from "../components/Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import AddPlacePopup from "../components/AddPlacePopup";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  // const [isDeletedCardPopupOpen, setIsDeletedCardPopupOpen] = React.useState(false); /*popup delete подтверждения */

  const [currentUser, setCurrentUser] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInfoUser()
      .then((data) => {
        setCurrentUser(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .getCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleImagePopupClick() {
    setIsImagePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  // function handleDeleteCardPopupClick(){  /*popup delete подтверждения */
  //     setIsDeletedCardPopupOpen(true);
  // }

  function handleUpdateUser(data) {
    api
      .setUserInfo(data)
      .then((resData) => {
        setCurrentUser(resData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api
      .setUserAvatar(data)
      .then((resData) => {
        setCurrentUser(resData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopupOpen(false);
    // setIsDeletedCardPopupOpen(false); /*popup delete подтверждения */
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page root">
        <Header />
        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onImagePopup={handleImagePopupClick}
          onCardClick={handleCardClick}
          cards={cards}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
          // onDeletedCardPopup={handleDeleteCardPopupClick}  /*popup delete подтверждения */
        />
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/*popup delete подтверждения */}
        {/* <PopupWithForm isOpen={isDeletedCardPopupOpen} onClick={handleDeleteCardPopupClick} onClose={closeAllPopups} name="confirm" title="Вы уверены?" submit="Да"/> */}

        <ImagePopup
          isOpen={isImagePopupOpen}
          onClick={handleImagePopupClick}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
