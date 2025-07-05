import Image from "next/image";
import x from "@/assets/svg/x.svg";
import github from "@/assets/svg/github.svg";
const navLinks = [
  {
    name: "Home",
    href: "#home",
  },
  {
    name: "Features",
    href: "#features",
  },
  {
    name: "App",
    href: "/dashboard",
  },
];

const socialLinks = [
  {
    icon: <Image src={x} alt="x" width={18} height={18} />,
    href: "https://x.com/GoHacker_AI",
    label: "Twitter",
  },

  {
    icon: <Image src={github} alt="github" width={18} height={18} />,
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
    <footer className="bg-black border-t border-[#222222] py-6">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Left Section - Brand & Copyright */}
          <div className="flex flex-col items-center lg:items-start space-y-5">
            <div className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="GoHacker" width={28} height={28} />
              <span className="text-white font-bold text-xl">GoHacker</span>
            </div>
            <div className="text-white/50 text-sm text-center lg:text-left">
              <div>
                Copyright © 2025 GoHacker. Built by
                <a
                  href="https://github.com/YoubetDao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-white underline"
                >
                  YoubetDAO
                </a>
              </div>
            </div>
          </div>

          {/* Center Section - Navigation */}
          <div className="flex flex-col items-center space-y-5">
            <nav className="flex items-center space-x-10">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/90 hover:text-white text-base "
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="flex items-center space-x-1 text-white/50 text-sm">
              <span>Explore:</span>
              {exploreLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-white transition-colors duration-200 ml-2.5"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right Section - Contact & Social */}
          <div className="flex flex-col items-center lg:items-end space-y-4">
            <span className="text-white/95 text-base ">Contact Us</span>
            <div className="flex items-center space-x-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/70 hover:text-white transition-colors duration-200 hover:scale-110 transform"
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
