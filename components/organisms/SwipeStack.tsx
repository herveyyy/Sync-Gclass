"use client";

import React, { useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  PanInfo,
} from "framer-motion";
import PostCard from "../molecules/PostCard";
import { BlogPost } from "@/lib/utils/mockData";
import {
  FiRefreshCw,
  FiHeart,
  FiX,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";

interface SwipeStackProps {
  posts: BlogPost[];
}

export default function SwipeStack({ posts: initialPosts }: SwipeStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: "left" | "right") => {
    setCurrentIndex((prev) => prev + 1);
  };

  const resetStack = () => {
    setCurrentIndex(0);
  };

  const visiblePosts = initialPosts.slice(currentIndex, currentIndex + 2);

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-6 w-full h-full py-2 sm:py-6">
      {/* HEADER / STATS */}
      <div className="flex items-center justify-between w-full max-w-2xl px-4">
        <div className="flex flex-col">
          <h2 className="text-lg sm:text-2xl font-black text-black uppercase tracking-tighter">
            News Feed
          </h2>
          <p className="text-gray-600 font-bold text-[10px] sm:text-sm">
            Swipe to discover new blogs
          </p>
        </div>
        <div className="bg-black text-white px-3 py-1 sm:px-4 sm:py-2 rounded-lg font-black text-sm sm:text-lg shadow-[3px_3px_0px_#ffec00] sm:shadow-[4px_4px_0px_#ffec00]">
          {currentIndex} / {initialPosts.length}
        </div>
      </div>

      <div className="relative w-full max-w-2xl flex-1 min-h-[300px] flex items-center justify-center perspective-1000">
        <AnimatePresence mode="popLayout">
          {currentIndex >= initialPosts.length ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="flex flex-col items-center justify-center p-12 border-4 border-black bg-white rounded-xl shadow-[8px_8px_0px_#000] text-center w-full max-w-md"
            >
              <div className="w-20 h-20 bg-[#ffec00] border-4 border-black rounded-full flex items-center justify-center mb-6 shadow-[4px_4px_0px_#000]">
                <FiRefreshCw size={40} className="text-black" />
              </div>
              <h2 className="text-3xl font-black mb-4 text-black uppercase">
                All caught up!
              </h2>
              <p className="text-gray-700 mb-8 font-bold leading-tight">
                You've swiped through all the latest stories from the community.
              </p>
              <button
                onClick={resetStack}
                className="group flex items-center gap-3 px-8 py-4 bg-secondary text-white border-4 border-black rounded-xl shadow-[6px_6px_0px_#000] font-black uppercase tracking-widest active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_#000] transition-all hover:bg-secondary-dim"
              >
                <FiRefreshCw className="group-hover:rotate-180 transition-transform duration-500" />
                Refresh Feed
              </button>
            </motion.div>
          ) : (
            visiblePosts.map((post, index) => {
              const isTop = index === 0;
              return (
                <SwipeCard
                  key={post.id}
                  post={post}
                  onSwipe={handleSwipe}
                  isTop={isTop}
                  index={index}
                />
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* CONTROLS */}
      {currentIndex < initialPosts.length && (
        <div className="flex items-center gap-6 mt-2 sm:mt-4">
          <button
            onClick={() => handleSwipe("left")}
            className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-white border-4 border-black rounded-full shadow-[4px_4px_0px_#000] text-red-500 hover:bg-red-50 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000]"
          >
            <FiX className="text-[24px] sm:text-[32px]" strokeWidth={3} />
          </button>
          <button
            onClick={() => handleSwipe("right")}
            className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-white border-4 border-black rounded-full shadow-[4px_4px_0px_#000] text-green-500 hover:bg-green-50 transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000]"
          >
            <FiHeart className="text-[24px] sm:text-[32px]" strokeWidth={3} />
          </button>
        </div>
      )}

      {/* SWIPE HINT */}
      {currentIndex < initialPosts.length && (
        <div className="flex items-center gap-2 text-gray-500 font-bold text-xs uppercase tracking-widest animate-pulse mt-4">
          <FiChevronLeft />
          Swipe left to skip • Swipe right to save
          <FiChevronRight />
        </div>
      )}
    </div>
  );
}

interface SwipeCardProps {
  post: BlogPost;
  onSwipe: (direction: "left" | "right") => void;
  isTop: boolean;
  index: number;
}

function SwipeCard({ post, onSwipe, isTop, index }: SwipeCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -150, 0, 150, 200], [0, 1, 1, 1, 0]);

  // Feedback labels
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-150, -50], [1, 0]);
  const likeScale = useTransform(x, [50, 150], [0.5, 1.2]);
  const nopeScale = useTransform(x, [-150, -50], [1.2, 0.5]);

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
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
          <motion.div
            style={{ opacity: likeOpacity, scale: likeScale }}
            className="absolute top-10 sm:top-20 right-5 sm:right-10 z-60 border-4 sm:border-8 border-green-500 text-green-500 font-black text-3xl sm:text-6xl p-2 sm:p-4 rounded-xl sm:rounded-2xl rotate-12 pointer-events-none bg-white shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000]"
          >
            LIKE
          </motion.div>
          <motion.div
            style={{ opacity: nopeOpacity, scale: nopeScale }}
            className="absolute top-10 sm:top-20 left-5 sm:left-10 z-60 border-4 sm:border-8 border-red-500 text-red-500 font-black text-3xl sm:text-6xl p-2 sm:p-4 rounded-xl sm:rounded-2xl -rotate-12 pointer-events-none bg-white shadow-[4px_4px_0px_#000] sm:shadow-[8px_8px_0px_#000]"
          >
            NOPE
          </motion.div>
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
