const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const VERIFY_TOKEN = 'rossindji123'; // Doit être le même que celui mis sur Facebook

app.use(bodyParser.json());

// Route GET pour vérification du Webhook (Facebook)
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode && token === VERIFY_TOKEN) {
    console.log(' Webhook vérifié avec succès');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Route POST pour recevoir les messages de Messenger
app.post('/webhook', (req, res) => {
  const body = req.body;

  if (body.object === 'page') {
    body.entry.forEach(entry => {
      const event = entry.messaging[0];
      const senderId = event.sender.id;
      const message = event.message?.text;

      if (message) {
        console.log(` Message reçu : ${message}`);
        // Réponse simulée (juste console.log pour l'instant)
        console.log(` Répondre à ${senderId} : "Merci pour ton message"`);
      }
    });
    res.status(200).send('EVENT_RECEIVED');
  } else {
    res.sendStatus(404);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Bot actif sur http://localhost:${PORT}`);
});
