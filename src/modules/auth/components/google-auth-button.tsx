import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/icons/socials/google-icon";

export function GoogleAuthButton() {
  return (
    <Button
      variant="outline"
      className="flex-1"
      formAction={async () => {
        "user server";
        await signIn("google");
      }}
    >
      <GoogleIcon /> Google
    </Button>
  );
}
