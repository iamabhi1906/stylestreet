"use client";
import { ArrowBack } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../loading";
import ErrorPage from "../error";

const cartPage = () => {
  const router = useRouter();
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const raw = localStorage.getItem("carts");
      if (!raw) return;
      setCarts(JSON.parse(raw));
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorPage />;
  if (carts.length == 0) return <div>Cart is empty..!!</div>;

  return (
    <div className="min-h-dvh px-20 p-10">
      <Button onClick={() => router.back()} startIcon={<ArrowBack />}>
        Go Back
      </Button>
      <Typography variant="h4">Product Cart</Typography>

      <Card>
        <CardContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Subtotal</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {carts.map((c) => {
                  return (
                    <TableRow key={c.id}>
                      <TableCell>{c.title}</TableCell>
                      <TableCell>${c.price}</TableCell>
                      <TableCell>{c.quantity}</TableCell>
                      <TableBody>${(c.price*c.quantity*100)/100}</TableBody>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default cartPage;
