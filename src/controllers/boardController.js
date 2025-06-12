// 📁 controllers/boardController.js
const Board = require('../models/boards');
const boardController = {
  getAllBoards: async (req, res) => {
    try {
      const boards = await Board.findAll({
        where: { owner_id: req.user.id },
        attributes: ['id', 'name', 'image', 'owner_id', 'created_at'], // Inclut 'image'
      });
      return res.status(200).json(boards);
    } catch (error) {
      console.error('Erreur getAllBoards:', error);
      return res.status(500).json({ error: 'Erreur serveur lors de la récupération des projets' });
    }
  },

  getBoardById: async (req, res) => {
    try {
      const { id } = req.params;
      const board = await Board.findByPk(id, {
        attributes: ['id', 'name', 'image', 'owner_id', 'created_at'], // Inclut 'image'
      });
      if (!board) return res.status(404).json({ error: 'Projet non trouvé' });
      res.json(board);
    } catch (error) {
      console.error('Erreur getBoardById:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la récupération du projet' });
    }
  },

  createBoard: async (req, res) => {
    try {
      const { name, image } = req.body; // Inclut 'image' dans la création
      if (!name) return res.status(400).json({ error: 'Le nom du projet est requis.' });
      const board = await Board.create({ name, image, owner_id: req.user.id }); // Ajoute 'image'
      // Link creator in User_Project_Roles as Owner (role_id 1)
      const UserProjectRole = require('../models/user_project_role');
      await UserProjectRole.create({ user_id: req.user.id, board_id: board.id, role_id: 1 });
      res.status(201).json(board);
    } catch (error) {
      console.error('Erreur createBoard:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la création du projet' });
    }
  },

  updateBoard: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, image } = req.body;
      const board = await Board.findByPk(id);
      if (!board) return res.status(404).json({ error: 'Projet non trouvé' });
      if (name)  board.name  = name;
      if (image) board.image = image;
      await board.save();
      return res.json(board);
    } catch (error) {
      console.error('Erreur updateBoard:', error);
      return res.status(500).json({ error: 'Erreur serveur lors de la mise à jour' });
    }
  },

  deleteBoard: async (req, res) => {
    try {
      const { id } = req.params;
      const deleted = await Board.destroy({ where: { id } });
      if (!deleted) return res.status(404).json({ error: 'Projet non trouvé' });
      return res.json({ message: 'Projet supprimé avec succès' });
    } catch (error) {
      console.error('Erreur deleteBoard:', error);
      return res.status(500).json({ error: 'Erreur serveur lors de la suppression' });
    }
  },

  getBoardMembers: async (req, res) => {
    try {
      const { id: boardId } = req.params;
      const sequelize = require('../config/database');
      const { QueryTypes } = require('sequelize');
      const query = `
        SELECT u.id AS userId, u.name AS userName, r.id AS roleId, r.name AS roleName
        FROM User_Project_Roles upr
        JOIN Users u ON u.id = upr.user_id
        JOIN Roles r ON r.id = upr.role_id
        WHERE upr.board_id = :boardId AND upr.role_id <> 1
        UNION
        SELECT b.owner_id AS userId, uO.name AS userName, NULL AS roleId, 'Owner' AS roleName
        FROM Boards b
        JOIN Users uO ON uO.id = b.owner_id
        WHERE b.id = :boardId
      `;
      const membersRaw = await sequelize.query(query, {
        replacements: { boardId },
        type: QueryTypes.SELECT,
      });
      const members = membersRaw.map(row => ({
        user: { id: row.userId, name: row.userName },
        role: { id: row.roleId, name: row.roleName },
      }));
      res.json(members);
    } catch (error) {
      console.error('Erreur getBoardMembers:', error);
      res.status(500).json({ error: 'Erreur serveur lors de la récupération des membres' });
    }
  },

  // Ajoute la fonction de partage via email
  shareBoard: async (req, res) => {
    try {
      const { id: boardId } = req.params;
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ error: 'Le champ email est requis.' });
      }
      // Recherche de l'utilisateur par email
      const User = require('../models/users');
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé.' });
      }
      // Création du rôle membre (role_id = 2)
      const UserProjectRole = require('../models/user_project_role');
      const member = await UserProjectRole.create({
        user_id: user.id,
        board_id: boardId,
        role_id: 2
      });
      return res.status(201).json({
        message: 'Projet partagé avec succès.',
        member: {
          user: { id: user.id, name: user.name, email: user.email },
          role: { id: 2, name: 'Member' }
        }
      });
    } catch (error) {
      console.error('Erreur shareBoard:', error);
      return res.status(500).json({ error: 'Erreur serveur lors du partage du projet.' });
    }
  },

  addBoardMember: async (req, res) => {
    try {
      const { id: boardId } = req.params;
      const { user_id, role_id } = req.body;
      const UserProjectRole = require('../models/user_project_role');
      if (!user_id || !role_id) {
        return res.status(400).json({ error: 'user_id et role_id sont requis.' });
      }
      const newMember = await UserProjectRole.create({ board_id: boardId, user_id, role_id });
      return res.status(201).json({ message: 'Membre ajouté', member: newMember });
    } catch (error) {
      console.error('Erreur addBoardMember:', error);
      res.status(500).json({ error: 'Erreur serveur lors de l\'ajout du membre' });
    }
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
