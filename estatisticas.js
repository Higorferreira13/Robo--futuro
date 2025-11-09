// 🌕 Robô Futuro — Módulo de Estatísticas Automáticas v1.0
import fs from "fs";
import { google } from "googleapis";
import dotenv from "dotenv";
dotenv.config();

console.log("📊 Iniciando Módulo de Estatísticas Automáticas...");

const caminhoRelatorio = "./relatorio-renda.json";
const caminhoCredenciais = "./credentials.json"; // arquivo de acesso Google API

async function atualizarPlanilha() {
  try {
    if (!fs.existsSync(caminhoRelatorio)) {
      console.log("⚠️ Nenhum relatório encontrado ainda. Aguardando próxima varredura...");
      return;
    }

    const relatorio = JSON.parse(fs.readFileSync(caminhoRelatorio, "utf-8"));
    const resultados = relatorio.resultados || [];

    console.log(`🗂️ Enviando ${resultados.length} registros para a planilha...`);

    // Autenticação Google Sheets
    const auth = new google.auth.GoogleAuth({
      keyFile: caminhoCredenciais,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.SHEET_ID;

    const valores = resultados.map((r) => [
      new Date().toLocaleString("pt-BR"),
      r.plataforma,
      r.status,
      r.tamanho || "—",
    ]);

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Registros!A:D",
      valueInputOption: "RAW",
      requestBody: { values: valores },
    });

    console.log("✅ Dados enviados com sucesso para o Google Sheets!");
  } catch (erro) {
    console.error("❌ Erro ao atualizar estatísticas:", erro.message);
  }
}

// Executa a cada 1 hora
setInterval(atualizarPlanilha, 3600000);
atualizarPlanilha();
