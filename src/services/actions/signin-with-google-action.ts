"use server";

import { signIn } from "@/auth";

export async function SigninWithGoogle() {
  try {
    signIn("google");
  } catch (error) {
    console.log(error);
  }
}
