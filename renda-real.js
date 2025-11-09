
// 🌕 Robô Futuro — Módulo de Renda Real v1.2
import fetch from "node-fetch";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

console.log("🚀 Iniciando Módulo de Renda Real do Robô Futuro...");
console.log("🔗 Conectando às plataformas Galxe, Zealy e Layer3...");

// Lista de plataformas com endpoints reais
const fontes = [
  {
    nome: "Galxe",
    url: "https://graphigo.prd.galaxy.eco/query",
    payload: {
      query: `
        {
          campaigns(first: 5, orderBy: updatedAt, orderDirection: desc) {
            edges {
              node {
                id
                name
                space {
                  name
                }
                reward
                endTime
              }
            }
          }
        }
      `,
    },
  },
  {
    nome: "Zealy",
    url: "https://api.zealy.io/communities/trending",
    payload: null,
  },
  {
    nome: "Layer3",
    url: "https://beta.layer3.xyz/api/tasks",
    payload: null,
  },
];

// Função para consultar plataformas
async function buscarOportunidades() {
  console.log(`\n⏳ Iniciando varredura de mercado às ${new Date().toLocaleString("pt-BR")}`);
  const resultados = [];

  for (const fonte of fontes) {
    try {
      let resposta;
      if (fonte.payload) {
        resposta = await fetch(fonte.url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(fonte.payload),
        });
      } else {
        resposta = await fetch(fonte.url);
      }

      const dados = await resposta.json();
      const total = JSON.stringify(dados).length;
      resultados.push({
        plataforma: fonte.nome,
        status: "✅ Online",
        tamanho: total,
      });
    } catch (erro) {
      resultados.push({
        plataforma: fonte.nome,
        status: "⚠️ Erro de conexão",
        detalhe: erro.message,
      });
    }
  }

  // Mostrar resultados no terminal
  console.table(resultados);

  // Salvar relatório em arquivo local
  const hora = new Date().toISOString();
  const relatorio = { data: hora, resultados };
  fs.writeFileSync("relatorio-renda.json", JSON.stringify(relatorio, null, 2));

  console.log("📁 Relatório salvo em relatorio-renda.json");
  console.log("💰 Robô Futuro varredura concluída com sucesso!");
}

// Executa a função a cada 45 minutos
setInterval(buscarOportunidades, 2700000);
buscarOportunidades();
