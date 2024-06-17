"use client";
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Avatar,
  Card,
  CardHeader,
  CardContent,
  Box,
  Pagination,
  Grid,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import axios from "axios";
import { CryptoData } from "@/app/overview/types";

interface CryptoTableProps {
  interval?: number; // Optional interval in milliseconds (default: 60000 ms = 1 minute)
}

const CryptoTable: React.FC<CryptoTableProps> = ({ interval = 60000 }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [page, setPage] = useState(1);
  const coinsPerPage = 10;

  const fetchCoinGeckoData = async () => {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 100,
            page: 1,
            sparkline: false,
          },
        }
      );
      setCryptoData(
        response.data.map((coin) => ({
          id: coin.id,
          name: coin.name,
          shortName: coin.symbol.toUpperCase(),
          current_price: coin.current_price,
          market_cap: coin.market_cap,
          price_change_percentage_24h: coin.price_change_percentage_24h,
          image: coin.image,
        }))
      );
    } catch (error) {
      console.error("Error fetching crypto data from CoinGecko:", error);
    }
  };

  useEffect(() => {
    fetchCoinGeckoData();
    const intervalId = setInterval(fetchCoinGeckoData, interval);
    return () => clearInterval(intervalId);
  }, [interval]);

  const getPaginatedData = () => {
    const startIndex = (page - 1) * coinsPerPage;
    return cryptoData.slice(startIndex, startIndex + coinsPerPage);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
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
          Market Overview
        </Typography>
      </Grid>
      <Grid item xs={12} container spacing={2} justifyContent="center">
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 2,
            overflowX: "auto",
            mt: 3,
          }}
        >
          {["Hot Coins", "New Listings", "Top Gainers", "Top Volume Coins"].map(
            (title, index) => (
              <Card
                sx={{
                  minWidth: 200,
                  maxWidth: 300,
                  flex: "1 1 300px",
                  boxShadow: 3,
                  borderRadius: 2,
                  bgcolor: "background.paper",
                }}
                key={title}
              >
                <CardHeader title={title} sx={{ bgcolor: "grey.100" }} />
                <CardContent
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  {getPaginatedData().map((coin) => (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 1,
                        mr: 2,
                      }}
                      key={coin.id}
                    >
                      <Avatar
                        src={coin.image}
                        alt={coin.name}
                        sx={{ mr: 1, width: 24, height: 24 }}
                      />
                      <Box ml={1}>
                        <Typography variant="subtitle1">
                          {coin.shortName}
                        </Typography>
                        <Typography variant="body2">
                          ${coin.current_price.toLocaleString()}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </CardContent>
              </Card>
            )
          )}
        </Box>
      </Grid>
      <Grid item xs={12}>
        <TableContainer
          component={Paper}
          sx={{ mt: 3, boxShadow: 3, borderRadius: 2, overflowX: "auto" }}
        >
          <Table>
            <TableHead sx={{ bgcolor: "grey.100" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold", p: 2 }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold", p: 2 }} align="center">
                  Price
                </TableCell>
                <TableCell sx={{ fontWeight: "bold", p: 2 }} align="center">
                  Market Cap
                </TableCell>
                {!isMobile && (
                  <TableCell sx={{ fontWeight: "bold", p: 2 }} align="center">
                    24h Change
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {getPaginatedData().map((coin) => (
                <TableRow
                  key={coin.id}
                  sx={{ "&:nth-of-type(odd)": { bgcolor: "action.hover" } }}
                >
                  <TableCell align="center">
                    <Avatar
                      src={coin.image}
                      alt={coin.name}
                      sx={{ width: 24, height: 24, mr: 1 }}
                    />
                    {coin.shortName}
                  </TableCell>
                  <TableCell align="center">
                    ${coin.current_price.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    ${coin.market_cap.toLocaleString()}
                  </TableCell>
                  {!isMobile && (
                    <TableCell align="center">
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          count={Math.ceil(cryptoData.length / coinsPerPage)}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
          sx={{ mt: 2 }}
        />
      </Grid>
    </Grid>
  );
};

export default CryptoTable;
