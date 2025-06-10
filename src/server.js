const express = require('express');
const cors = require("cors"); // Import du module CORS
const { Sequelize } = require('sequelize');  // On importe Sequelize
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const boardRoutes = require('./routes/boardRoutes');
const listRoutes = require('./routes/listRoutes');
const cardRoutes = require('./routes/cardRoutes');
const commentRoutes = require('./routes/commentRoutes');
const labelRoutes = require('./routes/labelRoutes');
const roleRoutes = require('./routes/roleRoutes');
const projectRoutes = require('./routes/projectRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');


const app = express();
app.use(cors({
  origin: "http://localhost:3000", // Assurez-vous que cette URL correspond à celle de votre frontend React
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));


app.get('/', (req, res) => {
    res.send('Bienvenue sur le serveur API !');  // Réponse pour la racine
  });

app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/boards', boardRoutes);
app.use('/', listRoutes);
app.use('/cards', cardRoutes);
app.use('/comments', commentRoutes);
app.use('/labels', labelRoutes);
app.use('/roles', roleRoutes);
app.use('/api', projectRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
