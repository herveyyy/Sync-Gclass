"use client";

import { FiX, FiHeart, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import IconButton from "../atoms/IconButton";

interface SwipeControlsProps {
  onSkip: () => void;
  onLike: () => void;
}

/**
 * Action buttons (skip / like) and the swipe hint text.
 * Composed from IconButton atoms.
 */
export default function SwipeControls({ onSkip, onLike }: SwipeControlsProps) {
  return (
    <>
      {/* ACTION BUTTONS */}
      <div className="flex items-center gap-6 mt-2 sm:mt-4">
        <IconButton
          onClick={onSkip}
          color="text-red-500"
          hoverBg="hover:bg-red-50"
          aria-label="Skip post"
        >
          <FiX className="text-[24px] sm:text-[32px]" strokeWidth={3} />
        </IconButton>
        <IconButton
          onClick={onLike}
          color="text-green-500"
          hoverBg="hover:bg-green-50"
          aria-label="Like post"
        >
          <FiHeart className="text-[24px] sm:text-[32px]" strokeWidth={3} />
        </IconButton>
      </div>

      {/* SWIPE HINT */}
      <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-widest animate-pulse mt-4">
        <FiChevronLeft />
        Swipe left to skip • Swipe right to save
        <FiChevronRight />
      </div>
    </>
  );
}
