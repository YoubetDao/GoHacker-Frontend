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
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2 ">
          <span className="font-bold">Explore:</span>
          
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-medium hover:underline"
            >
              {link.name}
            </a>
          ))}
        </div>
        <div className="flex gap-2 ">
          <span className="font-bold">Contact:</span>
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-medium hover:underline"
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
      <div className="flex justify-end mt-4">© 2025 GoHacker. Built by developers, powered by YoubetDAO</div>
    </div>
  );
}
