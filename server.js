// 🚀 Robô Futuro - Servidor Principal + Módulo de Renda Automática
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = process.env.PORT || 3000;

// 🔹 Função de geração de renda automática
async function gerarRenda() {
  console.log("💰 Procurando oportunidades de lucro...");

  try {
    // Simulação de busca de oportunidades (pode virar API real ou integração Web3)
    const ganhos = Math.random() * 0.005; // 0.5% de lucro simulado
    console.log(`✅ Lucro gerado: ${ganhos.toFixed(6)} ETH`);

    return {
      status: "ok",
      valor: ganhos.toFixed(6),
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    console.error("❌ Erro ao gerar renda:", err.message);
    return { status: "erro" };
  }
}

// 🔸 Rota principal
app.get("/", (req, res) => {
  res.send("🤖 Robô Futuro está online!");
});

// 🔸 Rota de status
app.get("/status", (req, res) => {
  const status = {
    status: "ativo",
    nome: "Robô Futuro",
    versao: "1.0",
    timestamp: new Date().toISOString()
  };
  res.json(status);
});

// 🔸 Rota de renda automática
app.get("/renda", async (req, res) => {
  const resultado = await gerarRenda();
  res.json(resultado);
});

// 🔸 Execução automática a cada 30 minutos
setInterval(gerarRenda, 1800000);

// 🔸 Inicialização do servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor Robô Futuro rodando na porta ${PORT}`);
});

// 🔹 Módulo Web3 — Conexão com carteira
const { ethers } = require("ethers");

async function conectarCarteira() {
  try {
    const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_API_KEY");
    const carteira = "0xDA2e3B678439059fb473204398423Cbe0b2bA40f";

    const saldo = await provider.getBalance(carteira);
    console.log(`🔗 Carteira conectada: ${carteira}`);
    console.log(`💎 Saldo atual: ${ethers.formatEther(saldo)} ETH`);

    return { 
      status: "ok", 
      carteira, 
      saldo: ethers.formatEther(saldo),
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    console.error("❌ Erro ao conectar carteira:", err.message);
    return { status: "erro", mensagem: err.message };
  }
}

// 🔹 Rota pública /carteira
app.get("/carteira", async (req, res) => {
  const resultado = await conectarCarteira();
  res.json(resultado);
});
