import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);

  const isOwn = props.card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `cards__btn-remove ${
    isOwn ? "cards__btn-remove_visible" : "cards__btn-remove_hidden"
  }`;

  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `cards__btn-like ${
    isLiked ? "cards__like_active" : "cards__like"
  }`;

  function handleClick() {
    props.onCard(props.card);
  }

  function handleLike() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  // function handleBasket(){  /*popup delete подтверждения */
  //     props.onBasket(props);
  // }

  return (
    <li className="cards__item card">
      <button
        className={cardDeleteButtonClassName}
        type="button"
        onClick={handleDeleteClick}
      />{" "}
      {/*onClick={handleBasket} для popup delete подтверждения */}
      <img
        className="cards__img"
        alt={props.card.name}
        src={props.card.link}
        onClick={handleClick}
      />
      <div className="cards__bottom">
        <h3 className="cards__title">{props.card.name}</h3>
        <div className="cards__like-group">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLike}
          />{" "}
          {/* onClick={handleLike} для popup delete подтверждения */}
          <p className="cards__number">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
