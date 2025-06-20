import { PageLayout } from "@/layout/page-layout";
import { PrimaryLayout } from "@/layout/primary-layout";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col mx-auto overflow-x-hidden bg-[var(--background)] text-[var(--foreground)]">
      <PrimaryLayout>
        <PageLayout>{children}</PageLayout>
      </PrimaryLayout>
    </div>
  );
}
