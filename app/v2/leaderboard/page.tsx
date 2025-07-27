"use client";
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

export default function Leaderboard() {
  const [selectedStatus, setSelectedStatus] = useState("upcoming");
  const [dateFilter, setDateFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("developer");
  return (
    <div className="p-6">
      {/* <div className="mb-8">
        <div className="text-3xl font-bold text-foreground mb-2">
          Builder Score
        </div>
      </div> */}
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

              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
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
    </div>
  );
}
