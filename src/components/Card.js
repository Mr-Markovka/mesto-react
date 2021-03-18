import React from 'react';

function Card(props){
    // console.log('####Card-props', props);
    function handleClick() {
        props.onCard(props);
    }
    function handleBasket(){
        props.onBasket(props);
    }

    return(
   
        <li className="cards__item card">
            <button className="cards__btn-remove" type="button" onClick={handleBasket}/>
            <img className="cards__img" alt={props.alt} src={props.src} onClick={handleClick}/>
            <div className="cards__bottom">
                <h3 className="cards__title">{props.title}</h3>
                <div className="cards__like-group">
                    <button className="cards__btn-like cards__like" type="button"/>
                    <p className="cards__number">{props.likes.length}</p>
                </div>

            </div>
        </li>
   
    )

}

export default Card;