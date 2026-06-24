import { Box } from "@mui/material";
import NavigationBar from "./components/navigation-bar";

const ProductLayout = async ({ children }) => {
  return (
    <Box sx={{padding: "30px 100px"}}>
      <NavigationBar />
      {children}
    </Box>
  );
};

export default ProductLayout;
