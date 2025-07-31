"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { getProjectTrades, TradeRecord } from "@/service/detail";
import { format } from "date-fns";

export const TradingEvent = () => {
  const params = useParams();
  const id = params.id as string;
  const [trades, setTrades] = useState<TradeRecord[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchTrades = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProjectTrades(id, page, 10);
        setTrades(response.data);
        setHasMore(response.pagination.hasNext);
        setTotalPages(response.pagination.totalPages);
      } catch (err) {
        console.error("Failed to fetch trade records:", err);
        setError("Failed to load trade records. Please try again later.");
        setTrades([]);
      } finally {
        setLoading(false);
      }
    };

    if (!hasMore) {
      return;
    }

    fetchTrades();
  }, [id, page, hasMore]);

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  // Format time
  const formatTime = (timeStr: string): string => {
    const date = new Date(timeStr);
    return format(date, "yyyy-MM-dd HH:mm:ss");
  };

  // Format amount
  const formatAmount = (amount: string): string => {
    const num = parseFloat(amount);
    return `$${num.toFixed(num < 1 ? 6 : 2)}`;
  };

  // Format token amount
  const formatTokenAmount = (trade: TradeRecord): string => {
    if (!trade.tokens || trade.tokens.length === 0) return "0";

    const mainToken = trade.tokens[0];
    const amount = parseFloat(mainToken.amount);

    if (amount >= 1000000) {
      return `${(amount / 1000000).toFixed(2)}M ${mainToken.tokenSymbol}`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(2)}K ${mainToken.tokenSymbol}`;
    } else {
      return `${amount.toFixed(2)} ${mainToken.tokenSymbol}`;
    }
  };

  const handlePageChange = (newPage: number) => {
    if (loading) return; // 如果正在加载，不允许翻页
    setPage(newPage);
  };

  if (loading && trades.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">
          Loading trade records...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-8 text-center">
        <div className="text-destructive mb-2">⚠️ Error</div>
        <p className="text-sm text-muted-foreground">{error}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4"
          onClick={() => {
            setPage(1);
            setError(null);
            setLoading(true);
          }}
        >
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        {loading && trades.length > 0 && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10 backdrop-blur-sm rounded-md">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
              <span className="text-sm text-muted-foreground">loading...</span>
            </div>
          </div>
        )}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Tokens</TableHead>
              <TableHead>Address</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trades.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No trade records found
                </TableCell>
              </TableRow>
            ) : (
              trades.map((trade, index) => (
                <TableRow key={index}>
                  <TableCell className="text-xs">
                    {formatTime(trade.time)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        trade.type === "sell" ? "destructive" : "default"
                      }
                    >
                      {trade.type === "buy" ? "Buy" : "Sell"}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatAmount(trade.volumeUSD)}</TableCell>
                  <TableCell>{formatAmount(trade.priceUSD)}</TableCell>
                  <TableCell>{formatTokenAmount(trade)}</TableCell>
                  <TableCell>
                    <button
                      onClick={() => copyAddress(trade.userAddress)}
                      className="flex items-center gap-1 text-xs hover:text-primary"
                    >
                      {`${trade.userAddress.slice(
                        0,
                        6
                      )}...${trade.userAddress.slice(-4)}`}
                      <Copy className="w-3 h-3" />
                    </button>
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
                      className="cursor-pointer"
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
                    page === totalPages
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
