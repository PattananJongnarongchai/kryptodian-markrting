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
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { CryptoData } from "@/pages/overview/type";

interface CryptoTableProps {
  interval?: number; // Optional interval in milliseconds (default: 60000 ms = 1 minute)
}

const useStyles = makeStyles((theme) => ({
  positive: {
    color: "green",
  },
  negative: {
    color: "red",
  },
  icon: {
    marginRight: "8px", // Adjust spacing as needed
    width: "24px", // Adjust icon size as needed
    height: "24px", // Adjust icon size as needed
  },
  sectionTitle: {
    marginTop: "20px",
    marginBottom: "10px",
  },
  cardContent: {
    padding: "16px",
    display: "flex",
    flexDirection: "row", // Display content horizontally
    justifyContent: "space-between", // Align items with space between them
    flexWrap: "wrap", // Wrap content if exceeds container width
  },
  coinRow: {
    display: "flex",
    alignItems: "center",
    marginBottom: "8px",
    marginRight: "20px", // Adjust spacing between items
  },
  cardContainer: {
    display: "flex",
    flexDirection: "row", // Align cards horizontally
    gap: "20px", // Adjust gap between cards as needed
    overflowX: "auto", // Enable horizontal scrolling if needed
    marginTop: "20px", // Adjust top margin for spacing from main title
  },
  sectionContainer: {
    minWidth: "200px", // Adjust minimum width of each Card
    maxWidth: "300px", // Adjust maximum width of each Card
    flex: "1 1 300px", // Flex properties for responsive layout
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow for better appearance
    borderRadius: "8px", // Add border radius for rounded corners
    backgroundColor: "#fff", // White background for cards
  },
  paginationContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  tableHeader: {
    backgroundColor: "#f5f5f5", // Light grey background for table header
  },
  tableCell: {
    fontWeight: "bold",
    color: "#333", // Darker color for text
    padding: "8px 16px", // Adjust padding for table cells
  },
  tableContainer: {
    marginTop: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Add shadow for better appearance
    borderRadius: "8px", // Add border radius for rounded corners
    overflowX: "auto", // Enable horizontal scrolling if needed
  },
  tableRow: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f9f9f9", // Light grey background for odd rows
    },
  },
  pageTitle: {
    marginTop: "20px",
    marginBottom: "20px",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: "2rem", // Larger font size for title
  },
  cardHeader: {
    backgroundColor: "#f5f5f5", // Light grey background for card header
    borderBottom: "1px solid #ddd", // Border at bottom of card header
    padding: "10px",
  },
  tableCellFixed: {
    width: "25%", // Adjust this value as needed to ensure columns are equally spaced
  },
}));

const Overview: React.FC<CryptoTableProps> = ({ interval = 60000 }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [cryptoData, setCryptoData] = useState<CryptoData[]>([]);
  const [hotCoins, setHotCoins] = useState<CryptoData[]>([]);
  const [newListings, setNewListings] = useState<CryptoData[]>([]);
  const [topGainers, setTopGainers] = useState<CryptoData[]>([]);
  const [topVolumeCoins, setTopVolumeCoins] = useState<CryptoData[]>([]);
  const [page, setPage] = useState(1);
  const coinsPerPage = 10; // Number of coins per page

  const formatNumber = (number: number) => {
    return number.toLocaleString();
  };

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
      const coinGeckoData = response.data;

      const cryptoData: CryptoData[] = coinGeckoData.map((coin: any) => ({
        id: coin.id,
        name: coin.name,
        shortName: coin.symbol.toUpperCase(), // Use symbol as short name
        current_price: coin.current_price,
        market_cap: coin.market_cap,
        price_change_percentage_24h: coin.price_change_percentage_24h,
        image: coin.image,
      }));

      // Update state with fetched data
      setCryptoData(cryptoData);

      // For demonstration purposes, update other sections with sliced data
      setHotCoins(cryptoData.slice(0, 5));
      setNewListings(cryptoData.slice(5, 10));
      setTopGainers(cryptoData.slice(10, 15));
      setTopVolumeCoins(cryptoData.slice(15, 20));
    } catch (error) {
      console.error("Error fetching crypto data from CoinGecko:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchCoinGeckoData(); // Initial fetch

      const intervalId = setInterval(async () => {
        await fetchCoinGeckoData(); // Fetch data at the specified interval
      }, interval);

      // Cleanup interval on component unmount
      return () => {
        clearInterval(intervalId);
      };
    };

    fetchData(); // Call fetchData function defined inside useEffect

    // Empty dependency array ensures useEffect runs only on mount and unmount
  }, [interval]); // Depend on interval to ensure useEffect updates when interval changes

  // Function to handle pagination change
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  // Function to get paginated crypto data
  const getPaginatedData = (): CryptoData[] => {
    const startIndex = (page - 1) * coinsPerPage;
    const endIndex = startIndex + coinsPerPage;
    return cryptoData.slice(startIndex, endIndex);
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h3" className={classes.pageTitle}>
          Market Overview
        </Typography>
      </Grid>
      <Grid item xs={12} container spacing={2} justifyContent="center">
        <Box
          className={classes.cardContainer}
          style={{ flexDirection: isMobile ? "column" : "row" }}
        >
          {/* Hot Coins Card */}
          <Card className={classes.sectionContainer}>
            <CardHeader title="Hot Coins" className={classes.cardHeader} />
            <CardContent className={classes.cardContent}>
              {hotCoins.map((coin) => (
                <Box key={coin.id} className={classes.coinRow}>
                  <Avatar
                    src={coin.image}
                    alt={coin.name}
                    className={classes.icon}
                  />
                  <Box ml={1}>
                    <Typography variant="subtitle1">
                      {coin.shortName}
                    </Typography>
                    <Typography variant="body2">
                      ${formatNumber(coin.current_price)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* New Listings Card */}
          <Card className={classes.sectionContainer}>
            <CardHeader title="New Listings" className={classes.cardHeader} />
            <CardContent className={classes.cardContent}>
              {newListings.map((coin) => (
                <Box key={coin.id} className={classes.coinRow}>
                  <Avatar
                    src={coin.image}
                    alt={coin.name}
                    className={classes.icon}
                  />
                  <Box ml={1}>
                    <Typography variant="subtitle1">
                      {coin.shortName}
                    </Typography>
                    <Typography variant="body2">
                      ${formatNumber(coin.current_price)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Top Gainers Card */}
          <Card className={classes.sectionContainer}>
            <CardHeader title="Top Gainers" className={classes.cardHeader} />
            <CardContent className={classes.cardContent}>
              {topGainers.map((coin) => (
                <Box key={coin.id} className={classes.coinRow}>
                  <Avatar
                    src={coin.image}
                    alt={coin.name}
                    className={classes.icon}
                  />
                  <Box ml={1}>
                    <Typography variant="subtitle1">
                      {coin.shortName}
                    </Typography>
                    <Typography variant="body2">
                      ${formatNumber(coin.current_price)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>

          {/* Top Volume Coins Card */}
          <Card className={classes.sectionContainer}>
            <CardHeader
              title="Top Volume Coins"
              className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
              {topVolumeCoins.map((coin) => (
                <Box key={coin.id} className={classes.coinRow}>
                  <Avatar
                    src={coin.image}
                    alt={coin.name}
                    className={classes.icon}
                  />
                  <Box ml={1}>
                    <Typography variant="subtitle1">
                      {coin.shortName}
                    </Typography>
                    <Typography variant="body2">
                      ${formatNumber(coin.current_price)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
        </Box>
      </Grid>

      {/* Main Crypto Table */}
      <Grid item xs={12}>
        <TableContainer component={Paper} className={classes.tableContainer}>
          <Table>
            <TableHead className={classes.tableHeader}>
              <TableRow>
                <TableCell
                  className={`${classes.tableCell} ${classes.tableCellFixed}`}
                >
                  Name
                </TableCell>
                <TableCell
                  align="center"
                  className={`${classes.tableCell} ${classes.tableCellFixed}`}
                >
                  Price
                </TableCell>
                <TableCell
                  align="center"
                  className={`${classes.tableCell} ${classes.tableCellFixed}`}
                >
                  Market Cap
                </TableCell>
                {!isMobile && (
                  <TableCell align="center" className={classes.tableCell}>
                    24h Change
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {getPaginatedData().map((coin) => (
                <TableRow key={coin.id} className={classes.tableRow}>
                  <TableCell
                    align="center"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Avatar
                      src={coin.image}
                      alt={coin.name}
                      className={classes.icon}
                    />
                    <Typography variant="body1" style={{ marginLeft: "8px" }}>
                      {coin.shortName}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Typography variant="body1">
                      ${formatNumber(coin.current_price)}
                    </Typography>
                    {isMobile && (
                      <Typography
                        variant="body2"
                        className={
                          coin.price_change_percentage_24h >= 0
                            ? classes.positive
                            : classes.negative
                        }
                      >
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </Typography>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    ${formatNumber(coin.market_cap)}
                  </TableCell>
                  {!isMobile && (
                    <TableCell
                      align="center"
                      className={
                        coin.price_change_percentage_24h >= 0
                          ? classes.positive
                          : classes.negative
                      }
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Grid item xs={12} className={classes.paginationContainer}>
          <Pagination
            count={Math.ceil(cryptoData.length / coinsPerPage)}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Overview;