"use client";

import {
  motion,
  useMotionValue,
  useTransform,
  PanInfo,
} from "framer-motion";
import PostCard from "./PostCard";
import SwipeFeedbackLabel from "../atoms/SwipeFeedbackLabel";
import { BlogPost } from "@/lib/utils/mockData";

interface SwipeCardProps {
  post: BlogPost;
  onSwipe: (direction: "left" | "right") => void;
  isTop: boolean;
  index: number;
}

/**
 * A single draggable card in the swipe stack.
 * Handles drag physics, feedback labels, and exit animation.
 */
export default function SwipeCard({
  post,
  onSwipe,
  isTop,
  index,
}: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  // Feedback label transforms
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);
  const likeScale = useTransform(x, [50, 150], [0.5, 1.2]);
  const nopeScale = useTransform(x, [-150, -50], [1.2, 0.5]);

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x > 120) {
      onSwipe("right");
    } else if (info.offset.x < -120) {
      onSwipe("left");
    }
  };

  return (
    <motion.div
      style={{
        x,
        rotate,
        opacity: isTop ? opacity : 1,
        zIndex: 50 - index,
        scale: isTop ? 1 : 0.95 - index * 0.05,
        y: isTop ? 0 : index * 15,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      whileDrag={{ cursor: "grabbing" }}
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{
        scale: isTop ? 1 : 0.95,
        opacity: 1,
        y: isTop ? 0 : 15,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      exit={{
        x: x.get() > 0 ? 800 : -800,
        rotate: x.get() > 0 ? 45 : -45,
        opacity: 0,
        transition: { duration: 0.4, ease: "easeIn" },
      }}
      className="absolute w-[95vw] sm:w-full max-w-md cursor-grab active:cursor-grabbing"
    >
      {isTop && (
        <>
          <SwipeFeedbackLabel
            label="LIKE"
            opacity={likeOpacity}
            scale={likeScale}
            colorClasses="border-green-500 text-green-500"
            side="right"
          />
          <SwipeFeedbackLabel
            label="NOPE"
            opacity={nopeOpacity}
            scale={nopeScale}
            colorClasses="border-red-500 text-red-500"
            side="left"
          />
        </>
      )}

      {/* Card Content Wrapper to prevent unwanted interactions during drag */}
      <div className="relative pointer-events-none select-none">
        <PostCard post={post} />

        {/* Subtle gradient overlay to make it look "premium" */}
        <div className="absolute inset-0 rounded-xl bg-linear-to-tr from-transparent via-transparent to-white/10 pointer-events-none border-4 border-transparent" />
      </div>
    </motion.div>
  );
}
