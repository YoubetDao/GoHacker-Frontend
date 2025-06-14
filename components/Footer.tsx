import accordingLogo from "../assets/accordingWork.png";
import virtualLogo from "../assets/virtuals.svg";
import Image from "next/image";
import { Github, Twitter } from "lucide-react";

const partners = [
  {
    name: "According.Work",
    image: accordingLogo,
  },
  {
    name: "Virtual",
    image: virtualLogo,
  },
];

const socialLinks = [
  {
    icon: <Twitter className="h-5 w-5" />,
    href: "https://x.com/GoHacker_AI",
    label: "Twitter",
    color: "hover:text-blue-400",
  },
  {
    icon: <Github className="h-5 w-5" />,
    href: "https://github.com/YoubetDao",
    label: "GitHub",
    color: "hover:text-gray-300",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center space-x-2 text-2xl font-bold">
              About Us
            </div>

            <p className="max-w-md leading-relaxed text-[#ffffffbf]">
              GoHacker is a builder-led team creating tools for evaluating and
              rewarding real contributors in Web3. We’ve launched GitHub-based
              project analytics, open-source leaderboards, and LaunchPad
              incentives — and are proud winners of the Virtuals Hackathon Top
              10 and BNB AI Hack Tier 4 Award.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Partners</h3>
            <div className="flex flex-wrap flex-col gap-10">
              {partners.map((partner) => (
                <Image
                  key={partner.name}
                  src={partner.image}
                  alt={partner.name}
                  width={100}
                  height={100}
                />
              ))}
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">
              Contact Us
            </h3>
            <div className="space-y-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center space-x-3 text-[#ffffffbf] ${social.color} text-sm transition-all duration-200`}
                >
                  {social.icon}
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        {/* <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>© 2025YouBetDao. All rights reserved.</span>
            </div>

            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 animate-pulse text-red-500" />
              <span>for the Web3 community</span>
            </div>
          </div>
        </div> */}
      </div>
    </footer>
  );
}
