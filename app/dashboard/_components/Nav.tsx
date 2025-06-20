"use client";
import Button from "@/components/common/Button";
import Image from "next/image";
import { usePathname } from "next/navigation";

const NAVS = [
  {
    name: "Leaderboard",
    href: "/dashboard",
  },
  {
    name: "Launch Pad",
    href: "/launchpad",
  },
];
export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <div className="pt-5 pb-6  mb-6 flex justify-between items-center">
      <div className="text-xl font-semibold flex items-center gap-3">
        <Image src="/logo.svg" alt="GoHacker" width={28} height={28} />
        GoHacker
      </div>

      <div className="flex items-center gap-16">
        {NAVS.map((nav) => (
          <div
            key={nav.name}
            className={`text-base font-bold text-white cursor-pointer  pb-1 ${
              isActive(nav.href) ? "border-b-1 border-[#fff]" : ""
            }`}
          >
            {nav.name}
          </div>
        ))}
      </div>
      <Button className="font-medium rounded-full">Connect Wallet</Button>
    </div>
  );
}
