import React, { useContext } from 'react';

import editButton from '../images/editButton.svg';
import addButtonVector from '../images/addButtonVector.svg';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = useContext(CurrentUserContext);
    const onImgClick = (data)=>{
        props.onCardClick(data);
        props.onImagePopup();
    };

    // const onBasketClick = (data)=>{  /*popup delete подтверждения */
    //     props.onDeletedCardPopup(data);
    // };

  return (
      <>
    <main className="content">

    <section className="profile">
        <a className="profile__avatar-container" target="_self" href="# " onClick={props.onEditAvatar}>
            <img className="profile__avatar" alt="фото автора." src={`${currentUser.avatar}`} />
        </a>
        <div className="profile__info">
            <div className="profile__group">
                <h1 className="profile__info-name">{`${currentUser.name}`}</h1>
                <button className="profile__open-button" type="button" onClick={props.onEditProfile}><img alt="#"
                        src={editButton} /></button>
            </div>
            <p className="profile__info-about">{`${currentUser.about}`}</p>
        </div>

        <button className="profile__add-button" type="button" onClick={props.onAddPlace}><img className="profile__add-button-vector" alt="#"
                src={addButtonVector} /></button>
    </section>

        <section className="elements">
        <ul className="cards"> 
            {props.cards.map(item=>
            <Card
            key={item._id}
            card={item}
            alt={item.name}
            src={item.link}
            title={item.name}
            likes={item.likes}
            owner={item.owner}
            onCard={onImgClick}
            onCardLike={props.onCardLike}
            onCardDelete={props.onCardDelete}
            // onBasket={onBasketClick} /*popup delete подтверждения */
            />
            )}

        </ul>
    </section>
</main>

    </>
  );
}

export default Main;