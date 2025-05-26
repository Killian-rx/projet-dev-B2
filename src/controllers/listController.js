// 📁 controllers/listController.js
const listController = {
  getListsByBoard: (req, res) => {
    const { boardId } = req.params;
    res.status(200).json({ message: `Listes du board ${boardId}` });
  },

  createList: (req, res) => {
    const { boardId } = req.params;
    res.status(201).json({ message: `Liste créée dans le board ${boardId}` });
  },

  updateList: (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Liste ${id} mise à jour` });
  },

  deleteList: (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Liste ${id} supprimée` });
  }
};

module.exports = listController;
