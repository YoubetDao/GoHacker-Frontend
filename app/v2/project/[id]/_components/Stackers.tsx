"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjectStakers, Staker } from "@/service/detail";
import { format } from "date-fns";

export const Stackers = () => {
  const params = useParams();
  const id = params.id as string;
  const [stakers, setStakers] = useState<Staker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchStakers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProjectStakers(id, page, 10);
        setStakers(response.data);
        setTotalPages(response.pagination.totalPages);
      } catch (err) {
        console.error("获取质押者信息失败:", err);
        setError("加载质押者数据失败，请稍后重试");
        setStakers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStakers();
  }, [id, page]);

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  // Format amount
  const formatAmount = (amount: number): string => {
    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(2)}M`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(2)}K`;
    } else {
      return amount.toString();
    }
  };

  // Format date
  const formatDate = (dateStr: string): string => {
    // const date = new Date(dateStr);
    return format(dateStr, "yyyy-MM-dd HH:mm:ss");
  };

  const handlePageChange = (newPage: number) => {
    if (loading) return; // If loading, prevent page change
    setPage(newPage);
  };

  if (loading && stakers.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center text-destructive">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        {loading && stakers.length > 0 && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10 backdrop-blur-sm rounded-md">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
              <TableHead>Stake Amount</TableHead>
              <TableHead>Last Transaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stakers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  No stakers found
                </TableCell>
              </TableRow>
            ) : (
              stakers.map((staker, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <button
                      onClick={() => copyAddress(staker.address)}
                      className="flex items-center gap-1 text-xs hover:text-primary"
                    >
                      {`${staker.address.slice(0, 6)}...${staker.address.slice(
                        -4
                      )}`}
                      <Copy className="w-3 h-3" />
                    </button>
                  </TableCell>
                  <TableCell className="font-medium">
                    {formatAmount(staker.amount)}
                  </TableCell>
                  {/* <TableCell>{formatAmount(staker.totalStaked)}</TableCell> */}
                  <TableCell className="text-xs">
                    {formatDate(staker.lastTransactionAt)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  className={
                    page === 1 || loading
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                // 显示当前页附近的页码
                let pageNum;
                if (totalPages <= 5) {
                  // 如果总页数小于等于5，显示所有页码
                  pageNum = i + 1;
                } else if (page <= 3) {
                  // 如果当前页靠近开始，显示前5页
                  pageNum = i + 1;
                } else if (page >= totalPages - 2) {
                  // 如果当前页靠近结束，显示最后5页
                  pageNum = totalPages - 4 + i;
                } else {
                  // 否则显示当前页及其前后各2页
                  pageNum = page - 2 + i;
                }

                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      onClick={() => handlePageChange(pageNum)}
                      isActive={page === pageNum}
                      className={
                        loading
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              <PaginationItem>
                <PaginationNext
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, page + 1))
                  }
                  className={
                    page === totalPages || loading
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};
