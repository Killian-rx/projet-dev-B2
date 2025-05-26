// 📁 controllers/boardController.js
const boardController = {
  getAllBoards: (req, res) => {
    res.status(200).json({ message: 'Liste de tous les boards' });
  },

  getBoardById: (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Board avec l'id ${id}` });
  },

  createBoard: (req, res) => {
    res.status(201).json({ message: 'Board créé' });
  },

  updateBoard: (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Board ${id} mis à jour` });
  },

  deleteBoard: (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Board ${id} supprimé` });
  },

  getBoardMembers: (req, res) => {
    const { id } = req.params;
    res.status(200).json({ message: `Membres du board ${id}` });
  },

  addBoardMember: (req, res) => {
    const { id } = req.params;
    res.status(201).json({ message: `Membre ajouté au board ${id}` });
  },

  removeBoardMember: (req, res) => {
    const { id, userId } = req.params;
    res.status(200).json({ message: `Membre ${userId} supprimé du board ${id}` });
  },

  assignRoleToUser: (req, res) => {
    const { id } = req.params;
    res.status(201).json({ message: `Rôle assigné pour le board ${id}` });
  },

  updateUserRole: (req, res) => {
    const { id, userId } = req.params;
    res.status(200).json({ message: `Rôle du membre ${userId} mis à jour pour le board ${id}` });
  },

  removeUserRole: (req, res) => {
    const { id, userId } = req.params;
    res.status(200).json({ message: `Rôle du membre ${userId} supprimé pour le board ${id}` });
  }
};

module.exports = boardController;
