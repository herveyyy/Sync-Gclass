import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  size?: "default" | "wide" | "narrow";
  className?: string;
}

export function PageContainer({
  children,
  size = "default",
  className = "",
}: PageContainerProps) {
  const sizeMap = {
    default: "max-w-4xl",
    wide: "max-w-6xl",
    narrow: "max-w-lg",
  };

  return (
    <div className="h-[calc(100vh-76px)] overflow-y-auto w-screen">
      <div
        className={`${sizeMap[size]}  mx-auto py-12 md:py-16 px-4 md:px-8 ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
