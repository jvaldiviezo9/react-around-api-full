import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
    props.ApiElement.postCard(e.target.form__name.value, e.target.form__description.value).then((cardInfo) => {
      console.log(cardInfo);
      props.setPopupStatus(false);
    });
  }

  return (
    <PopupWithForm popupStatus={props.popupStatus} setPopupStatus={props.setPopupStatus}>
      <form onSubmit={handleSubmit} className="form__container" noValidate>
        <h2 className="form__title">Añadir imagen</h2>
        <input className="form__name" id="form__name" type="text" placeholder="Nombre" required/>
        <span className="form__name-error form__error">field__name</span>
        <input className="form__description" id="form__description" type="text" placeholder="Acerca de" required/>
        <span className="form__description-error form__error">field__description</span>
        <button className="form__submit" type="submit">Save</button>
      </form>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
