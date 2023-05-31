
const ProfileInfo = (props) => {

  let userObject = props.userHook[0];

  return (
    <div className="profile__info">
      <h2 className="profile__name">{userObject.name}</h2>
      <h4 className="profile__description">{userObject.about}</h4>
    </div>
  );
}

export default ProfileInfo;
