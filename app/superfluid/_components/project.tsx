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
import { useEffect, useState } from "react";
import {
  GithubIcon,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface ProjectItem {
  name: string;
  overview: string;
  description: string;
  avatarUrl: string;
  socials: {
    github?: string;
  };
  githubAnalysis: {
    stars: number;
    forks: number;
    rating: number;
    activity: number;
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

export default function Project() {
  const [projectData, setProjectData] = useState<ProjectItem[]>([]);
  const [initLoading, setInitLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: DEFAULT_PAGE_SIZE,
    total: 0,
    totalPages: 1,
    hasNext: false,
    hasPrev: false,
  });

  const fetchProjects = async (page: number = 1) => {
    try {
      const data = await fetch(
        `/v1/leaderboard/projects?page=${page}&limit=${DEFAULT_PAGE_SIZE}`
      );

      const res = await data.json();

      console.log(res);

      setProjectData(res.data || []);
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
      console.error("Error fetching projects:", error);
      setInitLoading(false);
    }
  };

  // 翻页处理函数
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.totalPages && page !== currentPage) {
      fetchProjects(page);
    }
  };

  useEffect(() => {
    fetchProjects(1);
  }, []);

  if (initLoading) {
    return <div className="text-white text-center py-8">Loading...</div>;
  }

  return (
    <div>
      <div className="relative bg-[rgba(34,39,63,0.5)] border-[2px] border-[rgba(151,151,151,0.54)] rounded-[20px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-[rgba(34,39,63,0.5)] hover:bg-[rgba(34,39,63,0.5)] border-b border-[rgba(153,150,198,0.36)]">
              <TableHead className="text-[#999999] text-base py-6 text-center">
                No.
              </TableHead>
              <TableHead className="text-[#999999] text-base">
                Project
              </TableHead>
              <TableHead className="text-[#999999] text-base">
                Social Link
              </TableHead>
              <TableHead className="text-[#999999] text-base text-center">
                Stars
              </TableHead>
              <TableHead className="text-[#999999] text-base text-center">
                Forks
              </TableHead>
              <TableHead className="text-[#999999] text-base text-center">
                Rating
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projectData.map((item, index) => (
              <TableRow
                key={item.name}
                className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] h-[84px]"
              >
                {/* 排名 */}
                <TableCell className="font-bold text-lg text-center py-4">
                  {getRankDisplay(
                    (currentPage - 1) * DEFAULT_PAGE_SIZE + index + 1
                  )}
                </TableCell>

                {/* 项目信息 */}
                <TableCell className="py-4 w-[300px] overflow-hidden">
                  <div className="flex items-center w-[300px] gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={item.avatarUrl} />
                      <AvatarFallback className="bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold text-xs">
                        {item.name?.charAt(0)?.toUpperCase() || "P"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="w-[calc(100%-72px)] overflow-hidden">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg text-white truncate">
                          {item.name}
                        </span>
                      </div>
                      <div className="text-[12px] text-[#999999] truncate">
                        {item.overview || item.description || "No description"}
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
                    {item.socials.github && (
                      <a
                        href={item.socials.github}
                        target="_blank"
                        className="text-gray-400 hover:text-gray-300"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </TableCell>

                {/* Stars */}
                <TableCell className="text-center font-bold py-4 text-white">
                  {item.githubAnalysis?.stars ?? "N/A"}
                </TableCell>

                {/* Forks */}
                <TableCell className="text-center font-bold py-4 text-white">
                  {item.githubAnalysis?.forks ?? "N/A"}
                </TableCell>

                {/* Rating */}
                <TableCell className="text-center py-4">
                  <span className="text-[#17E1A4] font-bold">
                    {item.githubAnalysis?.rating?.toFixed(1) ?? "N/A"}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
