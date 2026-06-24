import MainLogo from "@/components/main-logo";
import { Box, Button, Typography } from "@mui/material";

export default async function Home() {
  return (
    <Box
      sx={{
        backgroundImage: "url('/backgroud.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        height: "100%",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <MainLogo width={50} height={50} />
        <Typography variant="h4">StyleStreet</Typography>
      </Box>

      <Box>
        <Typography variant="h3">
          Find all your daily essential at one place..!!
        </Typography>
      </Box>

      <Button variant="contained" href="/products">
        Find All ours product
      </Button>
    </Box>
  );
}
