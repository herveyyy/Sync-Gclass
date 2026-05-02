"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { LogoutButton } from "./LogoutButton";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import IconButton from "../atoms/IconButton";

type User = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
};

export function UserDropdown({ user }: { user: User }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 pr-3 rounded-2xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all bg-white"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name || "Profile"}
            width={36}
            height={36}
            className="rounded-xl border-2 border-black object-cover bg-[#f3f0e6]"
          />
        ) : (
          <div className="w-9 h-9 rounded-xl border-2 border-black bg-[#f3f0e6] flex items-center justify-center font-bold">
            {user.name?.charAt(0).toUpperCase() || "U"}
          </div>
        )}

        <div className="hidden sm:flex flex-col items-start text-left">
          <span className="text-sm font-extrabold text-on-surface leading-none max-w-[120px] truncate">
            {user.name}
          </span>
          <span className="text-[10px] font-bold text-[#7c785f] leading-none mt-1 max-w-[120px] truncate">
            {user.email}
          </span>
        </div>
        <HiChevronDown
          className={`text-xl transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* MOBILE OVERLAY */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-90 md:hidden"
            />
            {/* MOBILE DRAWER */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-surface z-100 md:hidden flex flex-col border-l-4 border-black shadow-[-8px_0px_0px_#000]"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between p-4 border-b-4 border-black bg-[#ffec00]">
                <h2 className="text-lg font-black uppercase tracking-tight">
                  Account
                </h2>
                <IconButton
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                >
                  <FiX size={20} strokeWidth={3} />
                </IconButton>
              </div>

              {/* USER INFO */}
              <div className="p-6 border-b-4 border-black bg-[#f3eeda]">
                <p className="text-xl font-extrabold">{user.name}</p>
                <p className="text-sm font-bold text-on-surface-variant">
                  {user.email}
                </p>
              </div>

              {/* LINKS */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scroll-smooth">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="border-4 border-black p-4 rounded-xl font-bold shadow-[6px_6px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0px_#000]"
                >
                  🏠 Home
                </Link>

                <Link
                  href="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="border-4 border-black p-4 rounded-xl font-bold shadow-[6px_6px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0px_#000]"
                >
                  Pricing
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="border-4 border-black p-4 rounded-xl font-bold shadow-[6px_6px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0px_#000]"
                >
                  Profile Settings
                </Link>

                <Link
                  href="/classroom"
                  onClick={() => setIsOpen(false)}
                  className="border-4 border-black p-4 rounded-xl font-bold bg-secondary text-white shadow-[6px_6px_0px_#000] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[3px_3px_0px_#000]"
                >
                  My Classrooms
                </Link>
              </div>

              {/* LOGOUT */}
              <div className="mt-auto p-4 border-t-4 border-black bg-[#f3eeda]">
                <div className="[&>button]:w-full [&>button]:justify-center">
                  <LogoutButton />
                </div>
              </div>
            </motion.div>

            {/* DESKTOP DROPDOWN */}
            <motion.div
              key="desktop-dropdown"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.15 }}
              className="hidden md:flex absolute right-0 top-full mt-3 w-64 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_#000] z-50 flex-col overflow-hidden"
            >
              <div className="p-4 border-b-4 border-black bg-[#f3eeda]">
                <p className="text-sm font-extrabold truncate">{user.name}</p>
                <p className="text-xs font-bold text-[#7c785f] truncate">
                  {user.email}
                </p>
              </div>

              <div className="p-2 flex flex-col gap-1">
                <Link
                  href="/"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-bold hover:bg-[#f3f0e6] rounded-lg"
                >
                  Home
                </Link>

                <Link
                  href="/pricing"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-bold hover:bg-[#f3f0e6] rounded-lg"
                >
                  Pricing
                </Link>

                <Link
                  href="/profile"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-bold hover:bg-[#f3f0e6] rounded-lg"
                >
                  Profile Settings
                </Link>

                <Link
                  href="/classroom"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-bold hover:bg-[#f3f0e6] rounded-lg"
                >
                  My Classrooms
                </Link>
              </div>

              <div className="p-3 border-t-4 border-black bg-[#f3eeda]">
                <div className="[&>button]:w-full [&>button]:justify-center">
                  <LogoutButton />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
