import { completeOnboarding } from "./actions";
import { HiSparkles } from "react-icons/hi2";
import { Decorations } from "@/components/atoms/Decorations";
import { PageContainer } from "@/components/atoms/PageContainer";
import { Heading } from "@/components/atoms/Heading";
import { BrutalCard } from "@/components/atoms/BrutalCard";
import { Input } from "@/components/atoms/Input";
import { SubmitButton } from "./submit-button";

export default function OnboardingPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen px-8 relative overflow-hidden">
      <Decorations preset="onboarding" />

      <PageContainer size="narrow">
        <BrutalCard shadowSize="lg" className="p-8 md:p-16">
          <div className="w-16 h-16 mx-auto mb-6 bg-[#b8fd4b] border-brutal rounded-xl flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <HiSparkles className="text-3xl text-[#1d1c10]" />
          </div>

          <Heading className="mb-3 text-center" level={2}>
            Welcome to Ylern!
          </Heading>
          <p className="text-lg font-bold text-[#4a4731] mb-10 text-center">
            Tell us your name to get started.
          </p>

          <form action={completeOnboarding} className="space-y-6">
            <Input
              label="First Name"
              id="firstName"
              name="firstName"
              required
              placeholder="Juan"
            />

            <Input
              label="Last Name"
              id="lastName"
              name="lastName"
              required
              placeholder="Dela Cruz"
            />

            <SubmitButton />
          </form>
        </BrutalCard>
      </PageContainer>
    </div>
  );
}
