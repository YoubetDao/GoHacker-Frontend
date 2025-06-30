"use client";
import { useState } from "react";
import DeveloperTable from "@/components/DeveloperTable";
import ProjectTable from "@/components/ProjectTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

enum Tab {
  Developer = "Developer",
  Project = "Project",
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Developer);
  const [statusFilter, setStatusFilter] = useState("Upcoming");

  return (
    <div className="mt-8">
      {/* 头部与筛选 */}
      <div className="mb-6">
        {/* 桌面版 - 单行布局 */}
        <div className="hidden md:flex justify-between items-center">
          {/* Tab 切换 */}
          <div className="flex rounded-[4px] bg-[rgba(34,39,63,0.7)] p-0.5">
            <div
              className={`px-3 py-1.5 cursor-pointer font-[500] rounded-[4px] ${
                activeTab === Tab.Developer ? "bg-[#292F4E] font-[700]" : ""
              }`}
              onClick={() => setActiveTab(Tab.Developer)}
            >
              Developer
            </div>
            <div
              className={`px-3 py-1.5 cursor-pointer font-[500] rounded-[4px] ${
                activeTab === Tab.Project ? "bg-[#292F4E] font-[700]" : ""
              }`}
              onClick={() => setActiveTab(Tab.Project)}
            >
              Project
            </div>
          </div>

          {/* 状态筛选器 */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="border-[rgba(151,151,151,0.54)] bg-[rgba(34,39,63,0.5)] text-white w-[160px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="border-[rgba(151,151,151,0.54)] bg-[rgba(34,39,63,0.95)] backdrop-blur-md">
              {["all", "Live", "Upcoming", "Ended"].map((val) => (
                <SelectItem
                  key={val}
                  value={val}
                  className="text-white hover:bg-[rgba(129,74,200,0.3)] cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    {val === "all" ? "All Projects" : val}
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* 移动版 - 两行布局 */}
        <div className="flex md:hidden flex-col gap-4">
          {/* 第一行：Tab 切换 */}
          <div className="w-full">
            <div className="flex rounded-[4px] bg-[rgba(34,39,63,0.7)] p-0.5 w-full">
              <div
                className={`flex-1 py-2 cursor-pointer font-[500] rounded-[4px] text-sm text-center ${
                  activeTab === Tab.Developer ? "bg-[#292F4E] font-[700]" : ""
                }`}
                onClick={() => setActiveTab(Tab.Developer)}
              >
                Developer
              </div>
              <div
                className={`flex-1 py-2 cursor-pointer font-[500] rounded-[4px] text-sm text-center ${
                  activeTab === Tab.Project ? "bg-[#292F4E] font-[700]" : ""
                }`}
                onClick={() => setActiveTab(Tab.Project)}
              >
                Project
              </div>
            </div>
          </div>

          {/* 第二行：状态筛选器 */}
          <div className="w-full">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="border-[rgba(151,151,151,0.54)] bg-[rgba(34,39,63,0.5)] text-white w-full">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="border-[rgba(151,151,151,0.54)] bg-[rgba(34,39,63,0.95)] backdrop-blur-md">
                {["all", "Live", "Upcoming", "Ended"].map((val) => (
                  <SelectItem
                    key={val}
                    value={val}
                    className="text-white hover:bg-[rgba(129,74,200,0.3)] cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      {val === "all" ? "All Projects" : val}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* 表格内容 */}
      {activeTab === Tab.Developer ? (
        <DeveloperTable
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      ) : (
        <ProjectTable
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
        />
      )}
    </div>
  );
}
