const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

const HF_TOKEN = process.env.HF_TOKEN;

// Zephyr 7B Alpha pour des réponses plus naturelles
async function getAIResponse(message) {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-alpha',
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generated = response.data?.[0]?.generated_text || "Je n'ai pas compris. Peux-tu reformuler ?";
    return generated;
  } catch (error) {
    console.error('Erreur IA HuggingFace :', error.message);
    return "Désolé, je ne peux pas répondre maintenant.";
  }
}

app.post('/webhook', async (req, res) => {
  const userMessage = req.body.message;
  console.log(` Message reçu : ${userMessage}`);

  const aiResponse = await getAIResponse(userMessage);
  console.log(` Réponse IA : ${aiResponse}`);

  res.json({ reply: aiResponse });
});

app.listen(3001, () => {
  console.log(' RossindjiBot IA (Zephyr 7B Alpha) actif sur http://localhost:3001');
});
