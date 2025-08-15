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
import { Copy, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjectTokenClaims, TokenClaim as TokenClaimType } from "@/service/detail";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

export default function TokenClaim() {
  const params = useParams();
  const id = params.id as string;
  const [claims, setClaims] = useState<TokenClaimType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchClaims = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProjectTokenClaims(id, page, 10);
        setClaims(response.data);
        setTotalPages(response.pagination.totalPages);
      } catch (err) {
        console.error("Failed to fetch token claims:", err);
        setError("Failed to load token claims data. Please try again later.");
        setClaims([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, [id, page]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      // Simple visual feedback - could be enhanced with a toast system later
      console.log("Copied to clipboard:", text);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const formatAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(amount);
  };

  const getExplorerUrl = (hash: string, chain: string) => {
    const baseUrls: { [key: string]: string } = {
      'BASE': 'https://basescan.org/tx/',
      'ETHEREUM': 'https://etherscan.io/tx/',
      'POLYGON': 'https://polygonscan.com/tx/',
    };
    return baseUrls[chain.toUpperCase()] || `https://basescan.org/tx/${hash}`;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-6 bg-muted animate-pulse rounded" />
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive text-sm">{error}</p>
        <Button
          variant="outline"
          onClick={() => window.location.reload()}
          className="mt-4"
        >
          Retry
        </Button>
      </div>
    );
  }

  if (claims.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground text-sm">No token claims found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-2">Token Claims</h3>
        <p className="text-sm text-muted-foreground">
          View all token claim records including claim amounts and transaction details.
        </p>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Claim Index</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Chain</TableHead>
              <TableHead>Claimed At</TableHead>
              <TableHead>Transaction</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {claims.map((claim) => (
              <TableRow key={claim.id}>
                <TableCell className="font-medium">
                  #{claim.claimIndex}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">
                      {formatAddress(claim.account)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(claim.account)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="font-medium">
                    {formatAmount(claim.amount)}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center px-2 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-medium">
                    {claim.chain}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    <div>{format(new Date(claim.claimedAt), "MMM dd, yyyy")}</div>
                    <div className="text-muted-foreground text-xs">
                      {format(new Date(claim.claimedAt), "HH:mm:ss")}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm">
                      {formatAddress(claim.transactionHash)}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(claim.transactionHash)}
                      className="h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => window.open(getExplorerUrl(claim.transactionHash, claim.chain), '_blank')}
                      className="h-6 w-6 p-0"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setPage(Math.max(1, page - 1))}
                className={page <= 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {(() => {
              const pages = [];
              const maxPages = Math.min(5, totalPages);
              const startPage = Math.max(1, Math.min(totalPages - maxPages + 1, page - 2));
              
              for (let i = 0; i < maxPages; i++) {
                const pageNum = startPage + i;
                if (pageNum <= totalPages) {
                  pages.push(
                    <PaginationItem key={`page-${pageNum}`}>
                      <PaginationLink
                        onClick={() => setPage(pageNum)}
                        isActive={page === pageNum}
                        className="cursor-pointer"
                      >
                        {pageNum}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              }
              return pages;
            })()}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => setPage(Math.min(totalPages, page + 1))}
                className={page >= totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
