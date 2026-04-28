"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { LogoutButton } from "./LogoutButton";
import Link from "next/link";
import { HiChevronDown } from "react-icons/hi2";

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
          <span className="text-sm font-extrabold text-[#1d1c10] leading-none max-w-[120px] truncate">
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
      {isOpen && (
        <>
          {/* MOBILE OVERLAY */}
          <div className="fixed inset-0 z-50 bg-surface md:hidden flex flex-col">
            {/* HEADER */}
            <div className="flex items-center justify-between p-4 border-b-4 border-black">
              <p className="text-lg font-extrabold">Account</p>
              <button
                onClick={() => setIsOpen(false)}
                className="border-4 border-black px-3 py-1 rounded-lg shadow-[4px_4px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000]"
              >
                Close
              </button>
            </div>

            {/* USER INFO */}
            <div className="p-6 border-b-4 border-black bg-[#f3eeda]">
              <p className="text-xl font-extrabold">{user.name}</p>
              <p className="text-sm font-bold text-[#4a4731]">{user.email}</p>
            </div>

            {/* LINKS */}
            <div className="flex flex-col gap-3 p-6">
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
            <div className="mt-auto p-6 border-t-4 border-black bg-[#f3eeda]">
              <div className="[&>button]:w-full [&>button]:justify-center">
                <LogoutButton />
              </div>
            </div>
          </div>

          {/* DESKTOP DROPDOWN */}
          <div className="hidden md:flex absolute right-0 top-full mt-3 w-64 bg-white border-4 border-black rounded-xl shadow-[8px_8px_0px_#000] z-50 flex-col overflow-hidden">
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
          </div>
        </>
      )}
    </div>
  );
}
