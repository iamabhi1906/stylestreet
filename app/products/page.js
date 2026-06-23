import { Box, Grid } from "@mui/material";
import { fetchProduct } from "./fetch-product";
import ProductPagination from "./components/product-pagination";
import ProductCard from "./components/product-card";

export default async function ProductsPage({ searchParams }) {
  const option = await searchParams;

  const data = await fetchProduct({
    limit: option.limit || 10,
    skip: option.skip,
    select: option.select,
    q: option.q,
  });

  return (
    <Box sx={{ px: 3, py: 4 }}>
      <Grid container spacing={2}>
        {data.products.map((p) => (
          <Grid key={p.id} size={4}>
            <ProductCard product={p} />
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <ProductPagination
          total={data.pagination.total}
          skip={data.pagination.skip}
          limit={data.pagination.limit}
          currentOption={option}
        />
      </Box>
    </Box>
  );
}
