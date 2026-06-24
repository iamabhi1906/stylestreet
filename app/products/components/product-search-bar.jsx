"use client";
import { Search } from "@mui/icons-material";
import { Box, TextField } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef } from "react";

function debounce(fn, delay) {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const searchParamsRef = useRef(searchParams);
  useEffect(() => {
    searchParamsRef.current = searchParams;
  }, [searchParams]);

  const handleSearch = useCallback(
    debounce((term) => {
      const params = new URLSearchParams(searchParamsRef.current.toString());
      if (term) {
        params.delete("skip")
        params.set("q", term);
      } else {
        params.delete("q");
      }
      router.replace(`${pathname}?${params.toString()}`);
    }, 300),
    [pathname, router],
  );

  return (
    <Box sx={{ display: "flex", alignItems: "flex-end" }}>
      <TextField
        label="Search for Product"
        variant="standard"
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("q")?.toString() || ""}
      />
      <Search sx={{ color: "action.active", mr: 1, my: 0.5 }} />
    </Box>
  );
}
