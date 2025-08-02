import { Button } from "@/components/ui/button";
import GoogleIcon from "@/components/icons/socials/google-icon";
import { SigninWithGoogle } from "@/services/actions/signin-with-google-action";

export function GoogleAuthButton() {
  return (
    <Button variant="outline" className="flex-1" formAction={SigninWithGoogle}>
      <GoogleIcon /> Google
    </Button>
  );
}
