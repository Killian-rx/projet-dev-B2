// 📁 controllers/cardController.js
const cardController = {
  getCardsByList: (req, res) => {
    const { listId } = req.params;
    res.status(200).json({ message: `Cartes de la liste ${listId}` });
  },

  createCard: (req, res) => {
    const { listId } = req.params;
    res.status(201).json({ message: `Carte créée dans la liste ${listId}` });
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
