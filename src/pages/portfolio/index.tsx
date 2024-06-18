// src/pages/portfolio.tsx
import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Avatar,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Portfolio = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleChangeTab = (event: React.ChangeEvent<{}>, newValue: number) => {
    setSelectedTab(newValue);
  };

  const lineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Balance",
        data: [0.0001, 0.00015, 0.00017, 0.00016, 0.00018, 0.00017],
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

  const lineOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid item>
                  <Avatar alt="User" sx={{ width: 64, height: 64 }}>
                    U
                  </Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="h6">PATTANANJONGCHAI</Typography>
                  <Typography>User ID: 150520421</Typography>
                  <Typography>VIP Level: Regular User</Typography>
                  <Typography>User Type: Personal</Typography>
                  <Typography>Following: 0</Typography>
                  <Typography>Followers: 0</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6">Estimated Balance</Typography>
              <Typography variant="h4">0.00001712 BTC</Typography>
              <Typography>≈฿41.33</Typography>
              <Typography>
                Today's PnL:{" "}
                <span style={{ color: "red" }}>-฿0.65 (1.56%)</span>
              </Typography>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item>
                  <Button variant="contained">Deposit</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained">Withdraw</Button>
                </Grid>
                <Grid item>
                  <Button variant="contained">Cash In</Button>
                </Grid>
              </Grid>
              <div
                style={{ width: "100%", height: "200px", marginTop: "16px" }}
              >
                <Line data={lineData} options={lineOptions} />
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Tabs
            value={selectedTab}
            onChange={handleChangeTab}
            variant="fullWidth"
          >
            <Tab label="Holding" />
            <Tab label="Hot" />
            <Tab label="New Listing" />
            <Tab label="Favorite" />
            <Tab label="Top Gainers" />
            <Tab label="24h Volume" />
          </Tabs>
          {selectedTab === 0 && (
            <TableContainer component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Coin</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Coin Price</TableCell>
                    <TableCell>Today's PnL</TableCell>
                    <TableCell>Trade</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item>
                          <Avatar
                            src="https://cryptologos.cc/logos/binance-coin-bnb-logo.png"
                            alt="BNB"
                          />
                        </Grid>
                        <Grid item>
                          <Typography>BNB</Typography>
                          <Typography variant="caption">
                            Binance Coin
                          </Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>0.00188727</TableCell>
                    <TableCell>฿21,869</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary">
                        Trade
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>
                      <Grid container spacing={1} alignItems="center">
                        <Grid item>
                          <Avatar
                            src="https://cryptologos.cc/logos/ravencoin-rvn-logo.png"
                            alt="RVN"
                          />
                        </Grid>
                        <Grid item>
                          <Typography>RVN</Typography>
                          <Typography variant="caption">Ravencoin</Typography>
                        </Grid>
                      </Grid>
                    </TableCell>
                    <TableCell>0.06918906</TableCell>
                    <TableCell>฿0.7436548</TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary">
                        Trade
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Portfolio;
