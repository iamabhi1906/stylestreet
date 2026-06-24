"use client";
import { Alert, Box, Button, Snackbar } from "@mui/material";
import {
  addToCart,
  decreaseQuantity,
  findProductInCart,
  increaseQuantity,
} from "../cart-functions";
import QuantityBox from "./quantity-box";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ActionButton({ product }) {
  const router = useRouter();
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [cartProduct, setCartProduct] = useState(() => {
    return findProductInCart(product) || null;
  });

  const iquantity = () => {
    const updatedProduct = increaseQuantity(cartProduct);
    setCartProduct(updatedProduct);
  };

  const dquantity = () => {
    const updatedProduct = decreaseQuantity(cartProduct);
    setCartProduct(updatedProduct);
  };

  const onAddToCart = () => {
    const addedProduct = addToCart(product);
    setCartProduct(addedProduct);
    setIsSnackbarOpen(true);
    setMessage("Product added to cart..!");
  };

  const onBuyNow = () => {
    onAddToCart();
    router.push("/cart");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        gap: 3,
        width: "100%",
      }}
    >
      {cartProduct ? (
        <Button variant="outlined" sx={{ width: "100%" }} onClick={()=>router.push('/cart')}>
          Go to Cart
        </Button>
      ) : (
        <Button
          variant="outlined"
          sx={{ width: "100%" }}
          onClick={() => onBuyNow()}
        >
          Buy Now
        </Button>
      )}

      {cartProduct ? (
        <QuantityBox
          quantity={cartProduct.quantity}
          onIncrease={iquantity}
          onDecrease={dquantity}
        />
      ) : (
        <Button
          variant="contained"
          size="small"
          onClick={onAddToCart}
          sx={{ width: "100%" }}
        >
          Add to Cart
        </Button>
      )}

      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        message={message}
        onClose={() => {
          setIsSnackbarOpen(false);
          setMessage("");
        }}
      >
        <Alert severity="success" variant="filled" sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
