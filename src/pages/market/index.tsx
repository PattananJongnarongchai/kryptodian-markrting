import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
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
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Market = () => {
  const [priceChangeData, setPriceChangeData] = useState({
    labels: [],
    datasets: [
      {
        label: "Price Change % (24h)",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  const [topMovers, setTopMovers] = useState([]);

  useEffect(() => {
    const fetchPriceChangeData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 100,
              page: 1,
              price_change_percentage: "24h",
            },
          }
        );
        const data = response.data;
        const labels = [];
        const datasetData = [];
        const backgroundColors = [];
        const borderColors = [];

        data.forEach((coin) => {
          const changePercentage = coin.price_change_percentage_24h;
          labels.push(coin.symbol.toUpperCase());
          datasetData.push(changePercentage);
          const color =
            changePercentage >= 0
              ? "rgba(75, 192, 192, 0.5)"
              : "rgba(255, 99, 132, 0.5)";
          const borderColor =
            changePercentage >= 0
              ? "rgba(75, 192, 192, 1)"
              : "rgba(255, 99, 132, 1)";
          backgroundColors.push(color);
          borderColors.push(borderColor);
        });

        setPriceChangeData({
          labels,
          datasets: [
            {
              label: "Price Change % (24h)",
              data: datasetData,
              backgroundColor: backgroundColors,
              borderColor: borderColors,
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching price change data", error);
      }
    };

    const fetchTopMovers = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "percent_change_24h_desc",
              per_page: 10,
              page: 1,
            },
          }
        );
        const topMoversData = response.data.map((coin) => ({
          name: `${coin.symbol ? coin.symbol.toUpperCase() : "N/A"}/USD`,
          status: coin.price_change_percentage_24h > 0 ? "Rally" : "Pullback",
          change: `${
            coin.price_change_percentage_24h
              ? coin.price_change_percentage_24h.toFixed(2)
              : "N/A"
          }%`,
        }));
        setTopMovers(topMoversData);
      } catch (error) {
        console.error("Error fetching top movers data", error);
      }
    };

    fetchPriceChangeData();
    fetchTopMovers();
  }, []);

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6">Price Change Distribution</Typography>
              <div style={{ width: "100%", height: "400px" }}>
                <Bar data={priceChangeData} options={barOptions} />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Top Movers</Typography>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Change</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {topMovers.map((mover, index) => (
                      <TableRow key={index}>
                        <TableCell>{mover.name}</TableCell>
                        <TableCell>{mover.status}</TableCell>
                        <TableCell
                          style={{
                            color: mover.change.startsWith("+")
                              ? "green"
                              : "red",
                          }}
                        >
                          {mover.change}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Market;
