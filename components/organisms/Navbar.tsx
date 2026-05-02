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
          <img
            src="/logos/logo_3.svg"
            alt="logo"
            className="h-12 w-12 object-cover"
          />
          <span className="hidden sm:block text-xl font-extrabold text-black">
            Terrah
          </span>
        </Link>

        {/* MOBILE RIGHT WRAPPER / DESKTOP NORMAL */}
        <div className="flex items-center gap-2 sm:contents">
          {/* CENTER — NAV */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* HOME */}
            <Link
              href="/home"
              className="
                flex items-center justify-center gap-2
                w-11 h-11 lg:w-auto lg:h-14 lg:px-5
                border-4 border-black
                rounded-xl
                bg-[#ffec00]
                shadow-[4px_4px_0px_#000] lg:shadow-[6px_6px_0px_#000]
                hover:bg-primary
                active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000]
                lg:active:translate-x-[3px] lg:active:translate-y-[3px] lg:active:shadow-[3px_3px_0px_#000]
              "
            >
              <HiHome className="text-xl lg:text-2xl text-black" />
              <span className="hidden lg:block font-extrabold text-black text-sm">
                Home
              </span>
            </Link>

            {/* CLASSROOM */}
            <Link
              href="/classroom"
              className="
                flex items-center justify-center gap-2
                w-11 h-11 lg:w-auto lg:h-14 lg:px-5
                border-4 border-black
                rounded-xl
                bg-white
                shadow-[4px_4px_0px_#000] lg:shadow-[6px_6px_0px_#000]
                hover:bg-secondary hover:text-white
                active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000]
                lg:active:translate-x-[3px] lg:active:translate-y-[3px] lg:active:shadow-[3px_3px_0px_#000]
              "
            >
              <SiGoogleclassroom className="text-xl lg:text-2xl" />
              <span className="hidden lg:block font-extrabold text-sm">
                Classroom
              </span>
            </Link>
          </div>

          <div className="flex items-center">
            <UserDropdown user={session.user} />
          </div>
        </div>
      </div>
    </nav>
  );
}
