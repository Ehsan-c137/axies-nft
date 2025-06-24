import Link from "next/link";
import { PrimaryLayout } from "@/layout/primary-layout";
import { PageLayout } from "@/layout/page-layout";
import { Divider } from "@/components/ui/divider";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "404 Page Not Found!",
};

export default function NotFound() {
  return (
    <PrimaryLayout>
      <PageLayout>
        <div className="flex flex-col items-center justify-center gap-4 min-h-[400px] text-center">
          <h2 className="text-4xl font-bold uppercase ">Not Found</h2>
          <p>Could not find requested resource</p>
          <Link href="/">Return Home</Link>
        </div>
      </PageLayout>
    </PrimaryLayout>
  );
}
