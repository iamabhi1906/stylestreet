import { decreaseQuantity, increaseQuantity } from "@/app/products/cart-functions";
import QuantityBox from "@/app/products/components/quantity-box";
import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";

export default function ProductCartCard({ product, refresh }) {
  const calculatedDiscountedPrice = (product) => {
    const price =
      product.price * product.quantity * (1 - product.discountPercentage / 100);
    return price.toFixed(2);
  };
  return (
    <Card
      key={product.id}
      sx={{
        p: 2,
        display: "flex",
        gap: 2,
        alignItems: "center",
        width: "100%",
      }}
      className="bg-red-500"
    >
      <CardMedia
        component="img"
        image={product.thumbnail}
        alt={product.title}
        sx={{
          width: 120,
          height: 120,
          objectFit: "cover",
          borderRadius: 2,
        }}
      />

      <Box flex={1}>
        <Typography variant="h6" fontWeight={600}>
          {product.title}
        </Typography>
        <Stack direction="row" sx={{ alignItems: "center", gap: 1 }} useFlexGap>
          <Typography color="primary">
            ${calculatedDiscountedPrice(product)}
          </Typography>
          <Typography sx={{ textDecoration: "line-through" }}>
            ${(product.price * product.quantity).toFixed(2)}
          </Typography>
          <Typography color="success.main" sx={{ display: "flex" }}>
            {product.discountPercentage}% OFF
          </Typography>
        </Stack>
      </Box>

      {/* quantity */}
      <QuantityBox
        quantity={product.quantity}
        onIncrease={() => {
          (increaseQuantity(product), refresh());
        }}
        onDecrease={() => {
          (decreaseQuantity(product), refresh());
        }}
      />

      {/* item total */}
      <Box>
        <Typography variant="h6" fontWeight="bold">
          ${(product.price * product.quantity).toFixed(2)}
        </Typography>
      </Box>
    </Card>
  );
}
