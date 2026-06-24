import MainLogo from "@/components/main-logo";
import { Badge, Box, IconButton, Typography } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const NavigationBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          color: "primary.main",
        }}
      >
        <MainLogo width={50} height={50} fill="currentColor" />
        <Typography variant="h4" color="primary">
          StyleStreet
        </Typography>
      </Box>

      <IconButton aria-label="View Cart" href="/cart">
        <Badge variant="dot" color="primary">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Box>
  );
};

export default NavigationBar;
