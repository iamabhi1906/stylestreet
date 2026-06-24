"use client";

import {
  Box,
  Button,
  List,
  ListItem,
  Popover,
  Typography,
  CircularProgress,
  Badge,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Category, Clear } from "@mui/icons-material";

export default function ProductCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedC, setSelectedC] = useState(null);

  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const fetchCat = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://dummyjson.com/products/categories",
      );
      setCategories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (searchParams.get("category")) {
      setSelectedC(searchParams.get("category"));
    }
    fetchCat();
  }, []);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCategoriesSelect = (category) => {
    setSelectedC(category.name);
    const params = new URLSearchParams(searchParams.toString());
    params.set("category", category.slug);
    params.delete("skip");
    router.replace(`${pathname}?${params.toString()}`);
    handleClose();
  };

  const handleClearFilter = () => {
    setSelectedC(null);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("category");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Box>
      <Button disabled={loading} onClick={handleClick}>
        <Badge variant={selectedC && "dot"}>
          <Category />
        </Badge>
        {/* {loading ? (
          <CircularProgress size={20} color="inherit" />
        ) : (
          <Typography sx={{ textTransform: "capitalize" }}>
            {selectedC ? selectedC : "Product Categories"}
          </Typography>
        )} */}
      </Button>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ maxHeight: "500px" }}
      >
        {categories.length > 0 && (
          <List sx={{ minWidth: 250 }}>
            {categories.map((category) => (
              <ListItem
                key={category.slug}
                onClick={() => handleCategoriesSelect(category)}
              >
                {category.name}
              </ListItem>
            ))}
          </List>
        )}
      </Popover>

      {selectedC && (
        <Button
          endIcon={<Clear />}
          onClick={() => handleClearFilter()}
        ></Button>
      )}
    </Box>
  );
}
