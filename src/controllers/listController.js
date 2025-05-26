// 📁 controllers/listController.js
const List = require('../models/lists');

const listController = {
  getListsByBoard: async (req, res) => {
    try {
      const { boardId } = req.params;
      const lists = await List.findAll({
        where: { board_id: boardId },
        order: [['position', 'ASC']],
      });
      res.status(200).json(lists);
    } catch (error) {
      console.error('Erreur getListsByBoard:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la récupération des listes' });
    }
  },

  createList: async (req, res) => {
    try {
      const { boardId } = req.params;
      const { name } = req.body;
      if (!name) return res.status(400).json({ error: 'Le nom de la liste est requis.' });
      // Determine next position
      const maxPos = await List.max('position', { where: { board_id: boardId } }) || 0;
      const list = await List.create({ name, board_id: boardId, position: maxPos + 1 });
      res.status(201).json(list);
    } catch (error) {
      console.error('Erreur createList:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la création de la liste' });
    }
  },

  updateList: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, position } = req.body;
      const list = await List.findByPk(id);
      if (!list) return res.status(404).json({ error: 'Liste non trouvée' });
      await list.update({ name: name ?? list.name, position: position ?? list.position });
      res.json(list);
    } catch (error) {
      console.error('Erreur updateList:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la mise à jour de la liste' });
    }
  },

  deleteList: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await List.destroy({ where: { id } });
      if (!deleted) return res.status(404).json({ error: 'Liste non trouvée' });
      res.json({ message: 'Liste supprimée' });
    } catch (error) {
      console.error('Erreur deleteList:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la suppression de la liste' });
    }
  }
};

module.exports = listController;
