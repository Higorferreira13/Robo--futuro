import OKXRest from "okx-api";
import dotenv from "dotenv";
dotenv.config();

export const okx = new OKXRest({
  apiKey: process.env.OKX_API_KEY,
  apiSecret: process.env.OKX_API_SECRET,
  passphrase: process.env.OKX_API_PASSWORD,
  flag: "1" // modo real
});
