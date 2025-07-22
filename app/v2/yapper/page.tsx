"use client";
import { Card } from "@/components/ui/card";
import { useState } from "react";
import { useEffect } from "react";
import { getYappers, YapperUser } from "@/service";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import TwitterAvatar from "./_components/TwitterAvatar";
import { TwitterIcon } from "lucide-react";

const getRankDisplay = (rank: number) => {
  const colorMap = {
    1: "from-[#FFF35A] to-[#FF8924]",
    2: "from-[#80D7FF] to-[#6C90ED]",
    3: "from-[#FF9F46] to-[#A55513]",
  } as const;
  return rank <= 3 ? (
    <span
      className={`font-bold text-lg bg-gradient-to-b ${
        colorMap[rank as 1 | 2 | 3]
      } bg-clip-text text-transparent`}
    >
      TOP.{rank}
    </span>
  ) : (
    `#${rank}`
  );
};

export default function Yapper() {
  const [yapperList, setYapperList] = useState<YapperUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchYappers = async () => {
      try {
        setLoading(true);
        const data = await getYappers();

        // Sort by score (descending) and add ranks
        const sortedData = data
          .sort(
            (a: YapperUser, b: YapperUser) =>
              parseFloat(b.score || "0") - parseFloat(a.score || "0")
          )
          .map((user: YapperUser, index: number) => ({
            ...user,
            rank: index + 1,
          }));

        setYapperList(sortedData);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch yapper data"
        );
        console.error("Failed to fetch yapper data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchYappers();
  }, []);

  if (loading) {
    return (
      <div className="mt-8">
        <div className="flex justify-center items-center py-20">
          <div className="text-white text-lg">Loading Yapper Board...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-8">
        <div className="flex justify-center items-center py-20">
          <div className="text-red-400 text-lg">Error: {error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="text-3xl font-bold text-foreground mb-2">
          Yapper Leaderboard
        </div>
      </div>
      <Card className="bg-gradient-card border-border/50">
        <div>
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#999999] text-base text-center">
                    No.
                  </TableHead>
                  <TableHead className="text-[#999999] text-base">
                    Twitter
                  </TableHead>
                  <TableHead className="text-[#999999] text-base text-center">
                    Mentions
                  </TableHead>
                  <TableHead className="text-[#999999] text-base text-center">
                    Score
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {yapperList.map((user) => (
                  <TableRow
                    key={user.id}
                    className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] h-[84px]"
                  >
                    {/* 排名 */}
                    <TableCell className="font-bold text-lg text-center py-4">
                      {getRankDisplay(user.rank || 1)}
                    </TableCell>

                    {/* Twitter */}
                    <TableCell className="py-4 w-[200px] overflow-hidden">
                      <div className="flex items-center w-[200px] gap-2">
                        <TwitterAvatar
                          twitterHandle={user.twitterHandle}
                          displayName={user.displayName}
                          avatarUrl={user.avatarUrl}
                          size="md"
                        />
                        <div className="w-[calc(100%-60px)] overflow-hidden">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg text-white truncate flex-1 min-w-0">
                              {user.displayName}
                            </span>
                            <a
                              href={`https://twitter.com/${user.twitterHandle}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-shrink-0"
                            >
                              <TwitterIcon className="w-4 h-4" />
                            </a>
                          </div>
                          <div className="flex items-center gap-1 text-[12px] text-[#999999]">
                            <span>@{user.twitterHandle}</span>
                          </div>
                        </div>
                      </div>
                    </TableCell>

                    {/* Mentions */}
                    <TableCell className="text-center font-bold py-4 text-white">
                      {user.statistics?.totalTweets || 0}
                    </TableCell>

                    {/* Score */}
                    <TableCell className="text-center py-4">
                      <span className="text-[#17E1A4] font-bold">
                        {user.score
                          ? parseFloat(user.score).toFixed(2)
                          : "0.00"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
    </div>
  );
}
