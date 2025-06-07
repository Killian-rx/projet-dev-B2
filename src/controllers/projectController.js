const Project = require('../models/boards'); // Assurez-vous que le modèle est correctement importé

// Fonction pour créer un projet
const createBoard = async (req, res) => {
    try {
        const { name, image } = req.body; // Récupère le nom et l'image depuis la requête
        const owner_id = req.user.id; // Récupère toujours l’ID utilisateur authentifié

        if (!name) {
            return res.status(400).json({ error: 'Le nom du projet est requis.' });
        }

        // Crée un nouveau projet avec le nom et l'image
        const project = await Project.create({ name, image, owner_id });  // Inclut owner_id

        // Retourne le projet créé
        res.status(201).json(project);
    } catch (error) {
        console.error('Erreur lors de la création du projet:', error);
        res.status(500).json({ error: 'Erreur lors de la création du projet.' });
    }
};

// Fonction pour récupérer tous les projets
const getBoards = async (req, res) => {
    try {
        const projects = await Project.findAll({
            attributes: ['id', 'name', 'image', 'owner_id'], // Inclut explicitement 'image'
        });

        if (!projects || projects.length === 0) {
            return res.status(404).json({ error: 'Aucun projet trouvé.' });
        }

        console.log('Projets récupérés:', projects); // Affiche les projets dans la console

        res.status(200).json(projects); // Renvoie les projets avec leurs images
    } catch (error) {
        console.error('Erreur lors de la récupération des projets:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération des projets.' });
    }
};

module.exports = {
    createBoard,
    getBoards,
};