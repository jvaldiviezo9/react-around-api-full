const cardModelMongo = require('../models/cards');

const getCards = (req, res) => {
  cardModelMongo.find({})
    .then((cards) => res.send({ data: cards }))
    .catch((err) => res.status(500).send({ message: `No se encuentra ninguna tarjeta: ${err}` }));
};

const createCard = (req, res) => {
  if(!req.body.name || !req.body.link) {
    return res.status(400).send({ message: 'Falta informacion en el body' });
  }

  const { name, link } = req.body;
  const owner = req.user._id;

  cardModelMongo.create({name, link, owner})
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(400).send({ message: `No se ha podido crear la tarjeta: ${err}` }));
};

const deleteCard = (req, res) => {
  cardModelMongo.findByIdAndDelete(req.params.cardId)
    .orFail(() => {
      const err = new Error('No se ha encontrado una tarjeta con ese id');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(400).send({ message: `Error: ${err}` }));
};

const likeCard = (req, res) => {
  cardModelMongo.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const err = new Error('No se ha encontrado una tarjeta con ese id');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(400).send({ message: `Error: ${err}` }));
};

const dislikeCard = (req, res) => {
  cardModelMongo.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .orFail(() => {
      const err = new Error('No se ha encontrado una tarjeta con ese id para quitarle el like');
      err.statusCode = 404;
      throw err;
    })
    .then((card) => res.send({ data: card }))
    .catch((err) => res.status(400).send({ message: `Hubo un error: ${err}` }));
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  dislikeCard,
}
