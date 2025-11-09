// 🔹 Módulo Web3 do Robô Futuro (versão real)
const { ethers } = require("ethers");

const INFURA_KEY = process.env.INFURA_KEY;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

if (!INFURA_KEY) console.warn("⚠️ Chave INFURA_KEY não definida.");
if (!PRIVATE_KEY) console.warn("⚠️ Chave PRIVATE_KEY não definida (modo leitura).");

// Conexão principal com Ethereum (pode trocar pra outra rede se quiser)
const provider = new ethers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_KEY}`);

let wallet = null;
if (PRIVATE_KEY) {
  wallet = new ethers.Wallet(PRIVATE_KEY, provider);
}

async function conectarCarteira() {
  try {
    const carteira = wallet ? wallet.address : "0xDA2e3B678439059fb473204398423Cbe0b2bA40f";
    const saldoWei = await provider.getBalance(carteira);
    const saldo = ethers.formatEther(saldoWei);
    return { status: "ok", carteira, saldo, timestamp: new Date().toISOString() };
  } catch (err) {
    return { status: "erro", mensagem: err.message };
  }
}

async function enviarTx({ to, amountEth }) {
  if (!wallet) return { status: "erro", mensagem: "PRIVATE_KEY não configurada." };
  try {
    const value = ethers.parseEther(String(amountEth));
    const tx = await wallet.sendTransaction({ to, value });
    return { status: "ok", txHash: tx.hash };
  } catch (err) {
    return { status: "erro", mensagem: err.message };
  }
}

module.exports = { conectarCarteira, enviarTx };

