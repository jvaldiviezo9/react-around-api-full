import React, {useState} from "react";
import "../../blocks/Form.sass";
import EditProfilePopup from "../EditProfilePopup";
const ButtonProfileEdit = ({ApiElement, setUserObject}) => {

  const [popupPerfil, setPopupPerfil] = useState(false);

  const handleClick = () => {
    setPopupPerfil(true);
  }

  return (
    <>
      <button onClick={handleClick} className="profile__edit"></button>
      <EditProfilePopup popupStatus={popupPerfil} setPopupStatus={setPopupPerfil} ApiElement={ApiElement} setUserObject={setUserObject}/>
    </>
  );
}

export default ButtonProfileEdit;
