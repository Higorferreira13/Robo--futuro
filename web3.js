nano web3.js
// 🔹 Módulo Web3 do Robô Futuro
const { ethers } = require("ethers");

async function conectarCarteira() {
  try {
    const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_API_KEY");
    const carteira = "0xDA2e3B678439059fb473204398423Cbe0b2bA40f";
    
    const saldo = await provider.getBalance(carteira);
    console.log(`🔗 Carteira conectada: ${carteira}`);
    console.log(`💎 Saldo atual: ${ethers.formatEther(saldo)} ETH`);

    return { status: "ok", carteira, saldo: ethers.formatEther(saldo) };
  } catch (err) {
    console.error("❌ Erro ao conectar carteira:", err.message);
    return { status: "erro" };
  }
}

module.exports = { conectarCarteira };

