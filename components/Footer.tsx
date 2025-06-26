import { Github, Twitter } from "lucide-react";

const socialLinks = [
  {
    icon: <Twitter className="h-5 w-5" />,
    href: "https://x.com/GoHacker_AI",
    label: "Twitter",
    color: "hover:text-white",
  },
  {
    icon: <Github className="h-5 w-5" />,
    href: "https://github.com/YoubetDao",
    label: "GitHub",
    color: "hover:text-white",
  },
];

const links = [
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
    <footer id="footer" className="border-t border-white/10 bg-black py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex flex-col md:flex-row justify-between gap-4">
          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Explore</h3>
            <div className="flex flex-wrap flex-col gap-3 ">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#ffffffbf] hover:text-white"
                >
                  {link.name}
                </a>
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
        <div className="flex justify-end items-center space-x-2 text-sm ">
          © 2025 GoHacker. Built by developers, powered by
          <a
            href="https://github.com/YoubetDao"
            target="_blank"
            className="underline hover:text-white ml-2"
          >
            YoubetDAO
          </a>
          .
        </div>
      </div>
    </footer>
  );
}
