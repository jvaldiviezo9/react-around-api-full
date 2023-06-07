import React, { useState, useEffect } from "react";
import Card from "./Card";
import "../blocks/Elements.sass";

const Elements = (props) => {
  const ApiElement = props.ApiElement;
  const cards = props.cards;
  const setCards = props.setCards;

  const [userObject, setUserObject] = useState({});

  useEffect(() => {
    let apiCards = ApiElement.getCards();
    let userInfo = ApiElement.getUserInfo();

    apiCards.then((data) => {
      // Sort the cards based on the 'createdAt' argument in descending order
      // const sortedCards = data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      // setCards(sortedCards);
      
      setCards(data);
    });

    userInfo.then((data) => {
      setUserObject(data);
    });
  }, []);

  // Conditionally render the cards only if the 'cards' array has values
  if (cards.length === 0) {
    return null; // or you can return a placeholder or loading indicator
  }

  return (
    <section className="elements">
      {Array.isArray(cards)
        ? cards.map((cardObject, key) => (
            <Card
              cards={cards}
              cardObject={cardObject}
              userObject={userObject}
              ApiElement={ApiElement}
              setCards={setCards}
              key={key}
            />
          ))
        : null}
    </section>
  );
};

export default Elements;






