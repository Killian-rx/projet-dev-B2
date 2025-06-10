// 📁 controllers/cardController.js
const Card = require('../models/cards');
const Label = require('../models/labels');

const cardController = {
  getCardsByList: async (req, res) => {
    try {
      const { listId } = req.params;
      const cards = await Card.findAll({
        where: { list_id: listId },
        order: [['position', 'ASC']],
        include: [{ model: Label, through: { attributes: [] } }]
      });
      const result = cards.map(card => {
        const obj = card.toJSON();
        return { ...obj, labels: obj.Labels || [] };
      });
      res.json(result);
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

  updateCard: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, description, list_id, position } = req.body;
      const updates = {};
      if (title !== undefined) updates.title = title;
      if (description !== undefined) updates.description = description;
      if (list_id !== undefined) updates.list_id = list_id;
      if (position !== undefined) updates.position = position;

      const [count, returned] = await Card.update(
        updates,
        { where: { id }, returning: true }
      );

      if (count === 0) {
        return res.status(404).json({ error: 'Carte non trouvée.' });
      }

      // returned peut être un nombre (MySQL/SQLite) ou un tableau (Postgres)
      let updatedCard;
      if (Array.isArray(returned) && returned.length) {
        updatedCard = returned[0];
      } else {
        updatedCard = await Card.findByPk(id);
      }

      res.status(200).json(updatedCard);
    } catch (error) {
      console.error('Erreur updateCard:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la carte.' });
    }
  },

  deleteCard: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRows = await Card.destroy({ where: { id } });
      if (deletedRows === 0) {
        return res.status(404).json({ error: 'Carte non trouvée.' });
      }
      res.status(200).json({ message: `Carte ${id} supprimée` });
    } catch (error) {
      console.error('Erreur deleteCard:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la suppression de la carte.' });
    }
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
