const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // ← ajouté

const app = express();

app.use(cors()); // ← ajouté
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const message = req.body.message.toLowerCase();
  let response = "Je n'ai pas compris votre question.";

  if (message.includes('horaire')) {
    response = 'Nous sommes ouverts du lundi au vendredi de 9h à 18h.';
  } else if (message.includes('adresse')) {
    response = 'Notre adresse est 10 rue de la République, Paris.';
  } else if (message.includes('contact')) {
    response = 'Vous pouvez nous contacter au 01 23 45 67 89.';
  } else if (message.includes('services')) {
    response = 'Nous offrons des services en ligne, de conseil, et de réservation.';
  } else if (message.includes('merci')) {
    response = 'Avec plaisir 😊 !';
  }

  res.json({ reply: response });
});

app.listen(3001, () => console.log('Bot actif sur http://localhost:3001'));


