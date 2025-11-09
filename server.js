
import express from "express";
import dotenv from "dotenv";
import cors from "cors";

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar o app
const app = express();
app.use(cors());
app.use(express.json());

// Importar o módulo automático
import "./renda-automatica.js";

// Página inicial
app.get("/", (req, res) => {
  res.send(`
    <h1>🤖 Robô Futuro conectado em modo real!</h1>
    <p>Status: <b>Online e ativo na nuvem Render 🚀</b></p>
    <p>Módulo de renda automática ativo ✅</p>
  `);
});

// Manter o app ativo
setInterval(() => {
  console.log("🔄 Robô Futuro verificando novas tarefas...");
}, 300000); // a cada 5 minutos

// Inicializar o servidor
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Servidor online na porta ${PORT}`);
  console.log("🤖 Robô Futuro rodando 100% autônomo!");
});
