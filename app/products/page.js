import { Box } from "@mui/material";
import { fetchProduct } from "./fetch-product";
import ProductPagination from "./components/product-pagination";

export default async function ProductsPage({ searchParams }) {
  const option = await searchParams;
  const data = await fetchProduct({
    limit: option.limit || 10,
    skip: option.skip,
    select: option.select,
    q: option.q,
  });
  return <Box>

    <div>{ JSON.stringify(data.products)}</div>

    <ProductPagination total={data.pagination.total} skip={data.pagination.skip} limit={data.pagination.limit} currentOption={option}/>
    
  </Box>;
} 
