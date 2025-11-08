// 🌍 Robô Futuro — Servidor Principal

// 🔹 Dependências
require("dotenv").config();
const express = require("express");
const axios = require("axios");
const { ethers } = require("ethers");

const app = express();
const PORT = process.env.PORT || 3000;

// =======================================================
// 💰 MÓDULO DE RENDA AUTOMÁTICA
// =======================================================
async function gerarRenda() {
  console.log("💸 Procurando oportunidades de lucro...");
  try {
    const ganhos = Math.random() * 0.005; // 0.5% lucro simulado
    console.log(`✅ Lucro gerado: ${ganhos.toFixed(6)} ETH`);
    return {
      status: "ok",
      valor: ganhos.toFixed(6),
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    console.error("❌ Erro ao gerar renda:", err.message);
    return { status: "erro", mensagem: err.message };
  }
}

// Rota pública para consultar renda
app.get("/renda", async (req, res) => {
  const resultado = await gerarRenda();
  res.json(resultado);
});

// Executa a cada 30 minutos
setInterval(gerarRenda, 1800000);

// =======================================================
// 🔗 MÓDULO WEB3 — CONEXÃO COM CARTEIRA
// =======================================================
async function conectarCarteira() {
  try {
    const INFURA_KEY = process.env.INFURA_KEY;
    if (!INFURA_KEY) throw new Error("Chave INFURA_KEY não definida.");
    
    const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_KEY}`);
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

// Rota pública para consultar carteira
app.get("/carteira", async (req, res) => {
  const resultado = await conectarCarteira();
  res.json(resultado);
});

// =======================================================
// 🚀 INICIAR SERVIDOR
// =======================================================
app.listen(PORT, () => {
  console.log(`🤖 Robô Futuro online na porta ${PORT}`);
});

