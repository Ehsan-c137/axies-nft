"use client";

import { Button } from "@ui/button";
import { Label } from "@ui/label";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormLabel,
  FormControl,
  FormDescription,
} from "@ui/form";
import { Checkbox } from "@ui/checkbox";
import { Input } from "@ui/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { GoogleAuthButton } from "../components/google-auth-button";
import FacebookIcon from "@icons/socials/facebook-icon";
import { useLoginMutation } from "@/services/auth/auth-service";

const loginSchema = z.object({
  email: z.string().min(5).max(100),
  password: z.string().min(8).max(100),
});

type TLoginForm = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { mutate } = useLoginMutation();
  const form = useForm<TLoginForm>({
    resolver: zodResolver(loginSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (credentials: TLoginForm) => {
    mutate(credentials);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>email is test@example.com</FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
                <FormDescription>password is p@ssword123</FormDescription>
              </FormItem>
            )}
          />
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
      </Form>
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
          <GoogleAuthButton />
          <Button variant="outline" className="flex-1">
            <FacebookIcon /> Facebook
          </Button>
        </div>
      </div>
    </>
  );
}
