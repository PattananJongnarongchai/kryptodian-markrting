// File: types.tsx

// CryptoData interface defines the structure for cryptocurrency information.
export interface CryptoData {
  [x: string]: any;
  // Unique identifier for the cryptocurrency.
  id: string;

  // Display name of the cryptocurrency.
  name: string;

  // Current price of the cryptocurrency in USD.
  current_price: number;

  // Current market capitalization in USD.
  market_cap: number;

  // Percentage change in price over the last 24 hours.
  price_data: {
    // Use nested structure to potentially include more time-specific price data.
    change_24h: number; // Adjust field name for clarity.
    // Potential additional fields:
    // change_7d: number;
    // change_30d: number;
  };

  // Optionally, include the symbol for the cryptocurrency.
  shortName?: string;

  // URL to the image/icon of the cryptocurrency.
  image?: string;

  // Additional fields can be added here as needed, such as:
  // volume_24h: number; // Trading volume over the last 24 hours.
  // circulating_supply: number; // Current circulating supply.
}

// This Record type can be used if dynamic keys are needed for extending data handling.
export type CryptoDataRecord = Record<string, CryptoData>;

// Extend this file with more types as your application grows.
