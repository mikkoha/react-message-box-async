import React, { ReactNode, useState } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  variant?: "secondary" | "primary" | "danger";
  style?: React.CSSProperties;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  style = {},
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyle: React.CSSProperties = {
    display: "inline-flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "0.375rem", // rounded-md
    border: "0px", // border
    padding: "0.5rem 0.75rem", // px-3 py-2
    fontSize: "0.875rem", // text-sm
    fontWeight: 600, // font-semibold
    cursor: "pointer",
  };

  const typeStyles: Record<
    "secondary" | "primary" | "danger",
    React.CSSProperties
  > = {
    primary: {
      backgroundColor: isHovered ? "#3b82f6" : "#2563eb", // bg-blue-600, hover:bg-blue-500
      color: "#ffffff", // text-white
    },
    danger: {
      backgroundColor: isHovered ? "#dc2626" : "#ef4444", // bg-red-600, hover:bg-red-500
      color: "#ffffff", // text-white
    },
    secondary: {
      backgroundColor: isHovered ? "#f9fafb" : "#ffffff", // bg-white, hover:bg-gray-50
      color: "#111827", // text-gray-900
      border: "1px solid #d1d5db", // border-gray-300
    },
  };

  return (
    <button
      onClick={onClick}
      style={{ ...baseStyle, ...typeStyles[variant], ...style }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...props}
    >
      {children}
    </button>
  );
};
