import Link from "next/link";
import Image from "next/image";
import { auth } from "@/auth";
import { SiGoogleclassroom } from "react-icons/si";
import { LogoutButton } from "./LogoutButton";

export async function Navbar() {
  const session = await auth();

  if (!session?.user) return null;

  return (
    <nav className="border-b-4 border-black bg-white">
      <div className="max-w-6xl mx-auto px-8 py-4 flex items-center justify-between">
        {/* Left — Brand */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#f8e600] border-2 border-black rounded-lg flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-active:translate-x-0.5 group-active:translate-y-0.5 group-active:shadow-none transition-all">
            <SiGoogleclassroom className="text-xl text-[#1d1c10]" />
          </div>
          <span className="text-2xl font-extrabold text-[#1d1c10]">Terrah</span>
        </Link>

        {/* Center — Nav links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/classroom"
            className="text-base font-bold text-[#4a4731] hover:text-[#1d1c10] transition-colors"
          >
            Classroom
          </Link>
          <Link
            href="/pricing"
            className="text-base font-bold text-[#4a4731] hover:text-[#1d1c10] transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* Right — User */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-extrabold text-[#1d1c10] leading-tight">
              {session.user.name}
            </span>
            <span className="text-xs font-bold text-[#7c785f] leading-tight">
              {session.user.email}
            </span>
          </div>

          {session.user.image && (
            <Image
              src={session.user.image}
              alt={session.user.name || "Profile"}
              width={44}
              height={44}
              className="rounded-xl border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            />
          )}

          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
