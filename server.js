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

// Página inicial (teste online)
app.get("/", (req, res) => {
  res.send(`
    <h1>🤖 Robô Futuro conectado na nuvem Render</h1>
    <p>Status: <b>Online e operando em modo real</b> 🚀</p>
    <p>Módulo de Renda Automática: ✅ Ativo</p>
    <p>Módulo de Inteligência de Mercado: 🧠 Ativo</p>
  `);
});

// Iniciar os módulos automáticos
try {
  console.log("🧠 Iniciando módulo de inteligência de mercado...");
  iniciarAnaliseMercado();

  console.log("💸 Iniciando módulo de renda automática...");
  startLoop();

  console.log("✅ Todos os módulos iniciados com sucesso!");
} catch (error) {
  console.error("❌ Erro ao iniciar os módulos:", error);
}

// Manter o app ativo (ping preventivo)
setInterval(() => {
  console.log("🔄 Robô Futuro verificando novas oportunidades...");
}, 300000); // 5 minutos

// Inicializar servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Servidor online na porta ${PORT}`);
  console.log("🤖 Robô Futuro rodando 100% autônomo!");
});
