// renda-automatica.js
import { ethers } from "ethers";

const RPC = process.env.PROVIDER_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const WALLET_ADDR = process.env.WALLET_ADDR;
const PROFIT_WITHDRAW_ETH = parseFloat(process.env.PROFIT_WITHDRAW_ETH || "0.002");

if(!RPC || !PRIVATE_KEY || !WALLET_ADDR){
  console.error("Variáveis de ambiente faltando em renda-automatica.js");
}

const provider = new ethers.providers.JsonRpcProvider(RPC);
const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

// exportaremos startLoop para o server.js
export async function startLoop(){
  console.log("🔁 startLoop da renda automática iniciado");
  try {
    // exemplo simples: checar saldo do endereço do robô (wallet)
    const balance = await provider.getBalance(wallet.address);
    const balanceEth = parseFloat(ethers.utils.formatEther(balance));
    console.log("💰 Saldo do robô (ETH):", balanceEth);

    // se saldo >= PROFIT_WITHDRAW_ETH, faz transferência para WALLET_ADDR
    if(balanceEth >= PROFIT_WITHDRAW_ETH){
      const amountToSend = PROFIT_WITHDRAW_ETH; // valor a enviar (padrão)
      console.log("➡️ Enviando lucro:", amountToSend, "ETH para", WALLET_ADDR);

      const tx = await wallet.sendTransaction({
        to: WALLET_ADDR,
        value: ethers.utils.parseEther(amountToSend.toString()),
        // gasLimit e gasPrice podemos deixar pro provedor estimar
      });
      console.log("TX enviado:", tx.hash);
      await tx.wait();
      console.log("✅ TX confirmada:", tx.hash);
    } else {
      console.log("🔎 Sem lucro suficiente ainda. Meta:", PROFIT_WITHDRAW_ETH);
    }
  } catch (e) {
    console.error("Erro em startLoop:", e && e.message ? e.message : e);
  }
}
