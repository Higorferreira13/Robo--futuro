// 🌕 Robô Futuro — Monitor de Sistema e Notificações
import os from "os";
import fs from "fs";
import axios from "axios";

console.log("📡 Iniciando Módulo de Monitoramento do Robô Futuro...");

function coletarStatus() {
  const memoria = (os.freemem() / os.totalmem()) * 100;
  const uptime = os.uptime() / 3600;
  const relatorio = fs.existsSync("./relatorio-renda.json")
    ? JSON.parse(fs.readFileSync("./relatorio-renda.json", "utf-8"))
    : {};

  return {
    data: new Date().toLocaleString("pt-BR"),
    memoriaDisponivel: `${memoria.toFixed(1)}%`,
    tempoAtivo: `${uptime.toFixed(2)}h`,
    oportunidades: relatorio.resultados ? relatorio.resultados.length : 0,
  };
}

async function enviarStatus() {
  const status = coletarStatus();
  console.log("📊 Status atual:", status);

  // Envio opcional para Telegram (adicione o seu BOT_TOKEN e CHAT_ID no .env)
  if (process.env.BOT_TOKEN && process.env.CHAT_ID) {
    try {
      await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
        chat_id: process.env.CHAT_ID,
        text: `🤖 Robô Futuro Atualização:\n🕒 ${status.data}\n📊 Oportunidades: ${status.oportunidades}\n💾 Memória: ${status.memoriaDisponivel}\n⏱ Uptime: ${status.tempoAtivo}`,
      });
      console.log("✅ Status enviado para o Telegram!");
    } catch (err) {
      console.error("⚠️ Erro ao enviar para Telegram:", err.message);
    }
  }
}

setInterval(enviarStatus, 1800000); // Envia a cada 30 minutos
enviarStatus();
