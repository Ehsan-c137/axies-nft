import { Input } from "@ui/input";
import { Label } from "@ui/label";
import { Checkbox } from "@ui/checkbox";
import { Button } from "@ui/button";
import Link from "next/link";
import { ThemedImage } from "@ui/image";
import { FacebookIcon } from "@icons/socials";
import { GoogleIcon } from "@icons/socials";

export function LoginScreen() {
  return (
    <div className="flex items-center justify-center gap-4 min-w-3xs max-w-sm container mx-auto h-screen">
      <div className="flex flex-col gap-8 items-center justify-center justify-items-center h-full w-full">
        <Link href="/">
          <ThemedImage
            srcLight="/assets/logo/logo_light.webp"
            srcDark="/assets/logo/logo_dark.webp"
            alt="axies nft logo"
            width={0}
            height={0}
            className="w-full h-full top-0 left-0 object-cover"
            unoptimized
          />
        </Link>
        <div className="flex flex-col gap-4 justify-center items-center w-full">
          <Input placeholder="Your Fullname..." />
          <Input placeholder="Your Email Address" />
          <Button variant="outline" className="w-full">
            Login
          </Button>
        </div>
        <div className="flex justify-between items-center w-full">
          <Label htmlFor="remember" className="cursor-pointer">
            Remember Me <Checkbox name="remember" id="remember" />
          </Label>
          <Link href="/forget-password">Forget Password?</Link>
        </div>
        <div className="flex flex-col gap-4 items-center mt-8 w-full">
          <div className="flex items-center gap-4 w-full">
            <span className="border w-full" />
            <p className="w-full text-nowrap">Login with socials</p>
            <span className="border w-full" />
          </div>
          <div className="flex gap-4 items-center">
            <Button variant="outline" className="flex-1">
              <GoogleIcon /> Google
            </Button>
            <Button variant="outline" className="flex-1">
              <FacebookIcon /> Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
