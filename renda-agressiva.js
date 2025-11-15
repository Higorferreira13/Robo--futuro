// Robô Futuro – Renda Real Agressiva v1.0
import fetch from "node-fetch";
import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();

const API_KEY = process.env.OKX_API_KEY;
const API_SECRET = process.env.OKX_API_SECRET;
const PASS = process.env.OKX_API_PASSPHRASE;

const BASE_URL = "https://www.okx.com";

// Função para assinar chamadas reais
function assinatura(method, path, body = "") {
    const timestamp = new Date().toISOString();
    const prehash = timestamp + method + path + body;
    const hmac = crypto.createHmac("sha256", API_SECRET);
    const sign = hmac.update(prehash).digest("base64");

    return { timestamp, sign };
}

// Enviar requisição assinada
async function okxRequest(method, path, body = "") {
    const { timestamp, sign } = assinatura(method, path, body);

    const headers = {
        "OK-ACCESS-KEY": API_KEY,
        "OK-ACCESS-SIGN": sign,
        "OK-ACCESS-TIMESTAMP": timestamp,
        "OK-ACCESS-PASSPHRASE": PASS,
        "Content-Type": "application/json"
    };

    const response = await fetch(BASE_URL + path, {
        method,
        headers,
        body: body || undefined
    });

    return response.json();
}

// Buscar saldo da conta
async function saldo() {
    const r = await okxRequest("GET", "/api/v5/account/balance");
    return r.data?.[0]?.details || [];
}

// Selecionar moeda mais volátil (base)
const PARES = ["BTC-USDT", "ETH-USDT", "SOL-USDT", "DOGE-USDT", "XRP-USDT"];

// Comprar agressivo
async function comprar(par, valor) {
    console.log("⚡ Entrando no mercado agressivo:", par);

    const body = JSON.stringify({
        instId: par,
        tdMode: "cash",
        side: "buy",
        ordType: "market",
        sz: valor.toString()
    });

    return okxRequest("POST", "/api/v5/trade/order", body);
}

// Vender agressivo
async function vender(par, valor) {
    console.log("🔥 Realizando saída agressiva:", par);

    const body = JSON.stringify({
        instId: par,
        tdMode: "cash",
        side: "sell",
        ordType: "market",
        sz: valor.toString()
    });

    return okxRequest("POST", "/api/v5/trade/order", body);
}

// Estratégia principal
async function operarAgressivo() {
    console.log("🚀 Iniciando Renda Real Agressiva...");

    // Busca saldo
    const s = await saldo();
    const usdt = s.find(x => x.ccy === "USDT");

    if (!usdt || usdt.cashBal < 5) {
        console.log("❌ Saldo insuficiente para operar (mínimo USDT 5)");
        return;
    }

    const saldoDisponivel = Number(usdt.cashBal);

    // Divide entrada agressiva: 25% do saldo
    const entrada = (saldoDisponivel * 0.25).toFixed(2);

    const par = PARES[Math.floor(Math.random() * PARES.length)];

    console.log(`💰 Saldo: ${saldoDisponivel} USDT`);
    console.log(`🎯 Entrada agressiva: ${entrada} USDT no par ${par}`);

    // Compra
    const compra = await comprar(par, entrada);
    console.log("👍 Compra executada:", compra);

    // Espera movimento curto antes de vender
    const tempoEspera = Math.floor(Math.random() * 90000) + 30000;
    console.log(`⏳ Aguardando movimento de mercado: ${tempoEspera / 1000}s...`);

    await new Promise(r => setTimeout(r, tempoEspera));

    // Venda
    const venda = await vender(par, entrada);
    console.log("💵 Venda executada:", venda);

    console.log("✅ Ciclo agressivo finalizado!");
}

// Executa a cada 5 minutos
setInterval(operarAgressivo, 300000);
operarAgressivo();
