"use client";

import { useState } from "react";
import { ThemeProvider } from "@/context/theme/theme-context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
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
        <QueryClientProvider client={queryClient}>
          <Toaster />
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
