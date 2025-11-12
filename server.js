
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import { startLoop } from "./renda-automatica.js";
import { iniciarAnaliseMercado } from "./inteligencia-mercado.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
  res.send(`<h1>Robô Futuro conectado na nuvem Render</h1>
    <p>Status: <b>Online</b></p>`);
});

// iniciar módulos
(async () => {
  try {
    console.log("🔧 Iniciando módulo de inteligência de mercado...");
    await iniciarAnaliseMercado();

    console.log("💸 Iniciando módulo de renda automática...");
    await startLoop();

    console.log("✅ Todos os módulos iniciados com sucesso!");
  } catch (error) {
    console.error("❌ Erro ao iniciar módulos:", error);
  }
})();

setInterval(() => {
  console.log("🫧 Ping preventivo: Robô Futuro ativo");
}, parseInt(process.env.CHECK_INTERVAL_SEC || "180") * 1000 || 180000);

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Servidor online na porta ${PORT}`);
});
