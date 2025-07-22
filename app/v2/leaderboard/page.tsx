"use client";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import DeveloperTable from "./_components/DeveloperTable";
import ProjectTable from "./_components/ProjectTable";
import { Send } from "lucide-react";

export default function Leaderboard() {
  const [selectedStatus, setSelectedStatus] = useState("upcoming");
  const [dateFilter, setDateFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("developer");
  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="text-3xl font-bold text-foreground mb-2">
          GitHub Activity Leaderboard
        </div>
      </div>
      <Card className="bg-gradient-card border-border/50">
        <div className="p-6">
          <Tabs
            defaultValue="developer"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <div className="flex items-center justify-between mb-6">
              <TabsList>
                <TabsTrigger value="developer">Developer</TabsTrigger>
                <TabsTrigger value="project">Project</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-3">
                {activeTab === "project" && selectedStatus === "upcoming" && (
                  <Select value={dateFilter} onValueChange={setDateFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Filter by date" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        { value: "all", label: "All Time" },
                        { value: "1", label: "Within 1 Day" },
                        { value: "3", label: "Within 3 Days" },
                        { value: "7", label: "Within 7 Days" },
                        { value: "14", label: "Within 14 Days" },
                        { value: "30", label: "Within 30 Days" },
                      ].map((option) => (
                        <SelectItem
                          key={option.value}
                          value={option.value}
                          className="text-white hover:bg-[rgba(129,74,200,0.3)] cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            {option.label}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}

                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="live">Live</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="developer">
              <DeveloperTable statusFilter={selectedStatus} />
            </TabsContent>
            <TabsContent value="project">
              <ProjectTable
                statusFilter={selectedStatus}
                dateFilter={dateFilter}
              />
            </TabsContent>
          </Tabs>
        </div>
      </Card>
      
      {/* 社交链接 */}
      <div className="flex justify-center items-center gap-6 py-8">
        <span className="text-muted-foreground text-sm">Follow us:</span>
        <div className="flex items-center gap-4">
          <a
            href="https://x.com/GoHacker_AI"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <span className="text-sm">Twitter</span>
          </a>
          <a
            href="https://t.me/gohacker_club"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
          >
            <Send className="w-5 h-5" />
            <span className="text-sm">Telegram</span>
          </a>
          <a
            href="https://github.com/YoubetDao"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            <span className="text-sm">GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
