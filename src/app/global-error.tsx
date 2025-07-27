"use client";

import { useEffect } from "react";
import { Button } from "@ui/button";
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="w-full flex justify-center items-center flex-col gap-4">
      <h2 className="text-lg">Ooops! Something went wrong.</h2>
      <Button variant="contained" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
