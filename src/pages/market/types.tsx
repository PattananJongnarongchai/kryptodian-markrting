export interface Coin {
  id: string;
  symbol: string;
  name: string;
}

export interface CoinData {
  id: string;
  market_data: {
    [x: string]: { [s: string]: unknown; } | ArrayLike<unknown>;
    current_price: {
      usd: number;
    };
  };
  // เพิ่มตามความต้องการของข้อมูลที่จะแสดง
}
