import { Box } from "@mui/material";
import SearchBar from "./product-search-bar";
import ProductCategories from "./product-categories-filter";

export default function ProductFilter() {
  return (
    <Box sx={{width: '100%', display: 'flex', alignItems: 'center', marginBottom: '20px', justifyItems: 'end', justifyContent: 'end'}}>
      <SearchBar />
      <ProductCategories />
    </Box>
  );
}
