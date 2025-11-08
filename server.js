// ===============================
// 🔥 Robô Futuro - Servidor Base
// ===============================

const express = require('express');
const app = express();
const PORT = process.env.PORT || 10000;

// Middleware básico
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.send('<h1>🚀 Robô Futuro está ativo!</h1>');
});

// Rota de status (para monitoramento)
app.get('/status', (req, res) => {
  res.json({
    status: 'online',
    message: 'Robô Futuro operacional 🚀',
    timestamp: new Date().toISOString(),
  });
});

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`✅ Robô Futuro rodando na porta ${PORT}`);
});
