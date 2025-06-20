"use client";
import { useState } from "react";
import Button from "./common/Button";
import { useRouter } from "next/navigation";

const navs = [
  {
    name: "Study Group",
    href: "https://youbetdao.github.io/weekly/",
  },
  {
    name: "According.Work",
    href: "https://according.work",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  return (
    <div className="border-b border-[#222222] py-2.5 px-4 md:px-10 fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm">
      <div className="max-w-[1200px] h-10 flex justify-between mx-auto items-center text-white relative">
        <div className="text-xl font-bold">GoHacker</div>

        {/* 桌面端导航 */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-8">
            {navs.map((nav) => (
              <div
                key={nav.name}
                onClick={() => {
                  window.open(nav.href, "_blank");
                }}
                className="text-base font-medium text-white cursor-pointer hover:underline"
              >
                {nav.name}
              </div>
            ))}
          </div>
          <Button
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            Go to App
          </Button>
        </div>

        {/* 移动端汉堡菜单按钮 */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-6 h-6 cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span
            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-0.5"
            }`}
          ></span>
          <span
            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
              isMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>
          <span
            className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
              isMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-0.5"
            }`}
          ></span>
        </button>
      </div>

      {/* 移动端导航菜单 */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-sm border-b border-[#222222] transition-all duration-300 ease-in-out ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="max-w-[1200px] mx-auto p-2 space-y-4">
          {navs.map((nav) => (
            <div
              key={nav.name}
              onClick={() => {
                window.open(nav.href, "_blank");
                setIsMenuOpen(false);
              }}
              className="text-base font-medium text-white cursor-pointer hover:text-gray-300 block py-2"
            >
              {nav.name}
            </div>
          ))}
          <div className="pt-2">
            <Button>Go to App</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
