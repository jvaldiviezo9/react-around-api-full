const express = require('express');
const cardRouter = express.Router();

const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
}= require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/likes/:cardId', likeCard);
cardRouter.delete('/likes/:cardId', dislikeCard);

module.exports = cardRouter;
