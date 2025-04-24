const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// mon token Hugging Face
const HF_TOKEN = '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';

// Fonction qui envoie le message à Hugging Face et récupère la réponse
async function getAIResponse(message) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium',
      { inputs: { text: message } },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generated = response.data?.generated_text || "Je n'ai pas compris. Peux-tu reformuler ?";
    return generated;
  } catch (error) {
    console.error('Erreur IA HuggingFace :', error.message);
    return "Désolé, je ne peux pas répondre maintenant.";
  }
}

// Route POST pour recevoir les messages de l’interface React
app.post('/webhook', async (req, res) => {
  const userMessage = req.body.message;
  console.log(` Message reçu : ${userMessage}`);

  const aiResponse = await getAIResponse(userMessage);
  console.log(` Réponse IA : ${aiResponse}`);

  res.json({ reply: aiResponse });
});

// Lancer le serveur
app.listen(3001, () => {
  console.log(' RossindjiBot avec IA actif sur http://localhost:3001');
});
