"use client";
import Button from "@/components/common/Button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Share, Menu, X } from "lucide-react";
import { useState } from "react";

const NAVS = [
  {
    name: "Leaderboard",
    href: "/dashboard",
  },
  {
    name: "X Bot",
    href: "/x-bot",
  },
  {
    name: "Launch Pad",
    href: "/launchpad",
    isComingSoon: true,
  },
];
export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleShareToX = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}`;
    window.open(`https://x.com/intent/tweet?url=${shareUrl}`, "_blank");
  };

  const handleNavClick = (nav: typeof NAVS[0]) => {
    if (nav.name === "X Bot") {
      window.open("https://x.com/gohacker_ai", "_blank");
    } else if (!nav.isComingSoon) {
      router.push(nav.href);
    }
    setIsMenuOpen(false); // 关闭菜单
  };

  return (
    <>
      {/* 导航栏 */}
      <div className="pt-5 pb-6 mb-6">
        {/* 桌面版导航 */}
        <div className="hidden md:flex items-center justify-between">
          <div
            className="text-xl font-semibold flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src="/logo.svg" alt="GoHacker" width={28} height={28} />
            GoHacker
          </div>

          <div className="flex items-center gap-16 absolute left-1/2 transform -translate-x-1/2">
            {NAVS.map((nav) => (
              <div
                key={nav.name}
                className={`text-base font-bold text-white cursor-pointer items-center flex gap-2 pb-1 ${
                  isActive(nav.href) ? "border-b-1 border-[#fff]" : ""
                }`}
                onClick={() => handleNavClick(nav)}
              >
                {nav.name}
                {nav.isComingSoon && (
                  <div className="h-[20px] px-1 rounded-full text-[12px] text-[#999999] bg-[rgba(28,13,71,0.5)] border">
                    Coming soon
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div>
            <Button
              className="font-medium px-4 py-2 text-sm flex items-center gap-2 whitespace-nowrap bg-transparent border border-[rgba(151,151,151,0.54)] hover:border-white/40 text-white hover:bg-white/5"
              onClick={handleShareToX}
            >
              <Share className="w-4 h-4" />
              Share to X
            </Button>
          </div>
        </div>

        {/* 移动版导航 */}
        <div className="flex md:hidden items-center justify-between">
          <div
            className="text-xl font-semibold flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image src="/logo.svg" alt="GoHacker" width={28} height={28} />
            GoHacker
          </div>

          <div className="flex items-center gap-3">
            <Button
              className="font-medium px-3 py-2 text-sm flex items-center gap-2 whitespace-nowrap bg-transparent border border-[rgba(151,151,151,0.54)] hover:border-white/40 text-white hover:bg-white/5"
              onClick={handleShareToX}
            >
              <Share className="w-4 h-4" />
            </Button>
            
            <button
              className="text-white p-2 hover:bg-white/10 rounded-md transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 移动端抽屉菜单 */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* 背景遮罩 */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />
          
          {/* 抽屉内容 */}
          <div className="fixed top-0 right-0 h-full w-80 bg-[rgba(10,15,28,0.95)] backdrop-blur-md border-l border-[rgba(151,151,151,0.3)] shadow-2xl">
            <div className="p-6">
              {/* 抽屉头部 */}
              <div className="flex items-center justify-between mb-8">
                <div className="text-xl font-semibold flex items-center gap-3">
                  <Image src="/logo.svg" alt="GoHacker" width={28} height={28} />
                  GoHacker
                </div>
                <button
                  className="text-white p-2 hover:bg-white/10 rounded-md transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* 导航项 */}
              <nav className="space-y-4">
                {NAVS.map((nav) => (
                  <div
                    key={nav.name}
                    className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${
                      isActive(nav.href) 
                        ? "bg-[rgba(129,74,200,0.2)] border border-[rgba(129,74,200,0.3)]" 
                        : "hover:bg-white/5"
                    } ${nav.isComingSoon ? "opacity-60 cursor-not-allowed" : ""}`}
                    onClick={() => handleNavClick(nav)}
                  >
                    <span className="text-lg font-medium text-white">
                      {nav.name}
                    </span>
                    {nav.isComingSoon && (
                      <div className="h-[20px] px-2 rounded-full text-[12px] text-[#999999] bg-[rgba(28,13,71,0.5)] border flex items-center">
                        Coming soon
                      </div>
                    )}
                  </div>
                ))}
              </nav>

              {/* 分享按钮 */}
              <div className="mt-8 pt-6 border-t border-[rgba(151,151,151,0.3)]">
                <Button
                  className="w-full font-medium px-4 py-3 text-base flex items-center justify-center gap-3 bg-transparent border border-[rgba(151,151,151,0.54)] hover:border-white/40 text-white hover:bg-white/5"
                  onClick={handleShareToX}
                >
                  <Share className="w-5 h-5" />
                  Share to X
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
