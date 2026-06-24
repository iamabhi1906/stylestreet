"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import {
  addToCart,
  decreaseQuantity,
  findProductInCart,
  increaseQuantity,
} from "../cart-functions";
import QuantityBox from "./quantity-box";
const ProductCard = ({ product }) => {
  const [cartProduct, setCartProduct] = useState(() => {
    return findProductInCart(product) || null;
  });
  const onAddToCart = () => {
    const addedProduct = addToCart(product);
    setCartProduct(addedProduct);
  };
  const iquantity = () => {
    const updatedProduct = increaseQuantity(cartProduct);
    setCartProduct(updatedProduct);
  };
  const dquantity = () => {
    const updatedProduct = decreaseQuantity(cartProduct);
    setCartProduct(updatedProduct);
  };
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <Link
        href={`/products/${product.id}`}
        style={{ textDecoration: "none", display: "block" }}
      >
        <CardMedia
          component="div"
          sx={{
            position: "relative",
            width: "100%",
            height: 200,
          }}
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="(max-width: 600px) 100vw, 250px"
            style={{ objectFit: "cover" }}
          />
        </CardMedia>
      </Link>

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
          {product.title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.description}
        </Typography>
      </CardContent>

      <CardActions sx={{ px: 2, pb: 2, justifyContent: "space-between" }}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Price
          </Typography>

          <Typography variant="h6" fontWeight={700}>
            ${product.price}
          </Typography>
        </Box>

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
      </CardActions>
    </Card>
  );
};

export default ProductCard;
