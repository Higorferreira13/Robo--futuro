// 🌕 Robô Futuro - Núcleo de Ativação
import express from "express";
const app = express();
const PORT = process.env.PORT || 3000;

// Rota principal
app.get("/", (req, res) => {
  res.send("🤖 Robô Futuro está online e operacional!");
});

// Rota de status
app.get("/status", (req, res) => {
  res.json({
    status: "online",
    message: "Robô Futuro operacional 🚀",
    timestamp: new Date().toISOString(),
  });
});

// Inicialização
app.listen(PORT, () => {
  console.log(`✅ Servidor Robô Futuro rodando na porta ${PORT}`);
});

