"use client";

import { Search, ShoppingBag } from "@mui/icons-material";
import { IconButton, Paper, TextField } from "@mui/material";
import Link from "next/link";

const SearchBox = ({ onChange, cartLength }) => {
  return (
    <div className="flex">
      <TextField
        placeholder="Search for your product.!"
        variant="standard"
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      <IconButton
        type="button"
        sx={{ p: "10px" }}
        aria-label="search"
        disabled={true}
      >
        <Search />
      </IconButton>

      <Link href={'/carts'} className="flex">
        <ShoppingBag />
        <p>{cartLength}</p>
      </Link>
    </div>
  );
};

export default SearchBox;
