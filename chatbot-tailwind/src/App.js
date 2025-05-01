import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [reply, setReply] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!input.trim()) return;

    // Ajoute le message de l'utilisateur
    setMessages((prev) => [...prev, { text: input, from: 'user' }]);
    setInput('');
    setError('');

    try {
      const res = await fetch('https://chatbot-rossindji.onrender.com/webhook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { text: data.reply, from: 'bot' }]);
    } catch (err) {
      console.error('Erreur de connexion :', err);
      setError('❌ Erreur de connexion au serveur.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        {/* En-tête */}
        <div className="flex items-center px-4 py-3 bg-blue-600 text-white">
          <img
            src="https://th.bing.com/th/id/OIP.R0R60JOnojJM_7U3Fa-eIwAAAA?rs=1&pid=ImgDetMain"
            alt="Rossindji"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <div>
            <p className="font-semibold">RossindjiBot</p>
            <p className="text-xs opacity-80">Assistance Virtuelle</p>
          </div>
        </div>

        {/* Messages */}
        <div className="p-4 h-96 overflow-y-auto space-y-2 flex flex-col">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-[80%] transition-all duration-300 ${
                msg.from === 'user'
                  ? 'bg-blue-100 text-right self-end'
                  : 'bg-gray-200 text-left self-start'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {error && (
            <div className="text-red-500 text-sm text-center mt-2">{error}</div>
          )}
        </div>

        {/* Champ de saisie */}
        <form onSubmit={handleSubmit} className="flex p-4 border-t gap-2">
          <input
            type="text"
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Tapez un message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
          >
            Envoyer
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
