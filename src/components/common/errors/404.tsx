"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[400px] text-center">
      <h2 className="text-4xl font-bold uppercase ">Not Found</h2>
      <p>Could not find requested resource</p>
      <div className="flex flex-col items-center gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        or
        <Button variant="outline" onClick={() => router.push("/")}>
          Return to home
        </Button>
      </div>
    </div>
  );
}
