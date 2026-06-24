"use client";
import { Box, IconButton, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const QuantityBox = ({ quantity, onIncrease, onDecrease }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, width: "100%", justifyContent: 'center' }}>
      <IconButton size="small" onClick={onDecrease}>
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Typography fontWeight={600}>{quantity}</Typography>
      <IconButton size="small" onClick={onIncrease}>
        <AddIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default QuantityBox;
