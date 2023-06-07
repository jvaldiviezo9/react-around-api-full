import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log("submit");
    props.ApiElement.patchAvatar(e.target.form__name.value).then((userInfo) => {
      props.setUserObject(userInfo);
    });
    props.setPopupStatus(false);
  }

  return (
    <PopupWithForm popupStatus={props.popupStatus} setPopupStatus={props.setPopupStatus}>
      <form onSubmit={handleSubmit} className="form__container" noValidate>
        <h2 className="form__title">Editar foto de perfil</h2>
        <input className="form__name" id="form__name" type="text" placeholder="URL" required />
        <span className="form__name-error form__error">field__name</span>
        <button className="form__submit" type="submit">Save</button>
      </form>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
