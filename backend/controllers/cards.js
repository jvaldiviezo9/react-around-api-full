const cardModelMongo = require('../models/cards');

const getCards = (req, res, next) => {
  cardModelMongo.find({})
    .sort({ createdAt: -1 })
    .then((cards) => res.send(cards))
    .catch((err) => next({ statusCode: 500, message: `No se encuentra ninguna tarjeta: ${err}` }));
};

const createCard = (req, res, next) => {
  if (!req.body.name || !req.body.link) {
    return res.status(400).send({ message: 'Falta informacion en el body' });
  }

  const { name, link } = req.body;
  const owner = req.user._id;

  cardModelMongo.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((err) => next({ statusCode: 400, message: `No se ha podido crear la tarjeta: ${err}` }));
};

const deleteCard = (req, res, next) => {
  cardModelMongo.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const err = new Error('No se ha encontrado una tarjeta con ese id');
      err.statusCode = 404;
      throw err;
    })
    .then(() => {
      cardModelMongo.find({})
        .sort({ createdAt: -1 })
        .then((cards) => res.send(cards))
        .catch((err) => next({ statusCode: 500, message: `No se encuentra ninguna tarjeta: ${err}` }));
    })
    .catch((err) => next({ statusCode: 400, message: `Error: ${err}` }));
};

const likeCard = (req, res, next) => {
  cardModelMongo.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const err = new Error('No se ha encontrado una tarjeta con ese id');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.send(card))
    .catch((err) => next({ statusCode: 400, message: `Error: ${err}` }));
};

const dislikeCard = (req, res, next) => {
  cardModelMongo.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const err = new Error('No se ha encontrado una tarjeta con ese id para quitarle el like');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.send(card))
    .catch((err) => next({ statusCode: 400, message: `Hubo un error: ${err}` }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
};