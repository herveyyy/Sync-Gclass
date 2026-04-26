import Link from "next/link";
import { HiSparkles } from "react-icons/hi2";
import { Chip } from "@/components/atoms/Chip";
import { PricingCard, PricingPlan } from "@/components/molecules/PricingCard";
import { PageContainer } from "@/components/atoms/PageContainer";
import { Heading } from "@/components/atoms/Heading";

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: "Free",
    credits: "50 credits",
    color: "bg-[#b8fd4b]",
    features: [
      "50 AI credits per month",
      "Sync up to 3 courses",
      "AI study summaries",
      "Basic analytics",
    ],
    cta: "Get Started",
    href: "/login",
    popular: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "/mo",
    credits: "500 credits",
    color: "bg-[#f8e600]",
    features: [
      "500 AI credits per month",
      "Unlimited course sync",
      "AI practice quizzes",
      "Progress tracking",
      "Priority support",
    ],
    cta: "Subscribe",
    href: "/login",
    popular: true,
  },
  {
    name: "Unlimited",
    price: "$29",
    period: "/mo",
    credits: "Unlimited",
    color: "bg-[#0266ff]",
    textColor: "text-white",
    features: [
      "Unlimited AI credits",
      "Unlimited course sync",
      "All AI features",
      "Custom study plans",
      "Study group features",
      "Dedicated support",
    ],
    cta: "Go Unlimited",
    href: "/login",
    popular: false,
  },
];

export default function PricingPage() {
  return (
    <PageContainer size="wide">
      <div className="text-center mb-16">
        <Chip
          color="green"
          icon={<HiSparkles className="text-lg" />}
          className="mb-6"
        >
          Pricing
        </Chip>
        <Heading className="mb-4">Pick Your Plan</Heading>
        <p className="text-xl font-bold text-[#4a4731] max-w-lg mx-auto">
          Start free, upgrade when you need more AI power. Cancel anytime.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {plans.map((plan) => (
          <PricingCard key={plan.name} plan={plan} />
        ))}
      </div>

      <div className="text-center">
        <Link
          href="/"
          className="text-lg font-extrabold text-[#0266ff] hover:underline"
        >
          &larr; Back to Home
        </Link>
      </div>
    </PageContainer>
  );
}
