// app.js — núcleo inicial do Robô Futuro
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    status: '🧠 Robô Futuro ativo',
    timestamp: new Date().toISOString()
  });
});

app.get('/health', (req, res) => {
  res.send('ok');
});

app.listen(port, () => {
  console.log(`🚀 Robô Futuro rodando na porta ${port}`);
});
