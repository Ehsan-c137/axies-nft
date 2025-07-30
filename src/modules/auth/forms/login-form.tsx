"use client";

import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { Checkbox } from "@ui/checkbox";
import { Input } from "@ui/input";
import { Form } from "@/components/ui/form";
import GoogleIcon from "@icons/socials/google-icon";
import FacebookIcon from "@icons/socials/facebook-icon";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().min(5).max(100),
  password: z.string().min(8).max(100),
});

type TLoginForm = z.infer<typeof loginSchema>;

export function LoginForm() {
  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (e: TLoginForm) => {
    console.log(e);
  };

  return (
    <>
      <form
        className="flex flex-col gap-1 justify-center items-center w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Input placeholder="Your Email Address" type="email" name="email" />
        <Input placeholder="password" name="password" type="password" />
        <Button
          type="submit"
          variant="outline"
          className="w-full"
          disabled={form.formState.isSubmitting}
          loading={form.formState.isSubmitting}
        >
          Login
        </Button>
      </form>
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
    </>
  );
}
