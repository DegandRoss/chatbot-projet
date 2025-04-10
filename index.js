const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const VERIFY_TOKEN = 'rossindji123'; // pour Messenger (au cas où)

app.use(cors());
app.use(bodyParser.json());

// Route GET pour vérification du webhook
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Route POST pour recevoir les messages du chatbot
app.post('/webhook', (req, res) => {
  const message = req.body.message?.toLowerCase();
  let response = "Je n'ai pas compris votre question.";

  if (message.includes('bonjour')) {
    response = "Salut ! Je suis RossindjiBot, comment puis-je t’aider ?";
  } else if (message.includes('horaire')) {
    response = 'Nous sommes ouverts du lundi au vendredi de 9h à 18h.';
  } else if (message.includes('merci')) {
    response = 'Avec plaisir ';
  }

  res.json({ reply: response });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot actif sur http://localhost:${PORT}`);
});
