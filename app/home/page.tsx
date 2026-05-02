"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { mockBlogPosts } from "@/lib/utils/mockData";
import SidebarContent from "@/components/organisms/SidebarContent";
import WriteStoryCta from "@/components/molecules/WriteStoryCta";
import IconButton from "@/components/atoms/IconButton";

const SwipeStack = dynamic(() => import("@/components/organisms/SwipeStack"), {
  ssr: false,
  loading: () => (
    <div className="w-full max-w-2xl h-[500px] flex items-center justify-center bg-gray-50 border-4 border-dashed border-gray-200 rounded-2xl animate-pulse">
      <p className="text-gray-400 font-black uppercase italic">
        Loading Feed...
      </p>
    </div>
  ),
});

type Props = {};

const page = (props: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <main className="relative h-[calc(100vh-84px)] w-full overflow-hidden flex flex-col bg-surface">
      <div className="max-w-7xl mx-auto w-full h-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-stretch px-4">
        {/* SWIPE STACK - LEFT/CENTER */}
        <div className="lg:col-span-7 flex flex-col items-center justify-center h-full">
          <SwipeStack
            posts={mockBlogPosts}
            onToggleSidebar={() => setIsSidebarOpen(true)}
          />
        </div>
        {/* SIDEBAR - RIGHT (Visible on Desktop/Tablet Landscape) */}
        <div className="hidden lg:flex lg:col-span-5 flex-col gap-4 h-full py-4 lg:py-6 justify-start overflow-y-auto scroll-smooth">
          <SidebarContent />
        </div>
      </div>

      {/* MOBILE SIDEBAR DRAWER */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-90 lg:hidden"
            />
            {/* Drawer Panel */}
            <motion.div
              key="sidebar-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-surface z-100 lg:hidden flex flex-col border-black shadow-[-8px_0px_0px_#000]"
            >
              {/* Drawer Header */}
              {/* MOBILE "WRITE A STORY" CTA */}

              <div className="flex items-center justify-between p-4 border-b-4 border-black bg-[#ffec00]">
                <h2 className="text-lg font-black uppercase tracking-tight">
                  Community
                </h2>
                <IconButton
                  size="sm"
                  onClick={() => setIsSidebarOpen(false)}
                  aria-label="Close sidebar"
                >
                  <FiX size={20} strokeWidth={3} />
                </IconButton>
              </div>
              {/* Drawer Body */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scroll-smooth">
                <SidebarContent />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
};

export default page;
