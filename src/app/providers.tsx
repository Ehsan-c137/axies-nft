import { ThemeProvider as NextThemesProvider } from "next-themes"

interface IProps {
   children: React.ReactNode;
}

export default function Providers({ children }: IProps) {
  return (
    <>
      <NextThemesProvider attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
        {children}
      </NextThemesProvider>      
    </>
  );
}