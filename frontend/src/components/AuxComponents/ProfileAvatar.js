import React, {useState} from "react";
import editPencil from "../../images/edit_pencil.png";
import "../../blocks/Form.sass";
import EditAvatarPopup from "../EditAvatarPopup";

const ProfileAvatar = ({ApiElement, setUserObject, currentUser}) => {

  const [popupAvatar, setPopupAvatar] = useState(false);

  const handleClick = () => {
    setPopupAvatar(true);
  }

  return (
      <>
        <div onClick={handleClick} className="profile__avatar">
          <img className="profile__picture" src={currentUser.avatar} alt="profile picture" />
          <img className="profile__icon" src={editPencil} alt="edit icon" />
        </div>

        <EditAvatarPopup popupStatus={popupAvatar} setPopupStatus={setPopupAvatar} ApiElement={ApiElement} setUserObject={setUserObject}/>

      </>
  );
}
export default ProfileAvatar;
