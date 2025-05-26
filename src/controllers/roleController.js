// 📁 controllers/roleController.js
const roleController = {
  getAllRoles: (req, res) => {
    res.status(200).json({ message: 'Liste de tous les rôles' });
  },

  createRole: (req, res) => {
    res.status(201).json({ message: 'Nouveau rôle créé' });
  }
};

module.exports = roleController;
