// 🚀 Robô Futuro - Servidor Principal + Módulos de Renda e Web3
const express = require("express");
const axios = require("axios");
const fs = require("fs");
const { ethers } = require("ethers");
const app = express();
const PORT = process.env.PORT || 3000;

// ================================
// 🔹 Função de geração de renda automática
// ================================
async function gerarRenda() {
  console.log("💰 Procurando oportunidades de lucro...");

  try {
    // Simulação de ganho (pode ser trocado por API real no futuro)
    const ganhos = Math.random() * 0.005; // até 0.5% de lucro
    console.log(`✅ Lucro gerado: ${ganhos.toFixed(6)} ETH`);

    // Salvar no registro local
    await registrarAtividade(`Lucro gerado: ${ganhos.toFixed(6)} ETH`);

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

// ================================
// 🔹 Módulo Web3 - conexão com carteira
// ================================
async function conectarCarteira() {
  try {
    const INFURA_KEY = process.env.INFURA_KEY;
    if (!INFURA_KEY) throw new Error("Chave INFURA_KEY não definida.");

    const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_KEY}`);
    const carteira = "0xDA2e3B678439059fb473204398423Cbe0b2bA40f";

    const saldo = await provider.getBalance(carteira);
    const saldoETH = ethers.formatEther(saldo);

    console.log(`🔗 Carteira conectada: ${carteira}`);
    console.log(`💎 Saldo atual: ${saldoETH} ETH`);

    await registrarAtividade(`Saldo atual da carteira: ${saldoETH} ETH`);

    return {
      status: "ok",
      carteira,
      saldo: saldoETH,
      timestamp: new Date().toISOString()
    };
  } catch (err) {
    console.error("❌ Erro ao conectar carteira:", err.message);
    return { status: "erro", mensagem: err.message };
  }
}

// ================================
// 🔹 Função para registrar atividades em arquivo
// ================================
async function registrarAtividade(dados) {
  const linha = `${new Date().toISOString()} | ${dados}\n`;
  fs.appendFileSync("registro.txt", linha);
  console.log("📝 Registro salvo:", linha);
}

// ================================
// 🔹 Rotas do servidor
// ================================
app.get("/", (req, res) => {
  res.send("🤖 Robô Futuro está online e operando normalmente!");
});

app.get("/renda", async (req, res) => {
  const resultado = await gerarRenda();
  res.json(resultado);
});

app.get("/carteira", async (req, res) => {
  const resultado = await conectarCarteira();
  res.json(resultado);
});

// ================================
// 🔹 Loop automático - Robô 24h
// ================================
setInterval(async () => {
  console.log("🤖 Ciclo automático iniciado...");
  await gerarRenda();
  await conectarCarteira();
  console.log("✅ Ciclo completo concluído.\n");
}, 1800000); // A cada 30 minutos

// ================================
// 🔹 Ping automático (mantém Render ativo)
// ================================
setInterval(() => {
  axios.get("https://robo-futuro.onrender.com")
    .then(() => console.log("🌐 Ping automático enviado para manter o robô ativo"))
    .catch(() => console.log("⚠️ Falha no ping automático"));
}, 840000); // a cada 14 minutos

// ================================
// 🔹 Inicialização do servidor
// ================================
app.listen(PORT, () => {
  console.log(`🚀 Servidor Robô Futuro rodando na porta ${PORT}`);
});

