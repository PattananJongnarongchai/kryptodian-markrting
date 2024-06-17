// pages/index.js
"use client";
import React from "react";
import {
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Box,
} from "@mui/material";

export default function Dashboard() {
  return (
    <div>
      <main>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Box sx={{ my: 4 }}>
            <Typography variant="h2" component="h1" gutterBottom>
              Welcome to Kryptodian
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
              {"A simple landing page built with Next.js and Material-UI."}
            </Typography>
            <Button variant="contained" color="primary" href="#learn-more">
              Learn More
            </Button>
          </Box>

          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" component="h3">
                  Safe Guard
                </Typography>
                <Typography>
                  Description of feature one. Explains the benefit and usage.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" component="h3">
                  Trade
                </Typography>
                <Typography>
                  Description of feature two. Explains the benefit and usage.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" component="h3">
                  Protection
                </Typography>
                <Typography>
                  Description of feature three. Explains the benefit and usage.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
