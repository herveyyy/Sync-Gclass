import { login } from "./actions";
import { Decorations } from "@/components/atoms/Decorations";
import { PageContainer } from "@/components/atoms/PageContainer";
import { Heading } from "@/components/atoms/Heading";
import { BrutalCard } from "@/components/atoms/BrutalCard";
import { Button } from "@/components/atoms/Button";

export default function LoginPage() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center min-h-screen px-8 relative overflow-hidden">
      <Decorations preset="onboarding" />

      <PageContainer size="narrow">
        <BrutalCard shadowSize="lg" className="p-16 text-center">
          <div className="w-20 h-20 mx-auto mb-8 bg-[#f8e600] border-brutal rounded-xl flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-4xl">📚</span>
          </div>

          <Heading level={2} className="mb-4">
            Sign In
          </Heading>
          <p className="text-xl font-bold text-[#4a4731] mb-12">
            Sign in with your Google account to access your Classroom courses.
          </p>

          <form action={login}>
            <button
              type="submit"
              className="w-full px-8 py-5 rounded-xl border-brutal shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-xl font-extrabold text-black bg-[#f8e600] hover:bg-[#d9c900] transition-all active:translate-x-2 active:translate-y-2 active:shadow-none flex items-center justify-center gap-4"
            >
              <svg className="w-7 h-7" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>
          </form>
        </BrutalCard>
      </PageContainer>
    </div>
  );
}
