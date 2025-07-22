"use client";
import { Home, MessageSquare, Trophy } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

const navigation = [
  { title: "Dashboard", url: "/dashboard", icon: Home },
  { title: "Leaderboard", url: "/leaderboard", icon: Trophy },
  { title: "Yapper", url: "/yapper", icon: MessageSquare },
  // { title: "Virtuals Projects", url: "/virtuals", icon: Coins },
  // { title: "My Portfolio", url: "/portfolio", icon: Briefcase },
  // { title: "Alerts", url: "/alerts", icon: Bell },
  // { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();

  const getNavCls = (url: string) => {
    const isActive = pathname === url;

    return isActive
      ? "bg-primary text-white font-bold shadow-sm"
      : "text-primary-foreground font-bold hover:bg-primary/50 transition-colors";
  };
  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible="icon">
      <SidebarHeader className="border-b border-border p-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8">
            <Image src="/logo.svg" alt="logo" width={32} height={32} />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-xl font-bold text-white">GoHacker</h1>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem className="text-white" key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <Link href={item.url} className={getNavCls(item.url)}>
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
