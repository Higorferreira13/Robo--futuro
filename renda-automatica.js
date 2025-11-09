import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

const API_URL = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,usd-coin&vs_currencies=usd";

async function buscarOportunidades() {
  console.log("🔍 Buscando oportunidades de renda...");

  try {
    const resposta = await fetch(API_URL);
    const dados = await resposta.json();

    const btc = dados.bitcoin?.usd || 0;
    const eth = dados.ethereum?.usd || 0;
    const usdc = dados["usd-coin"]?.usd || 0;

    console.log(`📊 BTC: $${btc} | ETH: $${eth} | USDC: $${usdc}`);

    const oportunidades = [
      { token: "BTC", preco: btc, oportunidade: btc < 65000 ? "COMPRAR" : "AGUARDAR" },
      { token: "ETH", preco: eth, oportunidade: eth < 3000 ? "COMPRAR" : "AGUARDAR" },
      { token: "USDC", preco: usdc, oportunidade: "ESTÁVEL" },
    ];

    console.table(oportunidades);
    console.log("💰 Módulo de renda automática ativo com sucesso!");

  } catch (erro) {
    console.error("❌ Erro ao buscar oportunidades:", erro.message);
  }
}

setInterval(buscarOportunidades, 60000);
buscarOportunidades();

console.log("🤖 Módulo de Renda Automática iniciado!");
