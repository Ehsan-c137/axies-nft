import { ThemeProvider } from "@/context/theme/theme-context";
interface IProps {
  children: React.ReactNode;
}

export default function Providers({ children }: IProps) {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
}
