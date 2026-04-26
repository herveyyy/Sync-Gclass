import React from "react";

interface DecorationsProps {
  preset?: "landing" | "onboarding";
}

export function Decorations({ preset = "landing" }: DecorationsProps) {
  if (preset === "onboarding") {
    return (
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-12 left-12 w-16 h-16 bg-[#f8e600] border-brutal rounded-full" />
        <div className="absolute top-32 right-20 w-12 h-12 bg-[#0266ff] border-brutal rotate-12" />
        <div className="absolute bottom-24 left-24 w-20 h-20 bg-[#b8fd4b] border-brutal rounded-xl rotate-[-8deg]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
      <div className="absolute top-8 left-8 w-24 h-24 bg-[#f8e600] border-brutal rounded-2xl rotate-12" />
      <div className="absolute top-48 right-12 w-16 h-16 bg-[#0266ff] border-brutal rounded-full" />
      <div className="absolute bottom-32 left-16 w-14 h-14 bg-[#b8fd4b] border-brutal rotate-45" />
      <div className="absolute bottom-12 right-24 w-32 h-32 bg-[#f8e600] border-brutal rounded-xl -rotate-6" />
      <div className="absolute top-1/3 left-1/4 w-10 h-10 bg-[#0266ff] border-brutal rounded-full" />
    </div>
  );
}
