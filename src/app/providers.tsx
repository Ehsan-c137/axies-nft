"use client";

import { useState } from "react";
import { ThemeProvider } from "@/context/theme/theme-context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { Toaster } from "@ui/sonner";

interface IProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProps) {
  const [queryClient] = useState(() => new QueryClient());
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
