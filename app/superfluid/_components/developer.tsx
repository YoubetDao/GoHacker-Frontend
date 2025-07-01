"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState, useCallback } from "react";
import {
  GithubIcon,
  TwitterIcon,
  Send,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ChevronsUpDown,
} from "lucide-react";

interface RankingItem {
  username: string;
  title: string;
  bio: string;
  avatarUrl: string;
  socials: {
    github?: string;
    twitter?: string;
    telegram?: string;
  };
  githubAnalysis: {
    followers: number;
    stars: number;
    rating: number;
    activity: number | null;
  };
  hasGithub: boolean;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

const DEFAULT_PAGE_SIZE = 10;

const isAddress = (name: string) => name.startsWith("0x");

// 可排序字段定义
const SortableFields = [
  {
    type: "github_analysis.rating",
    label: "Rating",
  },
  {
    type: "github_analysis.activity",
    label: "Activity",
  },
  {
    type: "github_analysis.followers",
    label: "Followers",
  },
  {
    type: "github_analysis.stars",
    label: "Stars",
  },
];

type SortField =
  | "github_analysis.rating"
  | "github_analysis.activity"
  | "github_analysis.followers"
  | "github_analysis.stars";
type SortDirection = "asc" | "desc" | null;

// 排名显示函数
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

export default function Developer() {
  const [rankingData, setRankingData] = useState<RankingItem[]>([]);
  const [initLoading, setInitLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<SortField | null>(
    "github_analysis.rating"
  );
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });

  // 排序处理函数
  const handleSort = (field: SortField) => {
    setSortField((prevField) =>
      prevField === field ? (sortDirection === "desc" ? null : field) : field
    );
    setSortDirection((prevDir) => {
      if (sortField !== field) return "asc";
      if (prevDir === "asc") return "desc";
      if (prevDir === "desc") return null;
      return "asc";
    });
    setCurrentPage(1); // 排序时重置到第一页
  };

  // 获取排序图标
  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <ChevronsUpDown className="ml-2 h-4 w-4" />;
    if (sortDirection === "asc") return <ChevronUp className="ml-2 h-4 w-4" />;
    if (sortDirection === "desc")
      return <ChevronDown className="ml-2 h-4 w-4" />;
    return <ChevronsUpDown className="ml-2 h-4 w-4" />;
  };

  const fetchDevelopers = useCallback(async (page: number = 1) => {
    try {
      let url = `/v1/leaderboard/builders?page=${page}&size=${DEFAULT_PAGE_SIZE}`;

      // 添加排序参数
      if (sortField && sortDirection) {
        url += `&sortBy=${sortField}&sortOrder=${sortDirection}`;
      }

      const data = await fetch(url);
      const res = await data.json();

      console.log(res);

      setRankingData(res.data || []);
      setPagination(
        res.pagination || {
          page: 1,
          limit: DEFAULT_PAGE_SIZE,
          total: 0,
          totalPages: 1,
          hasNext: false,
          hasPrev: false,
        }
      );
      setCurrentPage(page);
      setInitLoading(false);
    } catch (error) {
      console.error("Error fetching developers:", error);
      setInitLoading(false);
    }
  }, [sortField, sortDirection]);

  // 翻页处理函数
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages && page !== currentPage) {
      fetchDevelopers(page);
    }
  };

  useEffect(() => {
    fetchDevelopers(1);
  }, [fetchDevelopers]); // 排序变化时重新获取数据

  return (
    <div className={` ${initLoading ? "mb-[940px]" : ""}`}>
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
                  Developers
                </TableHead>
                <TableHead className="text-[#999999] text-base">
                  Social link
                </TableHead>
                {SortableFields.map(({ type, label }) => (
                  <TableHead
                    key={type}
                    className="text-[#999999] text-base text-center cursor-pointer hover:text-white transition-colors"
                    onClick={() => handleSort(type as SortField)}
                  >
                    <div className="flex items-center justify-center">
                      {label}
                      {getSortIcon(type as SortField)}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rankingData.map((item, index) => (
                <TableRow
                  key={item.username}
                  className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] h-[84px]"
                >
                  {/* 排名 */}
                  <TableCell className="font-bold text-lg text-center py-4">
                    {getRankDisplay(
                      (currentPage - 1) * DEFAULT_PAGE_SIZE + index + 1
                    )}
                  </TableCell>

                  {/* 开发者信息 */}
                  <TableCell className="py-4 w-[200px] overflow-hidden">
                    <div className="flex items-center w-[200px] gap-2">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={item.avatarUrl} />
                        <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-xs">
                          {item.username?.charAt(0)?.toUpperCase() || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="w-[calc(100%-60px)] overflow-hidden">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-lg text-white truncate">
                            {isAddress(item.username)
                              ? item.username.slice(0, 6) +
                                "..." +
                                item.username.slice(-4)
                              : item.username}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-[12px] text-[#999999]">
                          <span className="truncate">
                            {item.title || item.bio}
                          </span>
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  {/* 社交链接 */}
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      {item.socials.github && (
                        <a
                          href={item.socials.github}
                          target="_blank"
                          className="text-gray-400 hover:text-gray-300"
                        >
                          <GithubIcon className="w-4 h-4" />
                        </a>
                      )}
                      {item.socials.telegram && (
                        <a
                          href={item.socials.telegram}
                          target="_blank"
                          className="text-gray-400 hover:text-blue-300"
                        >
                          <Send className="w-4 h-4" />
                        </a>
                      )}
                      {item.socials.twitter && (
                        <a
                          href={item.socials.twitter}
                          target="_blank"
                          className="text-gray-400 hover:text-blue-300"
                        >
                          <TwitterIcon className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </TableCell>

                  {/* Rating */}
                  <TableCell className="text-center py-4">
                    <span className="text-[#17E1A4] font-bold">
                      {item.githubAnalysis?.rating?.toFixed(1) ?? "N/A"}
                    </span>
                  </TableCell>

                  {/* Activity */}
                  <TableCell className="text-center py-4">
                    <span
                      style={{ background: "rgba(126,143,255,0.24)" }}
                      className="text-[#7EB8FF] px-[20px] py-2 rounded-[16px] font-bold"
                    >
                      {item.githubAnalysis?.activity?.toFixed(1) ?? "N/A"}
                    </span>
                  </TableCell>

                  {/* Followers */}
                  <TableCell className="text-center font-bold py-4 text-white">
                    {item.githubAnalysis?.followers ?? "N/A"}
                  </TableCell>

                  {/* Stars */}
                  <TableCell className="text-center font-bold py-4 text-white">
                    {item.githubAnalysis?.stars ?? "N/A"}
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
                <div className="text-[#999999] text-base font-medium">No.</div>
              </div>
              {rankingData.map((_, index) => (
                <div
                  key={index}
                  className="border-b border-[rgba(255,255,255,0.05)] h-[84px] flex items-center justify-center px-4"
                >
                  <div className="font-bold text-lg text-center">
                    {getRankDisplay((currentPage - 1) * DEFAULT_PAGE_SIZE + index + 1)}
                  </div>
                </div>
              ))}
            </div>

            {/* 可滚动的其他列 */}
            <div className="flex-1 overflow-x-auto">
              <div className="min-w-[800px]">
                {/* 表头 */}
                <div className="flex border-b border-[rgba(153,150,198,0.36)] bg-[rgba(34,39,63,0.5)]">
                  <div className="flex-shrink-0 w-[200px] py-6 px-4">
                    <div className="text-[#999999] text-base">Developers</div>
                  </div>
                  <div className="flex-shrink-0 w-[120px] py-6 px-4">
                    <div className="text-[#999999] text-base">Social Link</div>
                  </div>
                  {SortableFields.map(({ type, label }) => (
                    <div
                      key={type}
                      className="flex-shrink-0 w-[120px] py-6 px-4 text-center cursor-pointer"
                      onClick={() => handleSort(type as SortField)}
                    >
                      <div className="flex items-center justify-center text-[#999999] text-base">
                        {label}
                        {getSortIcon(type as SortField)}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* 数据行 */}
                {rankingData.map((item) => (
                  <div
                    key={item.username}
                    className="flex border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] h-[84px]"
                  >
                    {/* 开发者 */}
                    <div className="flex-shrink-0 w-[200px] py-4 px-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={item.avatarUrl} />
                          <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-xs">
                            {item.username?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div className="overflow-hidden">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-lg text-white truncate">
                              {isAddress(item.username)
                                ? item.username.slice(0, 6) +
                                  "..." +
                                  item.username.slice(-4)
                                : item.username}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[12px] text-[#999999]">
                            <span className="truncate">
                              {item.title || item.bio}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* 社交链接 */}
                    <div className="flex-shrink-0 w-[120px] py-4 px-4 flex items-center">
                      <div className="flex items-center gap-2">
                        {item.socials.github && (
                          <a
                            href={item.socials.github}
                            target="_blank"
                            className="text-gray-400 hover:text-gray-300"
                          >
                            <GithubIcon className="w-4 h-4" />
                          </a>
                        )}
                        {item.socials.telegram && (
                          <a
                            href={item.socials.telegram}
                            target="_blank"
                            className="text-gray-400 hover:text-blue-300"
                          >
                            <Send className="w-4 h-4" />
                          </a>
                        )}
                        {item.socials.twitter && (
                          <a
                            href={item.socials.twitter}
                            target="_blank"
                            className="text-gray-400 hover:text-blue-300"
                          >
                            <TwitterIcon className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {/* 数据列 */}
                    <div className="flex-shrink-0 w-[120px] py-4 px-4 flex items-center justify-center">
                      <span className="text-[#17E1A4] font-bold">
                        {item.githubAnalysis?.rating?.toFixed(1) ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex-shrink-0 w-[120px] py-4 px-4 flex items-center justify-center">
                      <span
                        style={{ background: "rgba(126,143,255,0.24)" }}
                        className="text-[#7EB8FF] px-[12px] py-1 rounded-[16px] font-bold text-sm"
                      >
                        {item.githubAnalysis?.activity?.toFixed(1) ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex-shrink-0 w-[120px] py-4 px-4 flex items-center justify-center">
                      <span className="text-center font-bold text-white">
                        {item.githubAnalysis?.followers ?? "N/A"}
                      </span>
                    </div>
                    <div className="flex-shrink-0 w-[120px] py-4 px-4 flex items-center justify-center">
                      <span className="text-center font-bold text-white">
                        {item.githubAnalysis?.stars ?? "N/A"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 翻页器 */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center items-center py-8 gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={!pagination.hasPrev}
            className="flex cursor-pointer items-center px-3 py-2 text-sm bg-[rgba(34,39,63,0.5)] text-white rounded-md hover:bg-[rgba(34,39,63,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Prev
          </button>
          <div className="text-white text-sm">
            Page {currentPage} of {pagination.totalPages}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={!pagination.hasNext}
            className="flex cursor-pointer items-center px-3 py-2 text-sm bg-[rgba(34,39,63,0.5)] text-white rounded-md hover:bg-[rgba(34,39,63,0.8)] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}
