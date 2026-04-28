import Link from "next/link";
import { auth } from "@/auth";
import { SiGoogleclassroom } from "react-icons/si";
import { HiHome } from "react-icons/hi2";
import { UserDropdown } from "./UserDropdown";

export async function Navbar() {
  const session = await auth();
  if (!session?.user) return null;

  return (
    <nav className="border-b-4 border-black bg-surface">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
        {/* LEFT — BRAND */}
        <Link href="/home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#ffec00] border-4 border-black rounded-lg flex items-center justify-center shadow-[4px_4px_0px_#000] group-active:translate-x-[2px] group-active:translate-y-[2px] group-active:shadow-[2px_2px_0px_#000]">
            <SiGoogleclassroom className="text-xl text-black" />
          </div>
          <span className="hidden sm:block text-xl font-extrabold text-black">
            Terrah
          </span>
        </Link>

        {/* CENTER — NAV */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* HOME */}
          <Link
            href="/home"
            className="
              flex items-center justify-center gap-2
              px-3 lg:px-5
              h-12 lg:h-14
              border-4 border-black
              rounded-xl
              bg-[#ffec00]
              shadow-[6px_6px_0px_#000]
              hover:bg-primary
              active:translate-x-[3px] active:translate-y-[3px]
              active:shadow-[3px_3px_0px_#000]
            "
          >
            <HiHome className="text-2xl text-black" />
            <span className="hidden lg:block font-extrabold text-black text-sm">
              Home
            </span>
          </Link>

          {/* CLASSROOM */}
          <Link
            href="/classroom"
            className="
              flex items-center justify-center gap-2
              px-3 lg:px-5
              h-12 lg:h-14
              border-4 border-black
              rounded-xl
              bg-white
              shadow-[6px_6px_0px_#000]
              hover:bg-secondary hover:text-white
              active:translate-x-[3px] active:translate-y-[3px]
              active:shadow-[3px_3px_0px_#000]
            "
          >
            <SiGoogleclassroom className="text-2xl" />
            <span className="hidden lg:block font-extrabold text-sm">
              Classroom
            </span>
          </Link>
        </div>

        <div className="flex items-center">
          <UserDropdown user={session.user} />
        </div>
      </div>
    </nav>
  );
}
