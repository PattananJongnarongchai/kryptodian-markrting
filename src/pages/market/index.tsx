import { useState, useEffect, ChangeEvent } from "react";
import { fetchCoins, fetchCoinData } from "@/pages/market/lib/coingecko";
import { Coin, CoinData } from "./types";
import {
  Container,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
} from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

// ตั้งค่าสำหรับ ChartJS
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function Market() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<string>("bitcoin");
  const [coinData, setCoinData] = useState<CoinData | null>(null);

  // ประกาศฟังก์ชัน loadCoinData นอก useEffect
  async function loadCoinData(coinId: string) {
    const data = await fetchCoinData(coinId);
    setCoinData(data);
  }

  useEffect(() => {
    async function loadCoins() {
      const coins = await fetchCoins();
      setCoins(coins);
      loadCoinData("bitcoin"); // โหลดข้อมูลเริ่มต้นสำหรับ Bitcoin
    }

    loadCoins();
  }, []);

  useEffect(() => {
    if (selectedCoin) {
      loadCoinData(selectedCoin);
    }
  }, [selectedCoin]);

  const handleChange = (event: ChangeEvent<{ value: unknown }>) => {
    setSelectedCoin(event.target.value as string);
  };

  // สร้างข้อมูลสำหรับกราฟแบบแท่ง
  const labels = coinData
    ? Object.keys(coinData.market_data.price_change_percentage_24h_in_currency)
    : [];
  const values = coinData
    ? Object.values(
        coinData.market_data.price_change_percentage_24h_in_currency
      )
    : [];
  const backgroundColors = values.map((value) =>
    value >= 0 ? "rgba(75, 192, 192, 0.5)" : "rgba(255, 99, 132, 0.5)"
  );
  const borderColors = values.map((value) =>
    value >= 0 ? "rgba(75, 192, 192, 1)" : "rgba(255, 99, 132, 1)"
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Price Change % Last 24 Hours",
        data: values,
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <>
      <Typography
        variant="h3"
        sx={{
          mt: 4,
          mb: 2,
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "2rem",
        }}
      >
        Market
      </Typography>
      <Container maxWidth="sm" className="mt-5">
        <FormControl fullWidth>
          <InputLabel id="coin-select-label">Select Coin</InputLabel>
          <Select
            labelId="coin-select-label"
            value={selectedCoin}
            label="Select Coin"
            onChange={handleChange}
          >
            {coins.map((coin) => (
              <MenuItem key={coin.id} value={coin.id}>
                {coin.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {coinData && (
          <div style={{ width: "100%", height: "400px" }}>
            <Bar data={data} options={options} />
          </div>
        )}
      </Container>
    </>
  );
}
