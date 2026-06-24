"use client";
import { Box, Typography, Button, Divider, Paper, Stack } from "@mui/material";

import { loadCart } from "../products/cart-functions";
import ProductCartCard from "./components/product-cart-card";
import GoBackButton from "@/components/go-back-button";
import { useState, useEffect } from "react";

export default function CartPage() {
  const [cart, setCart] = useState(null);

  useEffect(() => {
    setCart(loadCart());
  }, []);

  if (cart === null) {
    return null;
  }

  if (cart.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
      >
        <Typography variant="h5">No product in the cart</Typography>
      </Box>
    );
  }
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const discount = cart.reduce((acc, item) => {
    const itemTotal = item.price * item.quantity;
    return acc + (itemTotal * item.discountPercentage) / 100;
  }, 0);

  const total = subtotal - discount;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const refresh = () => {
    setCart(loadCart());
  };

  return (
    <Box
      sx={{
        py: 4,
        px: 20,
        mx: "auto",
        width: "100%",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <GoBackButton />
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Shopping Cart
      </Typography>

      <Box sx={{ display: "flex", gap: 4, width: "100%" }}>
        <Box sx={{ width: "100%" }}>
          <Stack spacing={2} sx={{ width: "100%" }}>
            {cart.map((item) => (
              <ProductCartCard key={item.id} product={item} refresh={refresh} />
            ))}
          </Stack>
        </Box>

        {/* summary */}
        <Box sx={{ width: "400px" }}>
          <Paper
            elevation={3}
            sx={{
              p: 3,
              borderRadius: 3,
              position: "sticky",
              top: 20,
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Order Summary
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Stack spacing={2}>
              <Box display="flex">
                <Typography>Items</Typography>
                <Typography>{totalItems}</Typography>
              </Box>

              <Box display="flex">
                <Typography>Subtotal</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>

              <Box display="flex">
                <Typography>Discount</Typography>
                <Typography color="success.main">
                  -${discount.toFixed(2)}
                </Typography>
              </Box>

              <Divider />

              <Box display="flex">
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>

                <Typography variant="h6" fontWeight="bold">
                  ${total.toFixed(2)}
                </Typography>
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                sx={{
                  mt: 2,
                  py: 1.5,
                  borderRadius: 2,
                }}
              >
                Checkout
              </Button>

              <Button variant="outlined" fullWidth>
                Continue Shopping
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
