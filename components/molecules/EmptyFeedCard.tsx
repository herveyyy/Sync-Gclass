"use client";

import { motion } from "framer-motion";
import { FiRefreshCw } from "react-icons/fi";

interface EmptyFeedCardProps {
  onRefresh: () => void;
}

/**
 * "All caught up!" card shown when user has swiped through all posts.
 */
export default function EmptyFeedCard({ onRefresh }: EmptyFeedCardProps) {
  return (
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
        onClick={onRefresh}
        className="group flex items-center gap-3 px-8 py-4 bg-secondary text-white border-4 border-black rounded-xl shadow-[6px_6px_0px_#000] font-black uppercase tracking-widest active:translate-x-[2px] active:translate-y-[2px] active:shadow-[4px_4px_0px_#000] transition-all hover:bg-secondary-dim"
      >
        <FiRefreshCw className="group-hover:rotate-180 transition-transform duration-500" />
        Refresh Feed
      </button>
    </motion.div>
  );
}
