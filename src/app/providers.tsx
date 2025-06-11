"use client";

import { useState } from "react";
import { ThemeProvider } from "@/context/theme/theme-context";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

interface IProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProps) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </ThemeProvider>
    </>
  );
}
