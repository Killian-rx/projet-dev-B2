
# 📌 Documentation Technique – Projet **Trello-like**

## 🚀 Présentation du projet

- **Nom :** Trello-like
- **Objectif :** Application web collaborative pour gestion de projets (tableaux Kanban)
- **Public cible :** Équipes, étudiants, freelances
- **Durée :** Mars - Juin 2025
- **Binôme :** _[Complétez vos noms]_

---

## 🛠️ Stack technologique

| 🖥️ Côté       | 📦 Technologie         | 📌 Rôle                                |
|--------------|-----------------------|----------------------------------------|
| Frontend     | **React.js**          | Interface dynamique et responsive      |
| Backend      | **Express.js**        | API REST, gestion logique métier       |
| ORM          | **Sequelize**         | Mapping objet-relationnel              |
| BDD          | **MySQL**             | Stockage données                       |
| Hébergement Front | **Vercel**       | Déploiement Frontend                   |
| Hébergement Back  | **Heroku**       | Déploiement Backend + MySQL            |
| Versioning   | **Git (GitHub)**      | Gestion versions (feat, fix, chore)    |

---

## ✅ Fonctionnalités principales

- **Authentification JWT sécurisée**
- **Gestion utilisateurs et rôles (Owner, Member)**
- **Gestion complète (CRUD)** :
  - Projets, Boards, Lists, Cards, Comments, Labels
- **Gestion rôles par projet**
- **Interface responsive**
- **Architecture MVC**

---

## 📐 Architecture du projet

```
src/
├── 📁 client/         # Frontend React
├── 📁 config/         # Connexion BDD & variables env
├── 📁 controllers/    # Logique métier
├── 📁 middlewares/    # Authentification & erreurs
├── 📁 migrations/     # Migrations SQL
├── 📁 models/         # Définition Sequelize
├── 📁 routes/         # Routes REST
├── 📁 seeders/        # Données initiales
└── 📄 server.js       # Point d'entrée backend
```

---

## 🗃️ Modèle de données (MERISE)

**Tables :**
- 🧑 Users
- 🔐 Roles
- 📂 Projects
- 📋 Boards
- 📑 Lists
- 📌 Cards
- 💬 Comments
- 🏷️ Labels
- 🔗 Card_Labels
- 🔒 User_Project_Role

**Relations clés :**
- User ↔ Projects (Rôles)
- Board ↔ Lists (1-n)
- List ↔ Cards (1-n)
- Card ↔ Labels (n-n)
- Card ↔ Comments (1-n)

---

## 🌐 API REST

| 📍 Endpoint  | 🔧 Méthodes            |
|-------------|------------------------|
| `/auth`     | POST `/login`, `/register`|
| `/users`    | GET, POST, PUT, DELETE |
| `/projects` | CRUD complet           |
| `/boards`   | CRUD complet           |
| `/lists`    | CRUD complet           |
| `/cards`    | CRUD complet           |
| `/labels`   | CRUD complet           |
| `/comments` | CRUD complet           |

---

## 🔒 Authentification

- Tokens JWT stockés côté client
- Middleware de sécurisation API REST

---

## ☁️ Hébergement

- 🌍 Frontend sur **Vercel** (CI/CD GitHub)
- 🛠️ Backend & MySQL sur **Heroku**
- 🔑 Variables sécurisées `.env`

---

## 🧹 Bonnes pratiques adoptées

- ✅ **Commits explicites** (`feat`, `fix`, `chore`)
- ✅ **Code MVC** modulaire et maintenable
- ✅ **Commentaires et clarté du code**
- ✅ Séparation claire front/back

---

## 🚀 Fonctionnalités avancées

- 🔥 Multi-projets & multi-boards
- 🔥 Étiquettes personnalisables
- 🔥 Gestion avancée des rôles et permissions

---

## 📈 Perspectives d'amélioration

- 🕒 Collaboration temps réel (websockets)
- 🔔 Notifications (push/mail)
- 🌐 Partage public de boards
- 📲 Mode hors-ligne (Progressive Web App)

---

🚩 _Merci pour votre attention !_
