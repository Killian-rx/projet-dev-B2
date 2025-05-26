// 📁 controllers/commentController.js
const commentController = {
  getCommentsByCard: (req, res) => {
    const { cardId } = req.params;
    res.status(200).json({ message: `Commentaires de la carte ${cardId}` });
  },

  createComment: (req, res) => {
    const { cardId } = req.params;
    res.status(201).json({ message: `Commentaire ajouté à la carte ${cardId}` });
  },

  updateComment: (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Commentaire ${id} mis à jour` });
  },

  deleteComment: (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Commentaire ${id} supprimé` });
  }
};

module.exports = commentController;
