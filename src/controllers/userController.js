// controllers/user.controller.js
const { User } = require('../models/users');

exports.getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: ['id', 'name', 'email', 'created_at'],
    });

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    res.json(user);
  } catch (error) {
    console.error('Erreur dans GET /me :', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};
