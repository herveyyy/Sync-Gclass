import Link from "next/link";
import { SiGoogleclassroom } from "react-icons/si";
import {
  HiArrowRight,
  HiSparkles,
  HiCreditCard,
  HiBolt,
} from "react-icons/hi2";
import { HiOutlineLogin } from "react-icons/hi";
import { Chip } from "@/components/atoms/Chip";
import { Decorations } from "@/components/atoms/Decorations";
import { PageContainer } from "@/components/atoms/PageContainer";
import { Heading } from "@/components/atoms/Heading";
import { FeatureCard } from "@/components/molecules/FeatureCard";
import { FaBridge } from "react-icons/fa6";
import { LiaPenAltSolid } from "react-icons/lia";
export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen px-8 relative overflow-hidden">
      <Decorations preset="landing" />

      <div className="flex flex-col items-center text-center py-24 overflow-y-auto h-screen w-screen px-6">
        <Heading className="flex items-center gap-2 mb-6">
          <div className=" bg-primary border-brutal rounded-xl flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <span>
              <LiaPenAltSolid className="text-4xl" />
            </span>
          </div>
          Ylern
        </Heading>
        <Chip
          color="green"
          icon={<HiSparkles className="text-lg" />}
          className="mb-6"
        >
          AI-Powered
        </Chip>
        <p className="max-w-xl text-xl font-bold text-on-surface-variant mb-12">
          Your AI-powered study companion. Sync Google Classroom, generate study
          guides, and ace your courses — powered by credits.
        </p>

        <div className="flex flex-wrap gap-6 justify-center mb-20">
          <Link
            href="/classroom"
            className="px-10 py-5 rounded-xl border-brutal shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-xl font-extrabold text-black bg-primary hover:bg-primary-dim transition-all active:translate-x-2 active:translate-y-2 active:shadow-none inline-flex items-center gap-3"
          >
            Go to Classroom
            <HiArrowRight className="text-2xl" />
          </Link>
          <Link
            href="/login"
            className="px-10 py-5 rounded-xl border-brutal shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-xl font-extrabold text-white bg-secondary hover:bg-secondary-dim transition-all active:translate-x-2 active:translate-y-2 active:shadow-none inline-flex items-center gap-3"
          >
            Sign In
            <HiOutlineLogin className="text-2xl" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <FeatureCard
            icon={<HiSparkles />}
            title="AI Insights"
            description="Get AI-generated summaries, practice quizzes, and study guides from your course materials."
            iconBgColor="bg-[#f8e600]"
          />
          <FeatureCard
            icon={<HiCreditCard className="text-white" />}
            title="Credits System"
            description="Pay as you go with credits, or subscribe for unlimited AI features. Start with free credits."
            iconBgColor="bg-[#0266ff]"
          />
          <FeatureCard
            icon={<HiBolt />}
            title="Instant Sync"
            description="Connect your Google Classroom in one click. Courses, students, and assignments — synced instantly."
            iconBgColor="bg-[#b8fd4b]"
          />
        </div>

        <Link
          href="/pricing"
          className="mt-12 text-lg font-extrabold text-secondary hover:underline"
        >
          View Pricing &rarr;
        </Link>
      </div>
    </div>
  );
}
