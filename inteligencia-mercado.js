// inteligencia-mercado.js
import axios from "axios";

export async function iniciarAnaliseMercado() {
  console.log("🧠 Iniciando análise de mercado automática...");

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,usd-coin&vs_currencies=usd"
    );

    const dados = response.data;

    const btc = dados.bitcoin.usd;
    const eth = dados.ethereum.usd;
    const usdc = dados["usd-coin"].usd;

    console.table([
      { índice: 0, token: "BTC", preço: `$${btc}`, oportunidade: btc < 60000 ? "COMPRAR" : "AGUARDAR" },
      { índice: 1, token: "ETH", preço: `$${eth}`, oportunidade: eth < 3500 ? "COMPRAR" : "AGUARDAR" },
      { índice: 2, token: "USDC", preço: `$${usdc}`, oportunidade: "ESTÁVEL" },
    ]);

    console.log("🧩 Módulo de inteligência de mercado ativo com sucesso!");
  } catch (erro) {
    console.error("❌ Erro ao buscar dados de mercado:", erro.message);
  }
}
