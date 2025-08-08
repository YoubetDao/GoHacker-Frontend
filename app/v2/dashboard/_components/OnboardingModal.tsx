"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ChevronLeft,
  ChevronRight,
  Activity,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  Sparkles,
  Eye,
  X,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  content: React.ReactNode;
  highlightSelector?: string;
}

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingModal({
  isOpen,
  onClose,
}: OnboardingModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const router = useRouter();

  const handleProjectClick = (projectId: string) => {
    router.push(`/v2/project/${projectId}`);
    onClose();
  };

  const onboardingSteps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome to Dashboard",
      description:
        "Let's take a few minutes to explore the features of this dashboard",
      icon: <Sparkles className="w-6 h-6 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="text-6xl mb-4">🚀</div>
            <p className="text-muted-foreground">
              This is your central hub for tracking Virtuals ecosystem
              investments and discovering new opportunities. Let&apos;s explore each
              functional area together!
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "metrics",
      title: "Ecosystem Metrics",
      description: "View key data for the entire ecosystem",
      icon: <Activity className="w-6 h-6 text-green-500" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <Card className="bg-card/50 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-muted-foreground flex items-center">
                  <Activity className="w-3 h-3 mr-1" />
                  Successfully Launched
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg font-bold">125</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-muted-foreground flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" />
                  Total Market Cap
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg font-bold">$2.5M</div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs text-muted-foreground flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-lg font-bold">1,234</div>
              </CardContent>
            </Card>
          </div>
          <p className="text-sm text-muted-foreground">
            These cards display core ecosystem metrics including the number of
            successfully launched projects, total market cap, and participating
            users.
          </p>
        </div>
      ),
    },
    {
      id: "gainers-losers",
      title: "Top Gainers & Losers",
      description: "Real-time tracking of best and worst performing projects",
      icon: <TrendingUp className="w-6 h-6 text-emerald-500" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-card/50 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <div className="bg-green-500/10 p-1 rounded mr-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  Top Gainers (5)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div
                  className="flex justify-between items-center text-xs cursor-pointer hover:bg-muted/30 p-2 rounded transition-colors"
                  onClick={() => handleProjectClick("ai-agent-alpha-123")}
                >
                  <span className="flex items-center">
                    AI Agent Alpha
                    <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                  </span>
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                    +25.4%
                  </Badge>
                </div>
                <div
                  className="flex justify-between items-center text-xs cursor-pointer hover:bg-muted/30 p-2 rounded transition-colors"
                  onClick={() => handleProjectClick("virtual-bot-456")}
                >
                  <span className="flex items-center">
                    Virtual Bot
                    <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                  </span>
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                    +18.2%
                  </Badge>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card/50 border-border">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center">
                  <div className="bg-red-500/10 p-1 rounded mr-2">
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  </div>
                  Top Losers (3)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div
                  className="flex justify-between items-center text-xs cursor-pointer hover:bg-muted/30 p-2 rounded transition-colors"
                  onClick={() => handleProjectClick("meta-protocol-789")}
                >
                  <span className="flex items-center">
                    Meta Protocol
                    <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                  </span>
                  <Badge variant="destructive">-12.1%</Badge>
                </div>
                <div
                  className="flex justify-between items-center text-xs cursor-pointer hover:bg-muted/30 p-2 rounded transition-colors"
                  onClick={() => handleProjectClick("chain-guard-012")}
                >
                  <span className="flex items-center">
                    Chain Guard
                    <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                  </span>
                  <Badge variant="destructive">-8.7%</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
          <p className="text-sm text-muted-foreground">
            These lists show projects with the biggest price changes in the past
            24 hours, helping you identify market trends and investment
            opportunities.{" "}
            <strong>Click on any project to view its detail page!</strong>
          </p>
        </div>
      ),
    },
    {
      id: "live-projects",
      title: "Live Geneses",
      description: "Ongoing project launches",
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      content: (
        <div className="space-y-4">
          <Card
            className="bg-card/50 border-border cursor-pointer hover:bg-card/70 transition-colors"
            onClick={() => handleProjectClick("ai-mentor-345")}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                  AI
                </div>
                <div className="flex-1">
                  <CardTitle className="text-base flex items-center">
                    AI Mentor Protocol
                    <ExternalLink className="w-4 h-4 ml-2 opacity-50" />
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">$AIMENT</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                  Live
                </Badge>
                <div className="flex items-center text-xs font-mono">
                  <Clock className="w-3 h-3 mr-1" />
                  02d 14h 32m 15s
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  Participants:
                </span>
                <span className="font-medium">1,247</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground flex items-center">
                  <DollarSign className="w-3 h-3 mr-1" />
                  Points Pledged:
                </span>
                <span className="font-medium">892,341</span>
              </div>
            </CardContent>
          </Card>
          <p className="text-sm text-muted-foreground">
            This section shows currently ongoing project launches. You can view
            countdown timers, participant counts, and committed funds.{" "}
            <strong>Click on any project card to see detailed insights!</strong>
          </p>
        </div>
      ),
    },
    {
      id: "launched-projects",
      title: "Launched Projects",
      description: "List of successfully completed project launches",
      icon: <CheckCircle className="w-6 h-6 text-purple-500" />,
      content: (
        <div className="space-y-4">
          <div className="border rounded-lg overflow-hidden">
            <div className="bg-muted/30 p-2">
              <div className="grid grid-cols-4 gap-4 text-xs font-medium text-muted-foreground">
                <span>Project</span>
                <span className="text-center">Market Cap</span>
                <span className="text-center">24h Change</span>
                <span className="text-center">Holders</span>
              </div>
            </div>
            <div className="divide-y">
              <div
                className="p-2 grid grid-cols-4 gap-4 items-center text-sm cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => handleProjectClick("virtual-ai-678")}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    V
                  </div>
                  <div>
                    <div className="font-medium flex items-center">
                      Virtual AI
                      <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                    </div>
                    <div className="text-xs text-muted-foreground">$VAI</div>
                  </div>
                </div>
                <div className="text-center font-medium">$5.2M</div>
                <div className="text-center">
                  <Badge className="bg-green-500/10 text-green-500 border-green-500/20">
                    +12.5%
                  </Badge>
                </div>
                <div className="text-center font-medium">2,341</div>
              </div>
              <div
                className="p-2 grid grid-cols-4 gap-4 items-center text-sm cursor-pointer hover:bg-muted/30 transition-colors"
                onClick={() => handleProjectClick("chainbot-901")}
              >
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    C
                  </div>
                  <div>
                    <div className="font-medium flex items-center">
                      ChainBot
                      <ExternalLink className="w-3 h-3 ml-1 opacity-50" />
                    </div>
                    <div className="text-xs text-muted-foreground">$CBOT</div>
                  </div>
                </div>
                <div className="text-center font-medium">$3.8M</div>
                <div className="text-center">
                  <Badge variant="destructive">-5.2%</Badge>
                </div>
                <div className="text-center font-medium">1,876</div>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            This table shows all successfully launched projects with market cap,
            price changes, holder counts and more details.{" "}
            <strong>
              Click on any row to navigate to the project&apos;s detail page!
            </strong>
          </p>
        </div>
      ),
    },
    {
      id: "navigation",
      title: "Navigation & Interaction",
      description: "Learn how to use various dashboard features",
      icon: <Eye className="w-6 h-6 text-indigo-500" />,
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-sm">🖱️ Click Interactions</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Click project names to view detailed information</li>
                <li>• Click table headers to sort data</li>
                <li>• Hover over items for additional info</li>
                <li>• Use &quot;View&quot; buttons for quick navigation</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-sm">📊 Data Features</h4>
              <ul className="text-xs space-y-1 text-muted-foreground">
                <li>• Real-time price updates</li>
                <li>• 24-hour change tracking</li>
                <li>• Pagination for browsing projects</li>
                <li>• Interactive sorting capabilities</li>
              </ul>
            </div>
          </div>
          <div className="bg-blue-50 dark:bg-blue-950/20 p-3 rounded-lg">
            <h4 className="font-medium text-sm mb-2 flex items-center">
              <Sparkles className="w-4 h-4 mr-1 text-blue-500" />
              Pro Tips
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              Regularly check the dashboard to track performance of projects
              you&apos;re interested in. Use sorting features to quickly find the
              best performing investment opportunities.
            </p>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleProjectClick("demo-project-123")}
              className="mt-2 text-xs h-7"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Try navigating to a project detail page
            </Button>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Complete the onboarding
      setIsCompleted(true);
      localStorage.setItem("dashboard-onboarding-completed", "true");
      setTimeout(() => {
        onClose();
        setIsCompleted(false);
        setCurrentStep(0);
      }, 1500);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    localStorage.setItem("dashboard-onboarding-completed", "true");
    onClose();
    setCurrentStep(0);
  };

  const currentStepData = onboardingSteps[currentStep];
  const progress = ((currentStep + 1) / onboardingSteps.length) * 100;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        showCloseButton={false}
      >
        {isCompleted ? (
          <div className="text-center py-8">
            <div className="text-6xl mb-4">🎉</div>
            <DialogTitle className="text-2xl mb-2">
              Onboarding Complete!
            </DialogTitle>
            <DialogDescription className="text-base">
              You&apos;ve learned about the main dashboard features. Now you can
              start exploring!
            </DialogDescription>
          </div>
        ) : (
          <>
            <DialogHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {currentStepData.icon}
                  <div>
                    <DialogTitle className="text-left">
                      {currentStepData.title}
                    </DialogTitle>
                    <DialogDescription className="text-left">
                      {currentStepData.description}
                    </DialogDescription>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSkip}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Progress bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Step {currentStep + 1} of {onboardingSteps.length}
                  </span>
                  <span className="text-muted-foreground">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </DialogHeader>

            <div className="min-h-[300px] py-6">{currentStepData.content}</div>

            <DialogFooter className="flex justify-between">
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="flex items-center space-x-1"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </Button>
              </div>

              <div className="flex space-x-2">
                <Button variant="ghost" onClick={handleSkip}>
                  Skip Tour
                </Button>
                <Button
                  onClick={handleNext}
                  className="flex items-center space-x-1"
                >
                  <span>
                    {currentStep === onboardingSteps.length - 1
                      ? "Complete"
                      : "Next"}
                  </span>
                  {currentStep < onboardingSteps.length - 1 && (
                    <ChevronRight className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
