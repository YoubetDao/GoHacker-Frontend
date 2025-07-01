"use client";
import Button from "@/components/common/Button";
import { useState } from "react";
import Developer from "./_components/developer";
import Project from "./_components/project";
import { DeveloperTrends } from "./_components/developerTrend";

enum Tab {
  Developer = "Developer",
  Project = "Project",
}

export default function Superfluid() {
  const [activeTab, setActiveTab] = useState<Tab>(Tab.Developer);
  const [open, setOpen] = useState(false);

  return (
    <div className="pt-8">
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

          {/* Trends Chart 按钮 */}
          <div className="flex gap-2">
            <Button
              className="font-medium px-4 py-2 text-sm flex items-center gap-2 whitespace-nowrap bg-transparent border border-[rgba(151,151,151,0.54)] hover:border-white/40 text-white hover:bg-white/5"
              onClick={() => {
                window.open(
                  "https://according.work/dashboard?superfluid=true",
                  "_blank"
                );
              }}
            >
              Bind Github
            </Button>
            <Button onClick={() => setOpen(true)}>Trends Chart</Button>
          </div>
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

          {/* 第二行：Trends Chart 按钮 */}
          <div className="w-full">
            <Button
              className="w-full font-medium px-4 py-2 text-sm"
              onClick={() => setOpen(true)}
            >
              Trends Chart
            </Button>
          </div>
        </div>
      </div>

      {activeTab === Tab.Developer && <Developer />}
      {activeTab === Tab.Project && <Project />}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-purple-500/30 w-full max-w-6xl max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-medium text-white">
                  Developer Rating Trends
                </h2>
                <button
                  onClick={() => setOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <DeveloperTrends />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
