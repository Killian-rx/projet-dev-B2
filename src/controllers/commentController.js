// 📁 controllers/commentController.js
const Comment = require('../models/comments');  // <-- import
const commentController = {
  getCommentsByCard: async (req, res) => {
    try {
      const { cardId } = req.params;
      const comments = await Comment.findAll({
        where: { card_id: cardId },
        order: [['created_at','ASC']]
      });
      res.json(comments);
    } catch (error) {
      console.error('Erreur getCommentsByCard:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la récupération des commentaires' });
    }
  },

  createComment: async (req, res) => {
    try {
      const { cardId } = req.params;
      const { content } = req.body;
      if (!content) return res.status(400).json({ error: 'Le contenu est requis.' });
      const comment = await Comment.create({
        content,
        card_id: cardId,
        user_id: req.user.id
      });
      res.status(201).json(comment);
    } catch (error) {
      console.error('Erreur createComment:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la création du commentaire' });
    }
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
