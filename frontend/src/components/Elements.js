import React,{useState, useEffect} from "react";
import Card from "./Card"
import "../blocks/Elements.sass"

const Elements = (props) => {

  const ApiElement = props.ApiElement
  const [cards, setCards] = useState([]);
  const [userObject, setUserObject] = useState({});

  useEffect(() => {

    let apiCards = ApiElement.getCards()
    let userInfo = ApiElement.getUserInfo()

    apiCards.then((data) => {
      setCards(data)
    })

    userInfo.then((data) => {
      setUserObject(data)
    })

  }, [] )

  return (

    <section className="elements">

      {cards.map((cardObject, key) => {
      return <Card cardObject={cardObject} userObject={userObject} ApiElement={ApiElement} setCards={setCards} key={key}/>;
      })}

    </section>
  );
}

export default Elements;
