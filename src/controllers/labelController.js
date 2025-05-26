// 📁 controllers/labelController.js
const labelController = {
  getLabelsByBoard: (req, res) => {
    const { boardId } = req.params;
    res.status(200).json({ message: `Labels du board ${boardId}` });
  },

  createLabel: (req, res) => {
    const { boardId } = req.params;
    res.status(201).json({ message: `Label créé dans le board ${boardId}` });
  },

  updateLabel: (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Label ${id} mis à jour` });
  },

  deleteLabel: (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Label ${id} supprimé` });
  }
};

module.exports = labelController;
