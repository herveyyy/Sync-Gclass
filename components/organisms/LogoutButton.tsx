"use client";

import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { logout } from "@/app/login/actions";

export function LogoutButton() {
  return (
    <button
      onClick={() => logout()}
      className="px-4 py-2 rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm font-extrabold text-[#1d1c10] bg-[#ffdad6] hover:bg-[#ffb4ab] transition-all active:translate-x-1 active:translate-y-1 active:shadow-none inline-flex items-center gap-2"
      title="Sign Out"
    >
      <HiArrowRightOnRectangle className="text-lg" />
      <span className="hidden sm:inline">Sign Out</span>
    </button>
  );
}
