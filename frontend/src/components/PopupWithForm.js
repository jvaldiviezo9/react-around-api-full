import React, {useEffect, useState} from "react";
import "../blocks/Form.sass";
import closeIcon from "../images/close_icon.png";

const PopupWithForm = ({children, popupStatus, setPopupStatus}) => {

  const [isOpen, setIsOpen] = useState(false);

  useEffect(
    () => {
      setIsOpen(popupStatus);
    }, [popupStatus]
  )

  const handleCloseClick = () => {
    setPopupStatus(false);
  }

  return (
    <>
      {isOpen ?
        <div className="form">
          <img onClick={handleCloseClick} className="form__close-button" src={closeIcon} alt="close button"/>
          {children}
        </div>
      : null
      }
    </>
  )
}
export default PopupWithForm
