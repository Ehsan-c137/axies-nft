import { Header } from "@/components/common/header/index";
import { Footer } from "@/components/common/footer";
import { HEADER_HEIGHT } from "@/lib/constant/sizes";
import clsx from "clsx";

export function PrimaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main
        className="md:pt-0 pt-24 px-4 md:px-0 overflow-x-hidden"
        style={{
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
        }}
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
