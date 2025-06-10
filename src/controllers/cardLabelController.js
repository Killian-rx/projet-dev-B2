const CardLabel = require('../models/card_labels');

exports.assignLabel = async (req, res) => {
  const { cardId, labelId } = req.params;
  try {
    // create only if not existing
    const [link, created] = await CardLabel.findOrCreate({
      where: { card_id: cardId, label_id: labelId }
    });
    return res
      .status(created ? 201 : 200)
      .json(link);
  } catch (error) {
    console.error('Erreur assignLabel:', error);
    res.status(500).json({ error: 'Impossible d’assigner le label à la carte' });
  }
};

exports.removeLabel = async (req, res) => {
  const { cardId, labelId } = req.params;
  try {
    await CardLabel.destroy({ where: { card_id: cardId, label_id: labelId } });
    res.status(204).send();
  } catch (error) {
    console.error('Erreur removeLabel:', error);
    res.status(500).json({ error: 'Impossible de retirer le label de la carte' });
  }
};
