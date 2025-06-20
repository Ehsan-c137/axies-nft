import { Header } from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { HEADER_HEIGHT } from "@/lib/constant/sizes";

export function PrimaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main
        style={{
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px`,
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
