import Link from "next/link";
import Image from "next/image";
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Typography,
  Rating,
  Stack,
} from "@mui/material";
import ActionButton from "./action-button";

const ProductCard = ({ product }) => {
  const originalPrice = (
    product.price /
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
      }}
    >
      <Link href={`/products/${product.id}`} style={{ textDecoration: "none" }}>
        <CardMedia
          component="div"
          sx={{
            position: "relative",
            height: 240,
            bgcolor: "#f8f8f8",
          }}
        >
          <Image
            src={product.thumbnail}
            alt={product.title}
            fill
            sizes="100"
            loading="eager"
            style={{ objectFit: "contain" }}
          />
        </CardMedia>
      </Link>

      <CardContent sx={{ flexGrow: 1 }}>
        <Chip label={product.category} variant="outlined" />

        <Typography variant="h5" fontWeight={700} gutterBottom>
          {product.title}
        </Typography>

        <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
          <Rating
            value={product.rating}
            precision={0.1}
            readOnly
            size="small"
          />
          <Typography variant="body2">({product.rating})</Typography>
        </Stack>

        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          px: 4,
          pb: 2,
          flexDirection: "column",
          gap: 2,
          width: '100%'
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" , justifyContent: 'start'}}>
          <Typography variant="h5" color="primary" fontWeight={700}>
            ${product.price}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ textDecoration: "line-through" }}
          >
            ${originalPrice}
          </Typography>
        </Box>

        <ActionButton product={product} />
      </CardActions>
    </Card>
  );
};

export default ProductCard;
