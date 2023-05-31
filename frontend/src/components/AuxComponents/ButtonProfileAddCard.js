import React, {useState} from "react";
import "../../blocks/Form.sass";
import AddPlacePopup from "../AddPlacePopup";
const ButtonProfileAdd = ({ApiElement}) => {

  const [popupAddImage, setPopupAddImage] = useState(false);

  const handleClick = () => {
    setPopupAddImage(true);
  }

  return (
    <>
      <button onClick={handleClick} className="profile__add">+</button>
      <AddPlacePopup popupStatus={popupAddImage} setPopupStatus={setPopupAddImage} ApiElement={ApiElement} />
    </>)
}

export default ButtonProfileAdd;
