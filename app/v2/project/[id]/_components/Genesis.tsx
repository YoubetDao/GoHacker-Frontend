"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

  useEffect(() => {
    const fetchPledgeHolders = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getProjectPledgeHoldersCluster(id);
        setParticipants(response.participants);
      } catch (err) {
        console.error("Failed to fetch pledge holders:", err);
        setError("Failed to load pledge data. Please try again later.");
        setParticipants([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPledgeHolders();
  }, [id]);

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
              <TableRow key={index}>
                <TableCell>
                  <button
                    onClick={() => copyAddress(participant.walletAddress)}
                    className="flex items-center gap-1 text-xs hover:text-primary"
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
  );
};
