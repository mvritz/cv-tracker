import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/auth/form-message";
import { SubmitButton } from "@/components/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { WavyBackground } from "@/components/ui/background";

export default async function Login(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <WavyBackground className="min-h-screen w-full flex items-center justify-center">
      <div className="container flex items-center justify-center">
        <div className="w-full max-w-xl">
          <form className="flex flex-col space-y-8 bg-card/95 backdrop-blur-sm p-12 shadow-2xl rounded-xl border">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">
                Welcome back
              </h1>
              <p className="text-base text-muted-foreground">
                Don't have an account?{" "}
                <Link
                  className="text-primary font-medium hover:underline"
                  href="/sign-up"
                >
                  Sign up
                </Link>
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="email" className="text-base">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                  className="w-full h-12 text-base"
                />
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-base">
                    Password
                  </Label>
                  <Link
                    className="text-sm text-muted-foreground hover:text-primary hover:underline"
                    href="/forgot-password"
                  >
                    Forgot Password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  required
                  className="w-full h-12 text-base"
                />
              </div>
            </div>
            <SubmitButton
              pendingText="Signing In..."
              formAction={signInAction}
              className="w-full h-12 text-lg"
            >
              Sign in
            </SubmitButton>
            <FormMessage message={searchParams} />
          </form>
        </div>
      </div>
    </WavyBackground>
  );
}
