import React, { useState, useEffect } from 'react';

import editButton from '../images/editButton.svg';
import addButtonVector from '../images/addButtonVector.svg';
import api from '../utils/api';
import Card from './Card';

function Main(props) {
    let [userName, setUserName] = useState();
    let [userDescription, setUserDescription] = useState();
    let [userAvatar, setUserAvatar] = useState();
    let [cards, setCards] = useState([]);
 
    useEffect(()=>{
        api.getInfoUser()
        .then(res=>{
            setUserName(res.name);
            setUserDescription(res.about);
            setUserAvatar(res.avatar);
        })
        .catch((err)=>{
            console.log(err)
        })
    }, []);

    useEffect(()=>{
        api.getInitialCards()
            .then(data=>{
                setCards(data);
            })
            .catch((err)=>{
                console.log(err);
            });

    },[]);

    const onImgClick = (data)=>{
        props.onCardClick(data);
    }
    const onBasketClick = (data)=>{
        props.onDeletedCard(data);
    }

  return (
      <>
    <main className="content">

    <section className="profile">
        <a className="profile__avatar-container" target="_self" href="# " onClick={props.onEditAvatar}>
            <img className="profile__avatar" alt="фото автора." src={`${userAvatar}`} />
        </a>
        <div className="profile__info">
            <div className="profile__group">
                <h1 className="profile__info-name">{`${userName}`}</h1>
                <button className="profile__open-button" type="button" onClick={props.onEditProfile}><img alt="#"
                        src={editButton} /></button>
            </div>
            <p className="profile__info-about">{`${userDescription}`}</p>
        </div>

        <button className="profile__add-button" type="button" onClick={props.onAddPlace}><img className="profile__add-button-vector" alt="#"
                src={addButtonVector} /></button>
    </section>

    
    <section className="elements">
        <ul className="cards"> 
            {cards.map(item=>
            <Card
            key={item._id}
            alt={item.name}
            src={item.link}
            title={item.name}
            likes={item.likes}
            onCard={onImgClick}
            onBasket={onBasketClick}
            />
            )}

        </ul>
    </section>
</main>

    </>

  );
}

export default Main;