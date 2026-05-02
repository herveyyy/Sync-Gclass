"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import { BlogPost } from "@/lib/utils/mockData";
import SwipeCard from "../molecules/SwipeCard";
import SwipeControls from "../molecules/SwipeControls";
import EmptyFeedCard from "../molecules/EmptyFeedCard";
import WriteStoryCta from "../molecules/WriteStoryCta";

interface SwipeStackProps {
  posts: BlogPost[];
  onToggleSidebar?: () => void;
}

export default function SwipeStack({
  posts: initialPosts,
  onToggleSidebar,
}: SwipeStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleSwipe = (direction: "left" | "right") => {
    setCurrentIndex((prev) => prev + 1);
  };

  const resetStack = () => {
    setCurrentIndex(0);
  };

  const visiblePosts = initialPosts.slice(currentIndex, currentIndex + 2);
  const hasMore = currentIndex < initialPosts.length;

  return (
    <div className="flex flex-col items-center gap-2 sm:gap-6 w-full h-full py-2 sm:py-6">
      {/* MOBILE HEADER BAR */}
      <div className="w-full flex items-center gap-3 px-2 lg:hidden">
        <div className="flex-1 min-w-0">
          <WriteStoryCta compact />
        </div>
        {onToggleSidebar && (
          <button
            onClick={onToggleSidebar}
            className="shrink-0 flex items-center gap-2 px-4 py-2 bg-[#ffec00] border-4 border-black rounded-xl shadow-[4px_4px_0px_#000] font-black text-sm uppercase tracking-wider active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] transition-all hover:bg-yellow-300"
          >
            <FiMenu size={18} strokeWidth={3} />
          </button>
        )}
      </div>
      {/* CARD STACK */}
      <div className="relative w-full max-w-2xl flex-1 min-h-[300px] flex items-center justify-center perspective-1000">
        <AnimatePresence mode="popLayout">
          {!hasMore ? (
            <EmptyFeedCard onRefresh={resetStack} />
          ) : (
            visiblePosts.map((post, index) => (
              <SwipeCard
                key={post.id}
                post={post}
                onSwipe={handleSwipe}
                isTop={index === 0}
                index={index}
              />
            ))
          )}
        </AnimatePresence>
      </div>

      {/* CONTROLS */}
      {hasMore && (
        <SwipeControls
          onSkip={() => handleSwipe("left")}
          onLike={() => handleSwipe("right")}
        />
      )}
    </div>
  );
}
