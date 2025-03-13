import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/auth/form-message";
import { SubmitButton } from "@/components/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { WavyBackground } from "@/components/ui/background";

export default async function Signup(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  if ("message" in searchParams) {
    return (
      <WavyBackground className="min-h-screen w-full flex items-center justify-center">
        <div className="container flex items-center justify-center">
          <div className="w-full max-w-xl">
            <div className="bg-card/95 backdrop-blur-sm p-12 shadow-2xl rounded-xl border">
              <FormMessage message={searchParams} />
            </div>
          </div>
        </div>
      </WavyBackground>
    );
  }

  return (
    <WavyBackground className="min-h-screen w-full flex items-center justify-center">
      <div className="container flex items-center justify-center">
        <div className="w-full max-w-xl">
          <form className="flex flex-col space-y-8 bg-card/95 backdrop-blur-sm p-12 shadow-2xl rounded-xl border">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">
                Create an account
              </h1>
              <p className="text-base text-muted-foreground">
                Already have an account?{" "}
                <Link
                  className="text-primary font-medium hover:underline"
                  href="/sign-in"
                >
                  Sign in
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
                <Label htmlFor="password" className="text-base">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Your password"
                  minLength={6}
                  required
                  className="w-full h-12 text-base"
                />
              </div>
            </div>
            <SubmitButton
              formAction={signUpAction}
              pendingText="Signing up..."
              className="w-full h-12 text-lg"
            >
              Sign up
            </SubmitButton>
            <FormMessage message={searchParams} />
          </form>
        </div>
      </div>
    </WavyBackground>
  );
}
