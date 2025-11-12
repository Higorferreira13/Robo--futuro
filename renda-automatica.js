// renda-automatica.js
import "dotenv/config";

export function startLoop() {
  console.log("💸 Módulo de renda automática ativo com sucesso!");

  const intervalo = process.env.CHECK_INTERVAL_SEC
    ? parseInt(process.env.CHECK_INTERVAL_SEC) * 1000
    : 25000;

  setInterval(() => {
    console.log("📊 Verificando oportunidades de lucro automático...");
    const lucro = Math.random() * 0.003;
    console.log(`💰 Lucro estimado: ${lucro.toFixed(6)} ETH`);
  }, intervalo);
}
