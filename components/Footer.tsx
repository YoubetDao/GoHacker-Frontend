import { Github, Twitter } from "lucide-react";
import Image from "next/image";

const socialLinks = [
  {
    icon: <Twitter className="h-4 w-4" />,
    href: "https://x.com/GoHacker_AI",
    label: "Twitter",
  },

  {
    icon: <Github className="h-4 w-4" />,
    href: "https://github.com/YoubetDao",
    label: "GitHub",
  },
];

const exploreLinks = [
  {
    name: "YoubetDAO",
    href: "https://youbetdao.github.io/",
  },
  {
    name: "According.Work",
    href: "https://according.work",
  },
  {
    name: "Study Group",
    href: "https://youbetdao.github.io/weekly/",
  },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      {/* Main Footer Content */}
      <div className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Left - Logo */}
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Image src="/logo.svg" alt="GoHacker" width={28} height={28} />
              <span className="text-white font-bold text-xl">GoHacker</span>
            </div>

            {/* Right - Contact & Social */}
            <div className="flex items-center space-x-4">
              <span className="text-white/70 text-sm">Contact Us</span>
              <div className="flex items-center space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/70 hover:text-white transition-colors duration-200"
                    title={social.label}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className=" bg-black">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col md:flex-row justify-between items-center text-sm text-white/60">
              {/* Left - Copyright */}
              <div className="mb-2 md:mb-0">
                Copyright © 2025 GoHacker. Built by
                <a
                  href="https://github.com/YoubetDao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 transition-colors duration-200 ml-1"
                >
                  YoubetDAO
                </a>
              </div>

              {/* Right - Explore Links */}
              <div className="flex items-center space-x-1">
                <span>Explore:</span>
                {exploreLinks.map((link, index) => (
                  <span key={link.name} className="flex items-center">
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-400 hover:text-purple-300 transition-colors duration-200 ml-1"
                    >
                      {link.name}
                    </a>
                    {index < exploreLinks.length - 1 && (
                      <span className="mx-1 text-white/40">•</span>
                    )}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
