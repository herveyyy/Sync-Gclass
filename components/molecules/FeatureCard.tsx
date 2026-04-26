import React from "react";
import { BrutalCard } from "../atoms/BrutalCard";
import { Heading } from "../atoms/Heading";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor?: string;
}

export function FeatureCard({
  icon,
  title,
  description,
  iconBgColor = "bg-[#f8e600]",
}: FeatureCardProps) {
  return (
    <BrutalCard className="text-left">
      <div
        className={`w-14 h-14 ${iconBgColor} border-2 border-black rounded-lg flex items-center justify-center mb-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}
      >
        <div className="text-2xl">{icon}</div>
      </div>
      <Heading level={3} className="mb-2">
        {title}
      </Heading>
      <p className="text-base font-bold text-[#4a4731]">{description}</p>
    </BrutalCard>
  );
}
