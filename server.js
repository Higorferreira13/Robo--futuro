const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("🚀 Robô Futuro está online!");
});

app.get("/status", (req, res) => {
  const status = {
    status: "ativo",
    nome: "Robô Futuro",
    versao: "1.0",
    timestamp: new Date().toISOString()
  };
  res.json(status);
});

app.listen(PORT, () => {
  console.log(`✅ Servidor Robô Futuro rodando na porta ${PORT}`);
});

