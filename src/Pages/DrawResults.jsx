import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../Hooks/useAxios";
import Container from "../Components/Shared/Container/Container";

import DrawResultCardSkeleton from "../Components/Skeleton/DrawResultCardSkeleton";
import DrawResultCard from "../Components/Cards/DrawResultCard";
import Pagination from "../Components/Pagination/Pagination";

const DrawResults = () => {
  const axios = useAxios();
  const [page, setPage] = useState(1);
  const LIMIT = 4;

  const { data, isLoading } = useQuery({
    queryKey: ["draw-result", page],
    queryFn: async () => {
      const res = await axios.get(
        `/price-bonds-all-result?page=${page}&limit=${LIMIT}`,
      );
      return res.data;
    },
    refetchOnWindowFocus: false,
  });

  const results = data?.result || [];

  const pagination = data?.pagination;
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("bn-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const formatAmount = (amount) => "৳ " + amount.toLocaleString("bn-BD");

  return (
    <Container>
      <div className="">
        <div className="text-center my-6 md:my-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800">
            ড্র ফলাফল সমূহ
          </h2>
          <p className="text-sm text-gray-500 mb-1">
            মোট {pagination?.total.toLocaleString("bn-BD") || 0}টি ড্র ফলাফল
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 my-5">
        {isLoading ? (
          [...Array(LIMIT)].map((_, i) => <DrawResultCardSkeleton key={i} />)
        ) : results.length === 0 ? (
          <h1>There is no Draw results</h1>
        ) : (
          results.map((draw) => (
            <DrawResultCard
              key={draw._id}
              draw={draw}
              formatAmount={formatAmount}
              formatDate={formatDate}
            />
          ))
        )}
        {pagination && pagination.totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={pagination.totalPages}
            hasPrev={pagination.hasPrevPage}
            hasNext={pagination.hasNextPage}
            onPageChange={setPage}
          />
        )}
      </div>
    </Container>
  );
};

export default DrawResults;
