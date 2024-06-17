import axios from "axios";
import { Coin, CoinData } from "../types"; // ตรวจสอบว่ามีการนำเข้า CoinData ถูกต้อง

const BASE_URL = "https://api.coingecko.com/api/v3";

export const fetchCoins = async (): Promise<Coin[]> => {
  try {
    const response = await axios.get<Coin[]>(`${BASE_URL}/coins/list`);
    const filteredCoins = response.data.filter((coin) =>
      ["bitcoin", "ethereum"].includes(coin.id)
    );
    return filteredCoins;
  } catch (error) {
    console.error("Error fetching coin list:", error);
    return [];
  }
};

// ฟังก์ชัน fetchCoinData ต้องมีประกาศดังนี้:
export const fetchCoinData = async (
  coinId: string
): Promise<CoinData | null> => {
  try {
    const response = await axios.get<CoinData>(`${BASE_URL}/coins/${coinId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data for coin ${coinId}:`, error);
    return null;
  }
};
export interface CoinData {
  market_data: {
    price_change_percentage_24h_in_currency: {
      [key: string]: number;
    };
  };
}
