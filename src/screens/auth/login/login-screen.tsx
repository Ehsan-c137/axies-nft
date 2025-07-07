import Link from "next/link";
import { ThemedImage } from "@ui/image";

import { LoginForm } from "@/modules/auth/forms/login-form";

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
        <LoginForm />
      </div>
    </div>
  );
}
