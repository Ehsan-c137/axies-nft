"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center gap-4 min-h-[400px] text-center">
      <h2 className="text-3xl font-bold uppercase ">Not Found | 404</h2>
      <p>Could not find requested resource</p>
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <Button variant="outline" onClick={() => router.push("/")}>
          home
        </Button>
      </div>
    </div>
  );
}
