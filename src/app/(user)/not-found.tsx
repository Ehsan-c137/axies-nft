import NotFoundContainer from "@/components/common/errors/not-found-component";
import { Suspense } from "react";

export const metadata = {
  title: "404 Page Not Found!",
};

export default function NotFound() {
  return (
    <Suspense>
      <NotFoundContainer />
    </Suspense>
  );
}
