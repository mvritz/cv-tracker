import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/auth/form-message";
import { SubmitButton } from "@/components/auth/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WavyBackground } from "@/components/ui/background";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;

  return (
    <WavyBackground className="min-h-screen w-full flex items-center justify-center">
      <div className="container flex items-center justify-center">
        <div className="w-full max-w-xl">
          <form className="flex flex-col space-y-8 bg-card/95 backdrop-blur-sm p-12 shadow-2xl rounded-xl border">
            <div className="space-y-2 text-center">
              <h1 className="text-3xl font-semibold tracking-tight">
                Reset password
              </h1>
              <p className="text-base text-muted-foreground">
                Please enter your new password below.
              </p>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="password" className="text-base">
                  New password
                </Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="New password"
                  required
                  className="w-full h-12 text-base"
                />
              </div>
              <div className="space-y-3">
                <Label htmlFor="confirmPassword" className="text-base">
                  Confirm password
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  required
                  className="w-full h-12 text-base"
                />
              </div>
            </div>
            <SubmitButton
              formAction={resetPasswordAction}
              className="w-full h-12 text-lg"
            >
              Reset password
            </SubmitButton>
            <FormMessage message={searchParams} />
          </form>
        </div>
      </div>
    </WavyBackground>
  );
}
