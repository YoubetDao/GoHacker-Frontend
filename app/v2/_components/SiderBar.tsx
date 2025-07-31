"use client";
import {
  Home,
  MessageSquare,
  Trophy,
  Send as SendIcon,
  Briefcase,
  Search,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import x from "@/assets/svg/x.svg";
import github from "@/assets/svg/github.svg";

const socialLinks = [
  {
    icon: <Image src={x} alt="x" width={18} height={18} />,
    href: "https://x.com/GoHacker_AI",
    label: "Twitter",
  },
  {
    icon: <SendIcon size={18} />,
    href: "https://t.me/gohacker_club",
    label: "Telegram",
  },
  {
    icon: <Image src={github} alt="github" width={18} height={18} />,
    href: "https://github.com/YoubetDao",
    label: "GitHub",
  },
];

const navigation = [
  { title: "Dashboard", url: "/v2/dashboard", icon: Home },
  { title: "BuildScore", url: "/v2/leaderboard", icon: Trophy },
  { title: "Yapper", url: "/v2/yapper", icon: MessageSquare },
  { title: "My Portfolio", url: "#", icon: Briefcase, isComingSoon: true },
  { title: "Agentic", url: "#", icon: Search, isComingSoon: true },
  { title: "LaunchPad", url: "#", icon: Zap, isComingSoon: true },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const pathname = usePathname();
  const router = useRouter();

  const getNavCls = (url: string) => {
    const isActive = pathname === url;

    return isActive
      ? "bg-[rgba(255,255,255,0.12)]  text-white font-medium rounded-md"
      : "text-white font-medium hover:bg-[rgba(255,255,255,0.08)] rounded-md transition-colors";
  };
  return (
    <Sidebar
      className={`${collapsed ? "w-16" : "w-64"}  border-r-0`}
      collapsible="icon"
    >
      <SidebarHeader className=" pt-6 pb-2 px-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8">
            <Image src="/logo.svg" alt="logo" width={32} height={32} />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-2xl font-bold text-white">GoHacker</h1>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="p-3">
        <SidebarGroup className="p-0">
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigation.map((item) => (
                <SidebarMenuItem className="text-white" key={item.title}>
                  <SidebarMenuButton asChild className="w-full">
                    <Link
                      href={item.url}
                      className={`${getNavCls(
                        item.url
                      )} flex items-center h-11 `}
                      onClick={() => {
                        router.push(item.url);
                      }}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!collapsed && (
                        <span className="ml-3  font-semibold">
                          {item.title}
                        </span>
                      )}
                      {item.isComingSoon && (
                        <div className=" h-[20px] px-1 rounded-full text-[12px] text-[#999999] bg-[rgba(28,13,71,0.5)] border ">
                          Coming soon
                        </div>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 社交媒体链接 */}
      <SidebarFooter>
        <div className="flex items-center justify-start space-x-4 px-2">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 hover:text-white transition-colors"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
