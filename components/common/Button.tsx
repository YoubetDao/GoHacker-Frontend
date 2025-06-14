import React from "react";

interface ButtonProps {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  children,
  onClick,
  className = "",
  disabled = false,
}) => {
  const baseStyles = "px-3 py-2 rounded-[6px] transition-all duration-200";

  const variantStyles = {
    primary: "bg-[rgb(129,74,200)] hover:bg-[rgb(139,84,210)] text-white",
    secondary: "bg-black hover:bg-gray-800 text-white border border-white/10",
  };

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${className} ${
        disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Button;
