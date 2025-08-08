"use client";
import { useState, useEffect } from "react";
import DashboardMetrics from "./_components/DashboardMetrics";
import LaunchedProjects from "./_components/LaunchedProjects";
import LiveProjects from "./_components/LiveProjects";
import OnboardingModal from "./_components/OnboardingModal";
import { Button } from "@/components/ui/button";
import { HelpCircle } from "lucide-react";
export default function Dashboard() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    // 检查用户是否已经完成过引导
    const hasCompletedOnboarding = localStorage.getItem("dashboard-onboarding-completed");
    if (!hasCompletedOnboarding) {
      setShowOnboarding(true);
    }
  }, []);

  const handleShowOnboarding = () => {
    setShowOnboarding(true);
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Let&apos;s go, Hacker
            </h1>
            <p className="text-muted-foreground">
              Track your Virtuals ecosystem investments and discover new
              opportunities.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleShowOnboarding}
            className="flex items-center space-x-2"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Tutorial</span>
          </Button>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-12">
        {/* Top Summary Metrics */}
        <DashboardMetrics />

        {/* User Portfolio Section */}
        {/* <UserPortfolio /> */}

        {/* Live Projects Section */}
        <LiveProjects />

        {/* Successfully Launched Projects Section */}
        <LaunchedProjects />
      </div>

      {/* Onboarding Modal */}
      <OnboardingModal 
        isOpen={showOnboarding}
        onClose={() => setShowOnboarding(false)}
      />
    </div>
  );
}
