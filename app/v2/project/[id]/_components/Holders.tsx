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
import { getProjectHolders, Holder } from "@/service/detail";
import { format } from "date-fns";

export const Holders = () => {
  const params = useParams();
  const id = params.id as string;
  const [holders, setHolders] = useState<Holder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchHolders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProjectHolders(id, page, 10);
        setHolders(response.data);
        setTotalPages(response.pagination.totalPages);
      } catch (err) {
        console.error("Failed to fetch holders:", err);
        setError("Failed to load holders data. Please try again later.");
        setHolders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHolders();
  }, [id, page]);

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    try {
      return format(new Date(dateString), "yyyy-MM-dd HH:mm");
    } catch {
      return dateString;
    }
  };

  const formatPnL = (pnl: number) => {
    const isPositive = pnl >= 0;
    const formatted = Math.abs(pnl).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return {
      value: isPositive ? `+$${formatted}` : `-$${formatted}`,
      className: isPositive ? "text-green-600" : "text-red-600"
    };
  };

  if (loading && holders.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Loading holders data...</p>
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
        {loading && holders.length > 0 && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-10 backdrop-blur-sm rounded-md">
            <div className="flex flex-col items-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mb-2"></div>
              <span className="text-sm text-muted-foreground">Updating...</span>
            </div>
          </div>
        )}
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Address</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Value (USD)</TableHead>
              <TableHead>Unrealized P&L</TableHead>
              <TableHead>Transactions</TableHead>
              <TableHead>Last Transaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {holders.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  No data
                </TableCell>
              </TableRow>
            ) : (
              holders.map((holder, index) => {
                const pnlFormat = formatPnL(holder.unrealizedPnl);
                return (
                  <TableRow key={`${holder.address}-${index}`}>
                    <TableCell>
                      <button
                        onClick={() => copyAddress(holder.address)}
                        className="flex items-center gap-1 text-xs hover:text-primary transition-colors"
                      >
                        {formatAddress(holder.address)}
                        <Copy className="w-3 h-3" />
                      </button>
                    </TableCell>
                    <TableCell className="font-mono">
                      {holder.balance.toLocaleString('en-US', {
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 2
                      })}
                    </TableCell>
                    <TableCell className="font-mono">
                      ${holder.balanceUSD.toLocaleString('en-US', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                      })}
                    </TableCell>
                    <TableCell className={`font-mono ${pnlFormat.className}`}>
                      {pnlFormat.value}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {holder.transactionCount}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-xs">
                      {formatDate(holder.lastTransactionTime)}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                  }}
                  className={
                    page <= 1 ? "pointer-events-none opacity-50" : ""
                  }
                />
              </PaginationItem>
              
              {/* Page links */}
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                if (pageNum > totalPages) return null;
                
                return (
                  <PaginationItem key={pageNum}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(pageNum);
                      }}
                      isActive={pageNum === page}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < totalPages) setPage(page + 1);
                  }}
                  className={
                    page >= totalPages ? "pointer-events-none opacity-50" : ""
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
