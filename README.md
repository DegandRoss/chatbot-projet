# RossindjiBot – Chatbot IA (Backend + Frontend)

Ce projet regroupe un chatbot intelligent capable de répondre automatiquement aux questions d’un utilisateur.  
Il est composé de deux parties principales : une interface React (frontend) et un serveur Node.js connecté à une IA (backend).

---

## Structure du projet

```
chatbot-projet/
├── backend/      # Node.js + Express + IA Hugging Face
│   └── index.js, .env, package.json...
├── frontend/     # ReactJS + Tailwind pour l’interface utilisateur
│   └── src/, public/, App.js...
└── README.md     # Documentation du projet
```

---

## Fonctionnalités

- Interface utilisateur intuitive (React)
- Communication frontend ↔ backend via `/webhook`
- Appel d’un modèle IA (Falcon 7B Instruct) pour générer des réponses naturelles
- Historique des échanges visible côté interface
- Déploiement possible sur Render

---

## Technologies utilisées

- React + Tailwind CSS  
- Node.js + Express  
- Hugging Face Inference API  
- Axios pour les requêtes HTTP  
- Dotenv pour la gestion sécurisée des clés

---

## Comment lancer le projet

### 1. Backend

```bash
cd backend
node index.js
```

### 2. Frontend

```bash
cd frontend
npm install
npm start
```

- Le frontend sera accessible sur [http://localhost:3000](http://localhost:3000)  
- Le backend sera en écoute sur [http://localhost:3001](http://localhost:3001)

---

## Modèle IA utilisé

- [tiiuae/falcon-7b-instruct](https://huggingface.co/tiiuae/falcon-7b-instruct) via Hugging Face API

---

## À propos

Ce projet a été développé par **Rossindji**, dans le cadre d’un travail d’intégration entre React, Node.js, et une IA conversationnelle.
