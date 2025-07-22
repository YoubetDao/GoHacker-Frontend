"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";

interface TwitterAvatarProps {
  twitterHandle: string;
  displayName: string;
  avatarUrl?: string | null;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const getSize = (size: "sm" | "md" | "lg") => {
  switch (size) {
    case "sm":
      return "h-8 w-8";
    case "md":
      return "h-12 w-12";
    case "lg":
      return "h-16 w-16";
    default:
      return "h-12 w-12";
  }
};

const getFallbackTextSize = (size: "sm" | "md" | "lg") => {
  switch (size) {
    case "sm":
      return "text-xs";
    case "md":
      return "text-xs";
    case "lg":
      return "text-sm";
    default:
      return "text-xs";
  }
};

export default function TwitterAvatar({
  twitterHandle,
  displayName,
  avatarUrl,
  size = "md",
  className = "",
}: TwitterAvatarProps) {
  const [imageError, setImageError] = useState(false);
  const [unavatarError, setUnavatarError] = useState(false);

  // 优先级：API提供的头像 > Unavatar > 首字母fallback
  const getAvatarSrc = () => {
    if (avatarUrl && !imageError) {
      return avatarUrl;
    }
    if (!unavatarError) {
      return `https://unavatar.io/twitter/${twitterHandle}`;
    }
    return null;
  };

  const avatarSrc = getAvatarSrc();
  const sizeClass = getSize(size);
  const textSizeClass = getFallbackTextSize(size);

  return (
    <Avatar className={`${sizeClass} ${className}`}>
      {avatarSrc && (
        <AvatarImage
          src={avatarSrc}
          alt={`${displayName} avatar`}
          onError={() => {
            if (avatarUrl && !imageError) {
              setImageError(true);
            } else {
              setUnavatarError(true);
            }
          }}
        />
      )}
      <AvatarFallback className={`bg-gradient-to-br from-orange-400 to-pink-500 text-white font-bold ${textSizeClass}`}>
        {displayName?.charAt(0)?.toUpperCase() || twitterHandle?.charAt(0)?.toUpperCase() || "U"}
      </AvatarFallback>
    </Avatar>
  );
}