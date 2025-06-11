import { Header } from "@/components/common/header";
import { HEADER_HEIGHT } from "@/lib/constant/sizes";
import Footer from "@/components/common/footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col mx-auto overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <Header />
      <main
        style={{
          minHeight: `calc(100vh - ${HEADER_HEIGHT}px`,
        }}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
}
