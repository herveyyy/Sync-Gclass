import React from "react";

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3;
  className?: string;
}

export function Heading({ children, level = 1, className = "" }: HeadingProps) {
  if (level === 1) {
    return (
      <h1
        className={`text-[40px] md:text-[56px] font-extrabold tracking-tight text-[#1d1c10] leading-[1.1] ${className}`}
      >
        {children}
      </h1>
    );
  }

  if (level === 2) {
    return (
      <h2
        className={`text-[32px] md:text-[40px] font-extrabold tracking-tight text-[#1d1c10] leading-[1.1] ${className}`}
      >
        {children}
      </h2>
    );
  }

  return (
    <h3 className={`text-xl md:text-2xl font-extrabold text-[#1d1c10] ${className}`}>
      {children}
    </h3>
  );
}
