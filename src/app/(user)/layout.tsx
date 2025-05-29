import { Header } from "@/components/common/header";
import Footer from "@/components/common/footer";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col mx-auto overflow-x-hidden">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
