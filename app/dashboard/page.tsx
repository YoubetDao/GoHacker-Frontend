"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { ChevronUp, ChevronDown, ChevronsUpDown } from "lucide-react";

const leaderboardData = [
  {
    rank: 1,
    developer: {
      avatar: "/api/placeholder/32/32",
      name: "d10r",
      description: "Building Coordination Technology",
      verified: true,
    },
    followers: "1.1k",
    stars: 50,
    rating: 20.68,
    activity: 85.5,
  },
  {
    rank: 2,
    developer: {
      avatar: "/api/placeholder/32/32",
      name: "d10r",
      description: "Building Coordination Technology",
      verified: true,
    },
    followers: "1.1k",
    stars: 50,
    rating: 20.68,
    activity: 85.5,
  },
  {
    rank: 3,
    developer: {
      avatar: "/api/placeholder/32/32",
      name: "d10r",
      description: "Building Coordination Technology",
      verified: true,
    },
    followers: "1.1k",
    stars: 50,
    rating: 20.68,
    activity: 85.5,
  },
  {
    rank: 4,
    developer: {
      avatar: "/api/placeholder/32/32",
      name: "d10r",
      description: "Building Coordination Technology",
      verified: true,
    },
    followers: "1.1k",
    stars: 50,
    rating: 20.68,
    activity: 85.5,
  },
  {
    rank: 5,
    developer: {
      avatar: "/api/placeholder/32/32",
      name: "d10r",
      description: "Building Coordination Technology",
      verified: true,
    },
    followers: "1.1k",
    stars: 50,
    rating: 20.68,
    activity: 85.5,
  },
  {
    rank: 6,
    developer: {
      avatar: "/api/placeholder/32/32",
      name: "d10r",
      description: "Building Coordination Technology",
      verified: true,
    },
    followers: "1.1k",
    stars: 50,
    rating: 20.68,
    activity: 85.5,
  },
  {
    rank: 7,
    developer: {
      avatar: "/api/placeholder/32/32",
      name: "d10r",
      description: "Building Coordination Technology",
      verified: true,
    },
    followers: "1.1k",
    stars: 50,
    rating: 20.68,
    activity: 85.5,
  },
];

const getRankDisplay = (rank: number) => {
  if (rank <= 3) {
    const gradientColors = {
      1: "from-[#FFF35A] to-[#FF8924]",
      2: "from-[#80D7FF] to-[#6C90ED]", 
      3: "from-[#FF9F46] to-[#A55513]",
    };
    
    return (
      <span className={`font-bold text-lg bg-gradient-to-b ${gradientColors[rank as keyof typeof gradientColors]} bg-clip-text text-transparent`}>
        TOP.{rank}
      </span>
    );
  }
  return `#${rank}`;
};

type SortField = "followers" | "stars" | "rating" | "activity";
type SortDirection = "asc" | "desc" | null;

export default function Dashboard() {
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      } else {
        setSortDirection("asc");
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="ml-2 h-4 w-4" />;
    }
    if (sortDirection === "asc") {
      return <ChevronUp className="ml-2 h-4 w-4" />;
    }
    if (sortDirection === "desc") {
      return <ChevronDown className="ml-2 h-4 w-4" />;
    }
    return <ChevronsUpDown className="ml-2 h-4 w-4" />;
  };

  const sortedData = [...leaderboardData].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;

    let aValue: number;
    let bValue: number;

    switch (sortField) {
      case "followers":
        aValue = parseFloat(a.followers.replace("k", "")) * 1000;
        bValue = parseFloat(b.followers.replace("k", "")) * 1000;
        break;
      case "stars":
        aValue = a.stars;
        bValue = b.stars;
        break;
      case "rating":
        aValue = a.rating;
        bValue = b.rating;
        break;
      case "activity":
        aValue = a.activity;
        bValue = b.activity;
        break;
      default:
        return 0;
    }

    if (sortDirection === "asc") {
      return aValue - bValue;
    } else {
      return bValue - aValue;
    }
  });
  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-6">
        <div className="text-2xl font-bold">Superfluid Leaderboard</div>

        <div className="p-0.5 bg-[rgba(34,39,63,0.7)] rounded-[4px] text-sm flex">
          <div className="py-1.5 px-3 bg-[#292F4E] rounded-[4px] cursor-pointer">
            All
          </div>
          <div className="py-1.5 px-3 cursor-pointer">Coming soon</div>
        </div>
      </div>

      <div className="bg-[rgba(34,39,63,0.5)] border-[2px] border-[rgba(151,151,151,0.54)] rounded-[20px]">
        <Table>
          <TableHeader>
            <TableRow className="bg-[rgba(34,39,63,0.5)]  border-b border-[rgba(153,150,198,0.36)]">
              <TableHead className="text-[#999999] text-base py-6 text-center">
                No.
              </TableHead>
              <TableHead className="text-[#999999] text-base">
                Developers
              </TableHead>
              <TableHead
                className="text-[#999999] text-base text-center cursor-pointer"
                onClick={() => handleSort("followers")}
              >
                <div className="flex items-center justify-center">
                  Followers
                  {getSortIcon("followers")}
                </div>
              </TableHead>
              <TableHead
                className="text-[#999999] text-base text-center cursor-pointer"
                onClick={() => handleSort("stars")}
              >
                <div className="flex items-center justify-center">
                  Stars
                  {getSortIcon("stars")}
                </div>
              </TableHead>
              <TableHead className="text-[#999999] text-base text-center cursor-pointer">
                <div className="flex items-center justify-center">Rating</div>
              </TableHead>
              <TableHead className="text-[#999999] text-base text-center cursor-pointer">
                <div className="flex items-center justify-center">Activity</div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedData.map((item, index) => (
              <TableRow
                key={index}
                className="border-b border-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.02)] transition-colors h-[84px]"
              >
                <TableCell className="font-bold text-lg text-center py-4">
                  {getRankDisplay(item.rank)}
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={item.developer.avatar} />
                      <AvatarFallback className="bg-gray-700 text-white">
                        {item.developer.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-lg text-white">
                          {item.developer.name}
                        </span>
                      </div>
                      <div className="text-[12px] text-[#999999]">
                        {item.developer.description}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center font-bold py-4 text-white">
                  {item.followers}
                </TableCell>
                <TableCell className="text-center font-bold py-4 text-white">
                  {item.stars}
                </TableCell>
                <TableCell className="text-center py-4">
                  <span className="text-[#17E1A4] font-bold ">
                    {item.rating}
                  </span>
                </TableCell>
                <TableCell className="text-center py-4">
                  <span className="bg-[#7E8FFF] text-[#7EB8FF] px-[20px] py-2 rounded-[16px] font-bold">
                    {item.activity}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
