// hooks/usePagination.js
import { useState, useMemo } from "react";

export function usePagination(data, itemsPerPage = 3) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(data.length / itemsPerPage));

  const pagedData = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return data.slice(start, start + itemsPerPage);
  }, [data, page, itemsPerPage]);

  return { page, setPage, totalPages, pagedData };
}