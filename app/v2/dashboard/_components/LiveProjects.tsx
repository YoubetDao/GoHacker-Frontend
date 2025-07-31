"use client";
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, Lock, DollarSign } from "lucide-react";
import { getLiveProjects, LiveProject } from "@/service";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useRouter } from "next/navigation"
function CountdownTimer({ endTime }: { endTime: Date }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = endTime.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <div className="flex items-center space-x-1 text-xs font-mono">
      <Clock className="w-3 h-3" />
      <span>
        {String(timeLeft.days).padStart(2, "0")}d{" "}
        {String(timeLeft.hours).padStart(2, "0")}h{" "}
        {String(timeLeft.minutes).padStart(2, "0")}m{" "}
        {String(timeLeft.seconds).padStart(2, "0")}s
      </span>
    </div>
  );
}

export default function LiveProjects() {
  const [liveProjectsData, setLiveProjectsData] = useState<LiveProject[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchLiveProjects = async () => {
      setLoading(true);
      try {
        const liveProjects = await getLiveProjects();
        if (liveProjects) {
          setLiveProjectsData(liveProjects.data);
        }
      } catch (error) {
        console.error("Failed to fetch live projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLiveProjects();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-foreground">Live Geneses</h2>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index} className="bg-card border-border">
              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-muted animate-pulse"></AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded animate-pulse"></div>
                    <div className="h-3 bg-muted rounded animate-pulse w-20"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <div className="w-12 h-5 bg-muted rounded animate-pulse"></div>
                  <div className="w-24 h-4 bg-muted rounded animate-pulse"></div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <div className="w-20 h-3 bg-muted rounded animate-pulse"></div>
                    <div className="w-16 h-3 bg-muted rounded animate-pulse"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-24 h-3 bg-muted rounded animate-pulse"></div>
                    <div className="w-20 h-3 bg-muted rounded animate-pulse"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-28 h-3 bg-muted rounded animate-pulse"></div>
                    <div className="w-16 h-3 bg-muted rounded animate-pulse"></div>
                  </div>
                </div>
                <div className="h-8 bg-muted rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : liveProjectsData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            <Lock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No Genesis Launches Available
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            There are currently no live genesis launches. Check back later for
            new project opportunities.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveProjectsData.map((project) => (
            <Card
              key={project.tokenSymbol}
              className="bg-card border-border hover:bg-card/80 transition-colors relative"
            >
              {/* {project.isHot && (
              <div className="absolute top-3 right-3">
                <Badge className="bg-orange-500/10 text-orange-500 border-orange-500/20">
                  <Flame className="w-3 h-3 mr-1" />
                  Hot
                </Badge>
              </div>
            )} */}

              <CardHeader className="pb-3">
                <div className="flex items-center space-x-3">
                  {/* <div className="text-2xl">{project.tokenLogoUrl}</div> */}
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={project.tokenLogoUrl} />
                    <AvatarFallback className="text-sm font-bold bg-muted text-muted-foreground">
                      {project.tokenSymbol.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <CardTitle className="text-lg text-foreground">
                      {project.projectName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      ${project.tokenSymbol}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <Badge
                    variant={"default"}
                    className={
                      "bg-green-500/10 text-green-500 border-green-500/20"
                    }
                  >
                    Live
                  </Badge>
                  <CountdownTimer endTime={new Date(project.endTime)} />
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="space-y-2">
                  {/* <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Unlocking in:
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {project.daysUntilUnlock} days
                  </span>
                </div> */}

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground flex items-center">
                      <Users className="w-3 h-3 mr-1" />
                      Participants:
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {project.participantCount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      Points Pledged:
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {project.pointsPledged}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground flex items-center">
                      <DollarSign className="w-3 h-3 mr-1" />
                      $VIRTUAL Committed:
                    </span>
                    <span className="text-sm font-medium text-foreground">
                      {project.virtualCommitted}
                    </span>
                  </div>

                  {/* <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Oversubscribed:
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      project.oversubscription > 100
                        ? "text-green-500"
                        : "text-foreground"
                    }`}
                  >
                    {project.oversubscription}%
                  </span>
                </div> */}
                </div>

                {/* {project.oversubscription > 100 && (
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${Math.min(project.oversubscription, 300) / 3}%`,
                    }}
                  ></div>
                </div>
              )} */}

                <Button
                  variant="outline"
                  className="w-full mt-4 opacity-50 cursor-pointer"
                  onClick={() => {
                    router.push(`/v2/project/${project.virtualId}`);
                  }}
                >
                  <Lock className="w-4 h-4 mr-2" />
                  View Insights
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
