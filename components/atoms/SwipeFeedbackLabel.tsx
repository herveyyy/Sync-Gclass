"use client";

import { motion, MotionValue } from "framer-motion";

interface SwipeFeedbackLabelProps {
  label: string;
  opacity: MotionValue<number>;
  scale: MotionValue<number>;
  /** Tailwind border + text color class (e.g. "border-green-500 text-green-500") */
  colorClasses: string;
  /** Position: "left" or "right" side of the card */
  side: "left" | "right";
}

/**
 * Animated "LIKE" / "NOPE" feedback label that appears during card swipe.
 */
export default function SwipeFeedbackLabel({
  label,
  opacity,
  scale,
  colorClasses,
  side,
}: SwipeFeedbackLabelProps) {
  const positionClasses =
    side === "right"
      ? "right-5 sm:right-10 rotate-12"
      : "left-5 sm:left-10 -rotate-12";

  return (
    <motion.div
      style={{ opacity, scale }}
      className={`absolute top-10 sm:top-20 ${positionClasses} z-60 border-4 sm:border-8 ${colorClasses} font-black text-3xl sm:text-6xl p-2 sm:p-4 rounded-xl sm:rounded-2xl pointer-events-none bg-white shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000]`}
    >
      {label}
    </motion.div>
  );
}
