import { login } from "./actions";
import { Decorations } from "@/components/atoms/Decorations";
import { PageContainer } from "@/components/atoms/PageContainer";
import { Heading } from "@/components/atoms/Heading";
import { BrutalCard } from "@/components/atoms/BrutalCard";
import { Button } from "@/components/atoms/Button";
import { FaGoogle } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";

export default function LoginPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen px-8 relative overflow-hidden">
      <Decorations preset="onboarding" />

      <PageContainer size="narrow">
        <BrutalCard shadowSize="lg" className="p-8 md:p-16 text-center">
          <div className="w-20 h-20 mx-auto mb-8 bg-primary border-brutal rounded-xl flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-4xl">
              <SiGoogleclassroom />
            </span>
          </div>

          <Heading level={2} className="mb-4">
            Sign In
          </Heading>
          <p className="text-xl font-bold text-[#4a4731] mb-12">
            Sign in with your Google account to access your Classroom courses.
          </p>

          <form action={login}>
            <Button
              variant="secondary"
              className="flex w-full justify-center text-xl font-extrabold text-black "
              type="submit"
            >
              Continue with Google
            </Button>
          </form>
        </BrutalCard>
      </PageContainer>
    </div>
  );
}
