// server.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar o app
const app = express();
app.use(cors());
app.use(express.json());

// Importar módulos principais
import { startLoop } from "./renda-automatica.js";
import { iniciarAnaliseMercado } from "./inteligencia-mercado.js";

// Página inicial
app.get("/", (req, res) => {
  res.send(`
    <h1>🤖 Robô Futuro conectado na nuvem Render</h1>
    <p>Status: <b>Online e operando em modo real</b> 🚀</p>
    <p>Módulo de Renda Automática: ✅ Ativo</p>
    <p>Módulo de Inteligência de Mercado: 🧠 Ativo</p>
  `);
});

// Inicializar os módulos
(async () => {
  try {
    console.log("🧠 Iniciando módulo de inteligência de mercado...");
    await iniciarAnaliseMercado();

    console.log("💸 Iniciando módulo de renda automática...");
    await startLoop();

    console.log("✅ Todos os módulos iniciados com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao iniciar módulos:", error);
  }
})();

// Manter o app ativo (ping preventivo)
setInterval(() => {
  console.log("🔄 Robô Futuro ativo, verificando novas oportunidades...");
}, 180000); // 3 minutos

// Iniciar servidor web
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Servidor online na porta ${PORT}`);
  console.log("🤖 Robô Futuro rodando em modo contínuo!");
});
