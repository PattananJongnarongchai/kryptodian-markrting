export interface CryptoData {
  [x: string]: string | undefined;
  id: string;
  name: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
  // Add more fields as needed
}
