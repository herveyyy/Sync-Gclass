import Link from "next/link";
import { Chip } from "@/components/atoms/Chip";
import { FeatureItem } from "@/components/atoms/FeatureItem";

export interface PricingPlan {
  name: string;
  price: string;
  period?: string;
  credits: string;
  color: string;
  textColor?: string;
  features: string[];
  cta: string;
  href: string;
  popular: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
}

export function PricingCard({ plan }: PricingCardProps) {
  return (
    <div
      className={`relative bg-white border-brutal rounded-xl p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col ${
        plan.popular ? "ring-4 ring-[#f8e600]" : ""
      }`}
    >
      {plan.popular && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2">
          <Chip color="yellow">Most Popular</Chip>
        </div>
      )}

      {/* Plan header */}
      <div
        className={`w-full py-4 px-6 ${plan.color} ${
          plan.textColor || "text-[#1d1c10]"
        } border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 text-center`}
      >
        <h3 className="text-2xl font-extrabold">{plan.name}</h3>
        <p className="text-sm font-bold opacity-80 mt-1">{plan.credits}</p>
      </div>

      {/* Price */}
      <div className="text-center mb-8">
        <span className="text-[48px] font-extrabold text-[#1d1c10] leading-none">
          {plan.price}
        </span>
        {plan.period && (
          <span className="text-xl font-bold text-[#4a4731]">
            {plan.period}
          </span>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-4 mb-10 flex-1">
        {plan.features.map((feature) => (
          <FeatureItem key={feature} text={feature} />
        ))}
      </ul>

      {/* CTA */}
      <Link
        href={plan.href}
        className={`block w-full text-center px-8 py-4 rounded-xl border-brutal shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-lg font-extrabold transition-all active:translate-x-2 active:translate-y-2 active:shadow-none ${
          plan.popular
            ? "bg-[#f8e600] text-black hover:bg-[#d9c900]"
            : "bg-white text-[#1d1c10] hover:bg-[#f9f4df]"
        }`}
      >
        {plan.cta}
      </Link>
    </div>
  );
}
