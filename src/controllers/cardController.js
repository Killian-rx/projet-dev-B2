// 📁 controllers/cardController.js
const Card = require('../models/cards');

const cardController = {
  getCardsByList: async (req, res) => {
    try {
      const { listId } = req.params;
      const cards = await Card.findAll({ where: { list_id: listId }, order: [['position', 'ASC']] });
      res.json(cards);
    } catch (error) {
      console.error('Erreur getCardsByList:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la récupération des cartes' });
    }
  },

  createCard: async (req, res) => {
    try {
      const { listId } = req.params;
      const { title, description } = req.body;
      if (!title) return res.status(400).json({ error: 'Le titre de la carte est requis.' });
      // Determine next position
      const maxPos = await Card.max('position', { where: { list_id: listId } }) || 0;
      const card = await Card.create({ title, description: description || null, list_id: listId, position: maxPos + 1 });
      res.status(201).json(card);
    } catch (error) {
      console.error('Erreur createCard:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la création de la carte' });
    }
  },

  getCardById: (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Carte avec l'id ${id}` });
  },

  updateCard: (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Carte ${id} mise à jour` });
  },

  deleteCard: (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Carte ${id} supprimée` });
  },

  assignUserToCard: (req, res) => {
    const { id, userId } = req.params;
    res.status(200).json({ message: `Utilisateur ${userId} assigné à la carte ${id}` });
  },

  addLabelToCard: (req, res) => {
    const { id, labelId } = req.params;
    res.status(201).json({ message: `Label ${labelId} ajouté à la carte ${id}` });
  },

  removeLabelFromCard: (req, res) => {
    const { id, labelId } = req.params;
    res.status(200).json({ message: `Label ${labelId} supprimé de la carte ${id}` });
  }
};

module.exports = cardController;
