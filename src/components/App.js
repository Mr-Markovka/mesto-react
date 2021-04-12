import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Login from "../components/Login";
import Register from "../components/Register";
import Header from "../components/Header";
import Main from "../components/Main";
import ImagePopup from "../components/ImagePopup";
import Footer from "../components/Footer";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "../components/EditProfilePopup";
import EditAvatarPopup from "../components/EditAvatarPopup";
import AddPlacePopup from "../components/AddPlacePopup";
import InfoTooltip from "../components/InfoTooltip";
import ProtectedRoute from "../components/ProtectedRoute";
import * as auth from "../utils/auth";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);
  // const [isDeletedCardPopupOpen, setIsDeletedCardPopupOpen] = React.useState(false); /*popup delete подтверждения */

  const [currentUser, setCurrentUser] = React.useState("");
  const [userEmail, setUserEmail] = React.useState("");
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedIn] = React.useState(false);

  const [userData, setUserData] = React.useState({
    email: "",
    password: "",
  });
  const history = useHistory();

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

  React.useEffect(() => {
    tokenCheck();
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [history, loggedIn]);

  const handleLogin = ({ email, password }) => {
    return auth.authorize(email, password).then((data) => {
      if (!data) throw new Error("Что-то пошло не так!");
      if (data.token) {
        setLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        history.push("/");
        setUserEmail(data.data.email);
        return;
      }
    });
  };

  const handleLogout = () => {
    history.push("/signin");
    setLoggedIn(true);
    localStorage.removeItem("jwt");
  };

  const handleRegister = ({ email, password }) => {
    return auth
      .register(email, password)
      .then((res) => {
        if (res.data._id) {
          setTooltipStatus("success");
          setIsInfoToolTipOpen(true);
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  };

  function tokenCheck() {
    if (localStorage.getItem("jwt")) {
      let jwt = localStorage.getItem("jwt");
      auth.getContent(jwt).then((data) => {
        if (data.data.email) {
          setLoggedIn(true);
          setUserData({ email: data.email, password: data.password });
          history.push("/");
          setUserEmail(data.data.email);
        }
      });
    }
  }

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
    setIsInfoToolTipOpen(false);
    // setIsDeletedCardPopupOpen(false); /*popup delete подтверждения */
  }

  return (
    <div className="page root">
      <CurrentUserContext.Provider value={currentUser}>
        <Header onLogout={handleLogout} userEmail={userEmail} />

        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onImagePopup={handleImagePopupClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Route path="/signin">
            <div className="loginContainer">
              <Login onLogin={handleLogin} />
            </div>
          </Route>

          <Route path="/signup">
            <div className="registerContainer">
              <Register onRegister={handleRegister} />
            </div>
          </Route>
        </Switch>

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

        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={tooltipStatus}
        />
        <ImagePopup
          isOpen={isImagePopupOpen}
          onClick={handleImagePopupClick}
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
