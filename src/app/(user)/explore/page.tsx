import ExploreScreen from "@/screens/user/explore/explore-screen";
import { Suspense } from "react";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Explore",
  description: "explore nft items",
};

export default function Page() {
  return (
    <Suspense>
      <ExploreScreen />
    </Suspense>
  );
}
