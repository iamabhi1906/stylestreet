"use client";

import { TablePagination } from "@mui/material";
import { useRouter } from "next/navigation";
export default function ProductPagination({
  total,
  skip,
  limit,
  currentOption,
}) {
  const router = useRouter();
  const page = Math.floor(skip / limit);
  const replaceURL = (newSkip, newLimit) => {
    const params = new URLSearchParams(currentOption);
    params.set("skip", String(newSkip));
    params.set("limit", String(newLimit));
    router.replace(`/products?${params.toString()}`);
  };
  const handlePageChange = (_, newPage) => {
    replaceURL(newPage * limit, limit);
  };
  const handleRowsPerPageChange = (event) => {
    const newLimit = Number(event.target.value);
    replaceURL(0, newLimit);
  };

  return (
    <TablePagination
      component="div"
      count={Number(total)}
      page={page}
      rowsPerPage={limit}
      onPageChange={handlePageChange}
      onRowsPerPageChange={handleRowsPerPageChange}
      rowsPerPageOptions={[5, 10, 20, 50]}
    />
  );
}
