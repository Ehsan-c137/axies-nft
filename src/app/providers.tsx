"use client";

import { ThemeProvider } from "@/context/theme/theme-context";
import { AuthProvider } from "@/context/auth/auth-provider";
import { Toaster } from "@ui/sonner";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ReactQueryClientProvider } from "./providers/query-client-provider";

interface IProps {
  children: React.ReactNode;
}

gsap.registerPlugin(useGSAP);

export default function Providers({ children }: IProps) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <ReactQueryClientProvider>
          <AuthProvider>
            <Toaster />
            {children}
          </AuthProvider>
        </ReactQueryClientProvider>
      </ThemeProvider>
    </>
  );
}
