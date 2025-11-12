// inteligencia-mercado.js
import axios from "axios";

export function iniciarAnaliseMercado() {
  console.log("🧠 Iniciando análise de mercado automatizada...");

  const ativos = process.env.TARGET_IDS
    ? process.env.TARGET_IDS.split(",")
    : ["bitcoin", "ethereum", "usd-coin"];

  async function analisar() {
    try {
      console.log("🔍 Buscando oportunidades de renda...");

      const response = await axios.get("https://api.coingecko.com/api/v3/simple/price", {
        params: {
          ids: ativos.join(","),
          vs_currencies: "usd",
        },
      });

      const data = response.data;

      console.log("┌─────────────┬──────────────┬────────────┐");
      console.log("| índice | token | preço | oportunidade |");
      console.log("├─────────────┼──────────────┼────────────┤");

      let i = 0;
      for (const token of ativos) {
        const preco = data[token]?.usd || 0;
        const oportunidade =
          preco < 1000 ? "COMPRAR" : preco > 2000 ? "VENDER" : "ESTÁVEL";
        console.log(`| ${i++} | ${token.toUpperCase()} | $${preco} | ${oportunidade} |`);
      }

      console.log("└─────────────┴──────────────┴────────────┘");
    } catch (err) {
      console.error("❌ Erro ao buscar dados de mercado:", err.message);
    }
  }

  // Executa a cada 1 minuto
  analisar();
  setInterval(analisar, 60000);
}
