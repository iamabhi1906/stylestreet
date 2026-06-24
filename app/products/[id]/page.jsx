import {
  Box,
  Typography,
  Paper,
  Chip,
  Divider,
  Rating,
  Stack,
  Grid,
} from "@mui/material";

import fetchProduct from "./fetch-product";
import ProductCarousel from "./components/product-carousel";
import GoBackButton from "@/components/go-back-button";
import ActionButton from "../components/action-button";
import { notFound } from "next/navigation";

const ProductViewPage = async ({ params }) => {
  const { id } = await params;
  const product = await fetchProduct(id);
  if (!product) {
    return notFound();
  }
  const discountedPrice = (
    product.price *
    (1 - product.discountPercentage / 100)
  ).toFixed(2);

  return (
    <Box sx={{ margin: "10px" }}>
      <Box sx={{ display: "flex", marginBottom: "10px" }}>
        <GoBackButton />
        <Typography variant="h4" fontWeight={700}>
          Product Details
        </Typography>
      </Box>

      <Paper
        elevation={3}
        sx={{
          p: { xs: 2, md: 4 },
          borderRadius: 4,
        }}
      >
        <Grid container spacing={10}>
          <Grid size={4}>
            <ProductCarousel images={product.images} />
          </Grid>

          <Grid size={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: '100%'
              }}
            >
              <Stack spacing={3}>
                <Chip
                  label={product.brand}
                  color="primary"
                  sx={{ width: "fit-content" }}
                />

                <Typography variant="h3" fontWeight={700}>
                  {product.title}
                </Typography>

                <Stack direction="row" spacing={1}>
                  <Rating value={product.rating} precision={0.1} readOnly />
                  <Typography color="text.secondary">
                    ({product.rating})
                  </Typography>
                </Stack>

                <Typography
                  variant="body1"
                  color="text.secondary"
                >
                  {product.description}
                </Typography>

                <Divider />

                <Stack spacing={1}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Price
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={2}
                  >
                    <Typography
                      variant="h3"
                      color="success.main"
                      fontWeight={700}
                    >
                      ${discountedPrice}
                    </Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration: "line-through",
                        color: "text.secondary",
                      }}
                    >
                      ${product.price}
                    </Typography>

                    <Chip
                      label={`${product.discountPercentage}% OFF`}
                      color="success"
                    />
                  </Stack>
                </Stack>
              </Stack>

              <Box sx={{ mt: 4 }}>
                <ActionButton product={product} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default ProductViewPage;
