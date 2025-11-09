// 🚀 Servidor principal do Robô Futuro (modo real)
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Importa o módulo Web3
const web3 = require("./web3.js");

// ✅ Rota principal — status do robô
app.get("/", (req, res) => {
  res.send("🤖 Robô Futuro conectado em modo real!");
});

// ✅ Consulta carteira e saldo
app.get("/carteira", async (req, res) => {
  const resultado = await web3.conectarCarteira();
  res.json(resultado);
});

// ✅ Envio de ETH real
app.post("/enviar", async (req, res) => {
  const { to, amount } = req.body;
  if (!to || !amount) {
    return res.status(400).json({ status: "erro", mensagem: "Campos 'to' e 'amount' são obrigatórios." });
  }
  const resultado = await web3.enviarTx({ to, amountEth: amount });
  res.json(resultado);
});

// 🔁 Inicia o servidor
app.listen(PORT, () => console.log(`✅ Robô Futuro ativo na porta ${PORT}`));

