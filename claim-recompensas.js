// 🌕 Robô Futuro - Módulo de Claim de Recompensas
import fs from "fs";
import axios from "axios";

console.log("🎯 Iniciando Módulo de Claim de Recompensas...");

const caminhoComprovantes = "./comprovantes/";

if (!fs.existsSync(caminhoComprovantes)) {
  fs.mkdirSync(caminhoComprovantes);
}

async function buscarRecompensas() {
  console.log("🔎 Procurando novas recompensas em plataformas Web3...");

  const plataformas = [
    "https://api.galxe.com",
    "https://api.zealy.io",
    "https://crew3.xyz/api",
  ];

  for (const plataforma of plataformas) {
    try {
      const resposta = await axios.get(plataforma);
      const recompensa = {
        plataforma,
        data: new Date().toLocaleString("pt-BR"),
        status: "🎁 Detectada nova oportunidade!",
      };

      fs.writeFileSync(
        `${caminhoComprovantes}/comprovante-${Date.now()}.json`,
        JSON.stringify(recompensa, null, 2)
      );

      console.log(`💰 Recompensa salva de ${plataforma}`);
    } catch {
      console.log(`⚠️ Nenhuma recompensa disponível em ${plataforma}`);
    }
  }
}

setInterval(buscarRecompensas, 3600000); // roda a cada 1 hora
buscarRecompensas();
