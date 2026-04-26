import React from "react";

interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="p-6 mb-12 text-[#93000a] bg-[#ffdad6] rounded-xl border-4 border-[#ba1a1a] shadow-[8px_8px_0px_0px_rgba(186,26,26,0.3)] font-bold text-xl">
      <span className="mr-3 text-2xl">⚠️</span> {message}
    </div>
  );
}
