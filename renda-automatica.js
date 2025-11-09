// renda-automatica.js
import fetch from "node-fetch";
import fs from "fs";

console.log("🤖 Iniciando Módulo de Renda Automática...");

// Dados da carteira
const carteira = "0xDA2e3B678439059fb473204398423Cbe0b2bA40f";
const logFile = "./renda-log.txt";

async function buscarOportunidades() {
  console.log("🔍 Buscando oportunidades Web3 e airdrops...");
  try {
    const respostas = await Promise.all([
      fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum,bitcoin&vs_currencies=usd"),
      fetch("https://api.binance.com/api/v3/ticker/price"),
    ]);

    const [precos, binance] = await Promise.all(respostas.map(r => r.json()));

    const data = {
      hora: new Date().toLocaleString(),
      carteira,
      oportunidades: [
        { nome: "ETH", valor: precos.ethereum.usd },
        { nome: "BTC", valor: precos.bitcoin.usd },
      ],
      binance: binance.slice(0, 5),
    };

    // Salva log local (Render armazena temporariamente)
    fs.writeFileSync(logFile, JSON.stringify(data, null, 2));
    console.log("💼 Dados atualizados e salvos:", data.oportunidades);
    console.log("📦 Relatório pronto para envio ao Google Drive.");

  } catch (erro) {
    console.error("❌ Erro ao buscar oportunidades:", erro.message);
  }
}

// Roda a cada 30 minutos automaticamente
setInterval(buscarOportunidades, 30 * 60 * 1000);
buscarOportunidades();
