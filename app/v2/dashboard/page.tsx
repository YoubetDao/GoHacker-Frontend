import DashboardMetrics from "./_components/DashboardMetrics";
import LaunchedProjects from "./_components/LaunchedProjects";
import LiveProjects from "./_components/LiveProjects";
export default function Dashboard() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Let’s go, Hacker
        </h1>
        <p className="text-muted-foreground">
          Track your Virtuals ecosystem investments and discover new
          opportunities.
        </p>
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
    </div>
  );
}
