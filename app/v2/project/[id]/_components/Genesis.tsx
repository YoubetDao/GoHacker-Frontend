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
import { getProjectPledgeHoldersCluster, PledgeParticipant } from "@/service/detail";

export const Genesis = () => {
  const params = useParams();
  const id = params.id as string;
  const [participants, setParticipants] = useState<PledgeParticipant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [allParticipants, setAllParticipants] = useState<PledgeParticipant[]>([]);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchPledgeHolders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProjectPledgeHoldersCluster(id);
        setAllParticipants(response.participants);
        
        // If backend supports pagination, update this logic
        if (response.pagination) {
          setParticipants(response.participants);
          setTotalPages(response.pagination.totalPages);
        } else {
          // Frontend pagination fallback
          const total = response.participants.length;
          setTotalPages(Math.ceil(total / itemsPerPage));
          const startIndex = (page - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          setParticipants(response.participants.slice(startIndex, endIndex));
        }
      } catch (err) {
        console.error("Failed to fetch pledge holders:", err);
        setError("Failed to load pledge data. Please try again later.");
        setParticipants([]);
        setAllParticipants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPledgeHolders();
  }, [id]);

  // Handle pagination for frontend-only pagination
  useEffect(() => {
    if (allParticipants.length > 0) {
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      setParticipants(allParticipants.slice(startIndex, endIndex));
    }
  }, [page, allParticipants]);

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  if (loading && participants.length === 0) {
    return (
      <div className="py-8 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Loading pledge data...</p>
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
        {loading && participants.length > 0 && (
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
              <TableHead>Points</TableHead>
              <TableHead>Virtuals</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {participants.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-8">
                  No data
                </TableCell>
              </TableRow>
            ) : (
              participants.map((participant, index) => (
                <TableRow key={`${participant.walletAddress}-${index}`}>
                  <TableCell>
                    <button
                      onClick={() => copyAddress(participant.walletAddress)}
                      className="flex items-center gap-1 text-xs hover:text-primary transition-colors"
                    >
                      {`${participant.walletAddress.slice(0, 6)}...${participant.walletAddress.slice(-4)}`}
                      <Copy className="w-3 h-3" />
                    </button>
                  </TableCell>
                  <TableCell>{participant.totalPoints.toLocaleString()}</TableCell>
                  <TableCell>{participant.totalVirtuals.toLocaleString()}</TableCell>
                </TableRow>
              ))
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
