"use client";
import { Box, Button } from "@mui/material";
import {
  addToCart,
  decreaseQuantity,
  findProductInCart,
  increaseQuantity,
} from "../../cart-functions";
import QuantityBox from "../../components/quantity-box";
import { useState } from "react";

export default function ActionButton({ product }) {
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
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 3 }}>
      <Button variant="contained" sx={{ width: "100%" }}>
        Buy Now
      </Button>

      {cartProduct ? (
        <QuantityBox
          quantity={cartProduct.quantity}
          onIncrease={iquantity}
          onDecrease={dquantity}
        />
      ) : (
        <Button variant="contained" size="small" onClick={onAddToCart}>
          Add to Cart
        </Button>
      )}
    </Box>
  );
}
