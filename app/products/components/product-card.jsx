"use client";

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

const ProductCard = ({ product }) => {
  const addToCart = (p) => {
    console.log(p);
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
        href={`/${product.id}`}
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
        <Typography
          variant="subtitle1"
          fontWeight={600}
          gutterBottom
          noWrap
          title={product.title}
        >
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
          <Typography
            variant="caption"
            sx={{ textTransform: "uppercase", fontSize: "0.7rem" }}
            color="text.secondary"
          >
            Price
          </Typography>

          <Typography variant="h6" fontWeight={700}>
            ${product.price}
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="small"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
