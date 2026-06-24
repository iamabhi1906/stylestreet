import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { CheckCircle } from "@mui/icons-material";

export default function OrderSuccessDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle sx={{ textAlign: "center" }}>Order Confirmed</DialogTitle>
      <IconButton
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ textAlign: "center", py: 3 }}>
        <CheckCircle color="success" sx={{ fontSize: 70, mb: 2 }} />

        <Typography variant="h6" fontWeight={600}>
          Order Placed Successfully!
        </Typography>

        <Typography color="text.secondary" sx={{ mt: 1 }}>
          Thank you for your purchase.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button variant="contained" onClick={onClose}>
          Continue Shopping
        </Button>
      </DialogActions>
    </Dialog>
  );
}
