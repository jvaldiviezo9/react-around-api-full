import React, {useContext} from "react";
import ProfileAvatar from "./ProfileAvatar";
import ProfileInfo from "./ProfileInfo";
import ButtonProfileEdit from "./ButtonProfileEdit";
import ButtonProfileAddCard from "./ButtonProfileAddCard";
import "../../blocks/Profile.sass";
import {CurrentUserContext} from "../../contexts/CurrentUserContext";
const Profile = (props) => {

  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
  const ApiElement = props.ApiElement
  
  const cards = props.cards;
  const setCards = props.setCards;

  return (
    <section className="profile">
      <div className="profile__container">

        <ProfileAvatar ApiElement={ApiElement} setUserObject={setCurrentUser} currentUser={currentUser}/>
        <ProfileInfo ApiElement={ApiElement} userHook={[currentUser, setCurrentUser]}/>
        <ButtonProfileEdit ApiElement={ApiElement} setUserObject={setCurrentUser}/>

      </div>

      <ButtonProfileAddCard ApiElement={ApiElement} cards={cards} setCards={setCards}/>

    </section>
  );
}

export default Profile;
