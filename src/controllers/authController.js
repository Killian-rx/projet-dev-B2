const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/users');
require('dotenv').config();

// Génération du token JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,  // Utilisation de la clé secrète définie dans le fichier .env
    { expiresIn: '1h' }
  );
};

// 🔹 Inscription (register)
exports.register = async (req, res) => {
  try {
    // Vérification que les champs sont bien fournis
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
      return res.status(400).json({ error: 'Tous les champs sont requis.' });
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Cet email est déjà utilisé.' });
    }

    // Hachage du mot de passe avant de l'enregistrer dans la base de données
    const hashedPassword = await bcrypt.hash(password, 10);  // Utilisation de bcrypt pour hasher le mot de passe

    // Création de l'utilisateur dans la base de données
    const user = await User.create({
      email,
      name,
      password: hashedPassword,  // Stocker le mot de passe haché
    });

    res.status(201).json({ message: 'Utilisateur créé avec succès !' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de l\'inscription de l\'utilisateur.' });
  }
};

// 🔹 Connexion (login)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email et mot de passe sont requis.' });
    }

    // Recherche de l'utilisateur dans la base de données
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Utilisateur non trouvé' });
    }

    // Comparaison du mot de passe saisi avec le mot de passe haché
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Mot de passe incorrect' });
    }

    // Génération du token JWT
    const token = generateToken(user);
    res.json({ message: 'Connexion réussie', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la connexion.' });
  }
};
