"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Cluster, getProjectPledgeHoldersCluster } from "@/service/detail";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export const Clusters = () => {
  const params = useParams();
  const id = params.id as string;

  const [clustersData, setClustersData] = useState<Cluster[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const copyAddress = (address: string) => {
    navigator.clipboard.writeText(address);
  };

  useEffect(() => {
    const fetchClusters = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await getProjectPledgeHoldersCluster(id);
        console.log("response.clusters", response.clusters);
        setClustersData(response.clusters || []);
      } catch (err) {
        console.error("Failed to fetch clusters:", err);
        setError("Failed to load cluster data. Please try again later.");
        setClustersData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchClusters();
  }, [id]);
  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
        <p className="text-sm text-muted-foreground">Loading cluster data...</p>
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

  if (clustersData.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-sm text-muted-foreground">
          No cluster data available
        </p>
      </div>
    );
  }
  return (
    <div className="space-y-6">
      {clustersData.map((cluster) => (
        <div key={cluster.clusterId} className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              Cluster #{cluster.clusterId}
            </h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Size: {cluster.size}</span>
              <span>Total Points: {cluster.totalPoints.toLocaleString()}</span>
              <span>
                Total Virtuals: {cluster.totalVirtuals.toLocaleString()}
              </span>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Wallet Address</TableHead>
                <TableHead>Points</TableHead>
                <TableHead>Virtuals</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cluster.nodes.map((node, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <button
                      onClick={() => copyAddress(node.address)}
                      className="flex items-center gap-1 text-xs hover:text-primary font-mono"
                    >
                      {`${node.address.slice(0, 6)}...${node.address.slice(
                        -4
                      )}`}
                      <Copy className="w-3 h-3" />
                    </button>
                  </TableCell>
                  <TableCell>{node.points.toLocaleString()}</TableCell>
                  <TableCell>{node.virtuals.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  );
};
