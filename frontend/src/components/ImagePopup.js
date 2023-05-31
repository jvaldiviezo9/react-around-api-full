import React from 'react';
import closeIcon from "../images/close_icon.png";

const ImagePopup = ({ imageLink, onClose }) => {
  return (
    <div className="elements__popupContainer">
      <img onClick={onClose} className="elements__close-button" src={closeIcon} alt="close button"/>
      <img className="elements__imagePopup" src={imageLink} alt="" />
    </div>
  );
};
export default ImagePopup;
