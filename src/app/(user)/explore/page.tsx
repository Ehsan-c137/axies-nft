import ExploreScreen from "@/screens/user/explore/explore-screen";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense>
      <ExploreScreen />
    </Suspense>
  );
}
