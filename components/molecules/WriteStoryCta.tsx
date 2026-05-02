import React from "react";
import { FiPlus } from "react-icons/fi";

interface WriteStoryCtaProps {
  /** Optional compact mode for mobile fixed bar */
  compact?: boolean;
  className?: string;
}

export default function WriteStoryCta({
  compact = false,
  className = "",
}: WriteStoryCtaProps) {
  const padding = compact ? "p-2" : "p-6";
  const shadow = compact
    ? "shadow-[6px_6px_0px_#ffec00]"
    : "shadow-[10px_10px_0px_#ffec00]";
  const titleSize = compact ? "text-lg" : "text-xl";
  const circleSize = compact ? "w-11 h-11" : "w-12 h-12";

  return (
    <div
      className={`bg-black text-white border-4 border-black rounded-2xl ${padding} ${shadow} flex items-center justify-between group cursor-pointer overflow-hidden active:translate-x-[2px] active:translate-y-[2px] transition-all ${className}`}
    >
      <div className="z-10">
        <h4 className={`${titleSize} font-black uppercase italic`}>
          Write a Story
        </h4>
      </div>
      <div
        className={`${circleSize} bg-[#ffec00] border-4 border-white rounded-full flex items-center justify-center text-black group-hover:rotate-12 transition-transform shrink-0`}
      >
        <span className="text-xl font-black items-center justify-center flex">
          <FiPlus strokeWidth={3} />
        </span>
      </div>
    </div>
  );
}
