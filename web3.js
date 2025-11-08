// 🔹 Robô Futuro - Módulo Web3 (Modo Real)
require("dotenv").config();
const { ethers } = require("ethers");

const INFURA_KEY = process.env.INFURA_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY || null;
const NETWORK = process.env.NETWORK || "mainnet"; // use "sepolia" para teste

if (!INFURA_KEY) {
  throw new Error("Chave INFURA_KEY não definida.");
}

const provider = new ethers.JsonRpcProvider(`https://${NETWORK}.infura.io/v3/${INFURA_KEY}`);
let wallet = null;

if (PRIVATE_KEY) {
  wallet = new ethers.Wallet(PRIVATE_KEY, provider);
  console.log("🔑 Carteira conectada no modo real:", wallet.address);
} else {
  console.log("🔍 Modo somente leitura - nenhuma PRIVATE_KEY configurada.");
}

async function conectarCarteira() {
  try {
    const carteira = wallet ? wallet.address : "Somente leitura";
    const saldo = await provider.getBalance(wallet ? wallet.address : "0x0000000000000000000000000000000000000000");
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

async function enviarTx(to, amountEth) {
  if (!wallet) return { status: "erro", mensagem: "PRIVATE_KEY não configurada para enviar transações." };
  try {
    console.log(`🚀 Enviando ${amountEth} ETH para ${to}...`);
    const tx = await wallet.sendTransaction({
      to,
      value: ethers.parseEther(String(amountEth))
    });
    await tx.wait();
    console.log("✅ Transação confirmada:", tx.hash);
    return { status: "ok", hash: tx.hash };
  } catch (err) {
    console.error("❌ Erro ao enviar transação:", err.message);
    return { status: "erro", mensagem: err.message };
  }
}

module.exports = { conectarCarteira, enviarTx };

