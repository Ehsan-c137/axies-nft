"use client";

import { useState } from "react";
import { ThemeProvider } from "@/context/theme/theme-context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AuthProvider } from "@/context/auth/auth-provider";
import { Toaster } from "@ui/sonner";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
interface IProps {
  children: React.ReactNode;
}

gsap.registerPlugin(useGSAP);

export default function Providers({ children }: IProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: (failureCount, error) => {
              const status = (
                error as unknown as { response: { status: number } }
              )?.response?.status;

              if (status === 404 || status === 401) {
                return false;
              }
              return failureCount < 3;
            },
          },
        },
      }),
  );
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        disableTransitionOnChange
      >
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Toaster />
            {children}
          </QueryClientProvider>
        </AuthProvider>
      </ThemeProvider>
    </>
  );
}
