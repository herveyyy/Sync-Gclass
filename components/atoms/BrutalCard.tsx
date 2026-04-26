import React from "react";

interface BrutalCardProps {
  children: React.ReactNode;
  bgColor?: string;
  className?: string;
  shadowSize?: "sm" | "md" | "lg";
  hasHover?: boolean;
}

export function BrutalCard({
  children,
  bgColor = "bg-white",
  className = "",
  shadowSize = "md",
  hasHover = false,
}: BrutalCardProps) {
  const shadowMap = {
    sm: "shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    md: "shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
    lg: "shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]",
  };

  const hoverStyle = hasHover
    ? "transition-transform hover:-translate-y-1 hover:-translate-x-1"
    : "";

  return (
    <div
      className={`border-brutal rounded-xl p-8 ${bgColor} ${shadowMap[shadowSize]} ${hoverStyle} ${className}`}
    >
      {children}
    </div>
  );
}
