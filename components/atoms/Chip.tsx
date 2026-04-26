import React from "react";

interface ChipProps {
  children: React.ReactNode;
  color?: "green" | "yellow" | "blue";
  icon?: React.ReactNode;
  className?: string;
}

const colorMap = {
  green: "bg-[#b8fd4b] text-[#1d1c10]",
  yellow: "bg-[#f8e600] text-[#1d1c10]",
  blue: "bg-[#0266ff] text-white",
};

export function Chip({
  children,
  color = "green",
  icon,
  className = "",
}: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-5 py-2 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-extrabold uppercase tracking-wider ${colorMap[color]} ${className}`}
    >
      {icon}
      {children}
    </span>
  );
}
