
// renda-automatica.js
// Loop principal do robô de renda. Usa inteligencia-mercado.js
// Para operações reais: configure PROVIDER_URL e PRIVATE_KEY no .env
// Dependências: npm i ethers node-fetch dotenv

require('dotenv').config();
const { ethers } = require('ethers');
const { getPrices, generateSignal } = require('./inteligencia-mercado');

const CHECK_INTERVAL = parseInt(process.env.CHECK_INTERVAL_SEC || '25') * 1000; // ms
const TARGET_IDS = (process.env.TARGET_IDS || 'bitcoin,ethereum').split(','); // coingecko ids
const VS = process.env.VS || 'usd';
const WALLET_ADDR = process.env.WALLET_ADDR || '0x...suaCarteiraAqui'; // seu endereço público

// PROVIDER_URL (ex: Infura, Alchemy). PRIVATE_KEY para executar transações.
const PROVIDER_URL = process.env.PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

let provider = null;
let signer = null;
if (PROVIDER_URL && PRIVATE_KEY) {
  provider = new ethers.providers.JsonRpcProvider(PROVIDER_URL);
  signer = new ethers.Wallet(PRIVATE_KEY, provider);
  console.log('Signer configurado:', signer.address);
} else {
  console.log('AVISO: PROVIDER_URL ou PRIVATE_KEY não configurados. Apenas modo simulação.');
}

/**
 * Exemplo seguro: enviar ETH (valor em ether string) para sua carteira de lucros
 * ATENÇÃO: requer PRIVATE_KEY e provider. Usa ethers.
 */
async function sendProfitToWallet(amountEth = '0.001', to = WALLET_ADDR) {
  if (!signer) throw new Error('Signer não configurado (PRIVATE_KEY ausente).');
  const tx = {
    to,
    value: ethers.utils.parseEther(amountEth)
  };
  const response = await signer.sendTransaction(tx);
  await response.wait();
  return response.hash;
}

/**
 * Aqui você implementaria a execução real da troca (DEX)
 * Ex: usar 1inch API ou Uniswap Router.
 * Por segurança, a função abaixo é um STUB — substitua pelo seu integrador de DEX.
 *
 * @param {string} symbol exemplo 'bitcoin' ou 'ethereum'
 * @param {'COMPRAR'|'VENDER'} action
 */
async function executeTrade(symbol, action) {
  console.log(`EXECUTE TRADE -> ${action} em ${symbol}`);
  // ======= EXEMPLO: chamar 1inch API para swap (apenas ilustrativo) ========
  // Você pode usar a API 1inch para construir as rotas e depois assinar e enviar transação com signer.
  // Veja: https://docs.1inch.io/api/swagger
  //
  // Aqui deixo uma ação segura: se action === 'VENDER', enviamos 50% do saldo de ETH para a sua wallet (sacar lucro).
  try {
    if (!signer) {
      console.log('MOCK EXECUTION (sem chave): apenas logando a ação.');
      return { mock: true };
    }
    if (action === 'VENDER') {
      // exemplo: enviar 0.002 ETH para sua carteira como "retirada de lucro"
      const amount = process.env.PROFIT_WITHDRAW_ETH || '0.002';
      const hash = await sendProfitToWallet(amount, WALLET_ADDR);
      console.log('Profit enviado, txHash:', hash);
      return { txHash: hash };
    }
    // para COMPRAR: aqui você pode chamar DEX para swap ETH->token
    // Exemplo: construir chamada para Uniswap Router (swapExactETHForTokens)...
    return { ok: true, info: 'implement trade via DEX' };
  } catch (e) {
    console.error('Erro em executeTrade:', e.message);
    return { error: e.message };
  }
}

/**
 * Loop principal
 */
async function startLoop() {
  console.log('Iniciando módulo de Renda Automática...');
  let previousPrices = {};

  while (true) {
    try {
      const prices = await getPrices(TARGET_IDS, VS); // ex: { bitcoin: { usd: 12345 } }
      for (const id of TARGET_IDS) {
        const current = (prices[id] && prices[id][VS]) || 0;
        const prev = previousPrices[id];
        const signal = generateSignal(current, prev, {
          downPercent: parseFloat(process.env.DOWN_PCT || '-1.5'),
          upPercent: parseFloat(process.env.UP_PCT || '1.5')
        });
        console.log(new Date().toISOString(), id, 'preço', current, 'sinal', signal);

        // DECISÃO: só executa trade se sinal for COMPRAR ou VENDER
        if (signal === 'COMPRAR' || signal === 'VENDER') {
          const res = await executeTrade(id, signal);
          console.log('Resultado da execução:', res);
        }

        previousPrices[id] = current;
      }
    } catch (err) {
      console.error('Erro no loop:', err.message || err);
    }
    await new Promise(r => setTimeout(r, CHECK_INTERVAL));
  }
}

// rodar se executado diretamente
if (require.main === module) {
  startLoop().catch(e => {
    console.error('Erro fatal:', e);
    process.exit(1);
  });
}

module.exports = {
  startLoop,
  executeTrade,
  sendProfitToWallet
};
