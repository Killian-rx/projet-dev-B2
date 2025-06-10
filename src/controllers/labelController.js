// 📁 controllers/labelController.js
const Label = require('../models/labels');

exports.getLabelsByBoard = async (req, res) => {
  try {
    const labels = await Label.findAll(); // no board_id filter
    res.json(labels);
  } catch (error) {
    console.error('Erreur getLabelsByBoard:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des labels' });
  }
};

exports.createLabel = async (req, res) => {
  try {
    const { name, color } = req.body;
    const label = await Label.create({ name, color }); // no board_id
    res.status(201).json(label);
  } catch (error) {
    console.error('Erreur createLabel:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la création du label' });
  }
};

exports.updateLabel = (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Label ${id} mis à jour` });
};

exports.deleteLabel = (req, res) => {
  const { id } = req.params;
  res.status(200).json({ message: `Label ${id} supprimé` });
};
