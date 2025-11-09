import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

console.log("🚀 Módulo de Geração de Renda Real iniciado...");

// URLs de fontes de airdrops e recompensas
const fontes = [
  "https://api.layer3.xyz/api/v0/tasks", // Layer3
  "https://api.zealy.io/communities/trending", // Zealy
  "https://api.galxe.com/query", // Galxe (requere payload)
];

// Função principal
async function buscarOportunidades() {
  console.log("🔍 Escaneando plataformas de recompensas...");

  const resultados = [];

  for (const url of fontes) {
    try {
      const resposta = await fetch(url);
      const dados = await resposta.json();
      resultados.push({ fonte: url, status: "✅ Ativa", total: Object.keys(dados).length });
    } catch (erro) {
      resultados.push({ fonte: url, status: "⚠️ Offline ou restrita", total: 0 });
    }
  }

  // Log no console e salvamento local
  console.table(resultados);
  const hora = new Date().toLocaleString("pt-BR");
  const relatorio = { data: hora, resultados };
  fs.writeFileSync("relatorio-renda.json", JSON.stringify(relatorio, null, 2));

  console.log("📁 Relatório de oportunidades atualizado: relatorio-renda.json");
  console.log("💰 Módulo de Renda Real ativo e trabalhando!");
}

// Executa a cada 30 minutos
setInterval(buscarOportunidades, 1800000);
buscarOportunidades();
