import DashboardMetrics from "./_components/DashboardMetrics";
import LaunchedProjects from "./_components/LaunchedProjects";
import LiveProjects from "./_components/LiveProjects";
import UserPortfolio from "./_components/UserPortfolio";

export default function VirtualsTracker() {
  return (
    <div className="p-6 space-y-8">
      {/* Welcome Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back, Developer! 👋
        </h1>
        <p className="text-muted-foreground">
          Track your Virtuals ecosystem investments and discover new
          opportunities.
        </p>
      </div>

      {/* Top Summary Metrics */}
      <DashboardMetrics />

      {/* User Portfolio Section */}
      <UserPortfolio />

      {/* Live Projects Section */}
      <LiveProjects />

      {/* Successfully Launched Projects Section */}
      <LaunchedProjects />
    </div>
  );
}
