"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { TwitterIcon } from "lucide-react";
import TwitterAvatar from "@/components/TwitterAvatar";
import { getYappers, YapperUser } from "@/service";

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

export default function YapperBoard() {
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
              parseFloat(b.score || '0') - parseFloat(a.score || '0')
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
    <div className="mt-8">
      {/* 表格内容 */}
      <div className={` ${yapperList.length === 0 ? "mb-[940px]" : ""}`}>
        {/* 表格 */}
        <div className="relative bg-[rgba(34,39,63,0.5)] border-[2px] border-[rgba(151,151,151,0.54)] rounded-[20px] overflow-hidden">
          {/* 表格容器 - 桌面版 */}
          <div className="hidden md:block">
            <Table>
              <TableHeader>
                <TableRow className="bg-[rgba(34,39,63,0.5)] hover:bg-[rgba(34,39,63,0.5)] border-b border-[rgba(153,150,198,0.36)]">
                  <TableHead className="text-[#999999] text-base py-6 text-center">
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
                        {user.score ? parseFloat(user.score).toFixed(2) : '0.00'}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* 移动端固定列表格 */}
          <div className="block md:hidden">
            <div className="flex">
              {/* 固定的No.列 */}
              <div className="flex-shrink-0 bg-[rgba(34,39,63,0.7)]">
                <div className="border-b border-[rgba(153,150,198,0.36)] bg-[rgba(34,39,63,0.5)] py-6 px-4 text-center">
                  <div className="text-[#999999] text-base font-medium">
                    No.
                  </div>
                </div>
                {yapperList.map((user) => (
                  <div
                    key={user.id}
                    className="border-b border-[rgba(255,255,255,0.05)] h-[84px] flex items-center justify-center px-4"
                  >
                    <div className="font-bold text-lg text-center">
                      {getRankDisplay(user.rank || 1)}
                    </div>
                  </div>
                ))}
              </div>

              {/* 可滚动的其他列 */}
              <div className="flex-1 overflow-x-auto">
                <div className="min-w-[500px]">
                  {/* 表头 */}
                  <div className="flex border-b border-[rgba(153,150,198,0.36)] bg-[rgba(34,39,63,0.5)]">
                    <div className="flex-shrink-0 w-[200px] py-6 px-4">
                      <div className="text-[#999999] text-base">Twitter</div>
                    </div>
                    <div className="flex-shrink-0 w-[180px] py-6 px-4 text-center">
                      <div className="text-[#999999] text-base">Mentions</div>
                    </div>
                    <div className="flex-shrink-0 w-[120px] py-6 px-4 text-center">
                      <div className="text-[#999999] text-base">Score</div>
                    </div>
                  </div>

                  {/* 数据行 */}
                  {yapperList.map((user) => (
                    <div
                      key={user.id}
                      className="flex border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] h-[84px]"
                    >
                      {/* Twitter */}
                      <div className="flex-shrink-0 w-[200px] py-4 px-4">
                        <div className="flex items-center gap-2">
                          <TwitterAvatar
                            twitterHandle={user.twitterHandle}
                            displayName={user.displayName}
                            avatarUrl={user.avatarUrl}
                            size="md"
                          />
                          <div className="overflow-hidden">
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
                              <span className="truncate">
                                @{user.twitterHandle}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mentions */}
                      <div className="flex-shrink-0 w-[180px] py-4 px-4 flex items-center justify-center">
                        <span className="text-center font-bold text-white">
                          {user.statistics?.totalTweets || 0}
                        </span>
                      </div>

                      {/* Score */}
                      <div className="flex-shrink-0 w-[120px] py-4 px-4 flex items-center justify-center">
                        <span className="text-[#17E1A4] font-bold">
                          {user.score ? parseFloat(user.score).toFixed(2) : '0.00'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
