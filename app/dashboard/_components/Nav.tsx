"use client";
import Button from "@/components/common/Button";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Share } from "lucide-react";

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

  const handleShareToX = () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}`;
    window.open(`https://x.com/intent/tweet?url=${shareUrl}`, "_blank");
  };

  return (
    <div className="pt-5 pb-6  mb-6 flex items-center justify-between">
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
            className={`text-base font-bold text-white cursor-pointer items-center  flex gap-2 pb-1 ${
              isActive(nav.href) ? "border-b-1 border-[#fff]" : ""
            }`}
            onClick={() => {
              if (nav.name === "X Bot") {
                window.open("https://x.com/gohacker_ai", "_blank");
              } else if (!nav.isComingSoon) {
                router.push(nav.href);
              }
            }}
          >
            {nav.name}
            {nav.isComingSoon && (
              <div className=" h-[20px] px-1 rounded-full text-[12px] text-[#999999] bg-[rgba(28,13,71,0.5)] border ">
                Coming soon
              </div>
            )}
          </div>
        ))}
      </div>
      <div>
        <Button
          className="font-medium px-4 py-2 text-sm flex items-center gap-2 whitespace-nowrap bg-transparent border border-[rgba(151,151,151,0.54)]  hover:border-white/40 text-white hover:bg-white/5"
          onClick={handleShareToX}
        >
          <Share className="w-4 h-4" />
          Share to X
        </Button>
      </div>
    </div>
  );
}
