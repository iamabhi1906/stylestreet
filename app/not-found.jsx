import { Box, Button, Container, Paper, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import Image from "next/image";

export default function NotFoundPage() {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Container>
        <Paper
          elevation={24}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: 6,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image src={"/404.svg"} width={500} height={200} alt="404_Icon" />
          <Typography variant="h4" fontWeight={700} gutterBottom sx={{ mt: 1 }}>
            Page Not Found
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: 420,
              mx: "auto",
              mb: 4,
            }}
          >
            The page you're looking for doesn't exist, or the URL might be
            incorrect.
          </Typography>

          <Button
            variant="contained"
            size="large"
            href="/"
            startIcon={<HomeRoundedIcon />}
          >
            Go To Home
          </Button>
        </Paper>
      </Container>
    </Box>
  );
}
