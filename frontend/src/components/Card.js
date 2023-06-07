import React, {useEffect, useState, useContext} from "react";
import ImagePopup from "./ImagePopup";

import trashIcon from "../images/trash_icon.png";
import likeDefault from "../images/like/like_default.png";
import likeActive from "../images/like/like_active.png";
import likeHover from "../images/like/like_hover.png";

import {CurrentUserContext} from "../contexts/CurrentUserContext";

const Card = (props) => {

  const {currentUser} = useContext(CurrentUserContext);
  const [likeSrc, setLikeSrc] = useState([false,likeDefault]);

  const setCards = props.setCards;

  const ApiElement = props.ApiElement
  const cardObject = props.cardObject;


  useEffect(() => {
    cardObject.likes.forEach((like) => {
      if (like === currentUser._id) {
        setLikeSrc([true,likeActive]);
        return;
      }
    })
  }, [currentUser, cardObject])

  const onLikeClick = () => {
    if (likeSrc[0]) setLikeSrc([false,likeDefault]);
    else setLikeSrc([true,likeActive]);
  };

  const onLikeHover = () => {
    if (likeSrc[0]===false) setLikeSrc([false, likeHover]);
  }
  const onLikeUnhover = () => {
    if (likeSrc[0]===false) setLikeSrc([false, likeDefault]);
  };

  const likeFunction = () => {

    let card_id = cardObject._id;

    if (likeSrc[0]) {
      ApiElement.deleteLike(card_id)
      .then((data) => {
        
        if (!Array.isArray(data.likes)) {
          cardObject.likes = []
          setLikeSrc([false,likeDefault]);
        }else{
          cardObject.likes = data.likes;
          setLikeSrc([false,likeDefault]);
        }
        
      })
      .catch((err) => {
        console.log(err);
      })
    }
    else {
      ApiElement.putLike(card_id)
      .then((data) => {
        setLikeSrc([true,likeActive]);
        cardObject.likes = data.likes;
      })
      .catch((err) => {
        console.log(err);
      })
    }

  }

  const handleCardDelete = () => {
    let card_id = cardObject._id;
    ApiElement.deleteCard(card_id)
    .then((data) => {
      // remove the card from the DOM
      // render again the cards
        setCards(data)
      })
    .catch((err) => {
      console.log(err);
    })
  }

  const imageOpen = () => {
    setImagePopup(true);
    //console.log("click");
  };

  const [imagePopup, setImagePopup] = useState(false);
  const imageClose = () => {
    setImagePopup(false);
  };

  return (
    <>
      <div className="elements__card" data-user-id={cardObject._id}>

        {(cardObject.owner[0] === currentUser._id) &&
            <img className="elements__trash" onClick={handleCardDelete} src={trashIcon} alt="trash icon" />}

        <img onClick={imageOpen} className="elements__image" src={cardObject.link} alt="" />
        <div className="elements__info">
          <h2 className="elements__text">{cardObject.name}</h2>
          <button className="elements__like" onClick={onLikeClick} onMouseEnter={onLikeHover} onMouseLeave={onLikeUnhover}>
            <img onClick={likeFunction} className="elements__icon" src={likeSrc[1]} alt="like_icon" />
            <span className="elements__like-counter">{cardObject.likes.length}</span>
          </button>
        </div>
      </div>
      {imagePopup && <ImagePopup imageLink={cardObject.link} onClose={imageClose} />}
    </>
  );
};

export default Card;

