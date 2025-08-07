"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logger } from "@/lib/utils/logger";

interface IProps {
  error: Error;
}

export default function UnexpectedError({ error }: IProps) {
  const router = useRouter();
  logger.log(error);

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <p>Ooops! something went wrong.</p>
      <div className="flex flex-col gap-2">
        <Button variant="outline" onClick={() => router.refresh()}>
          Try agian
        </Button>
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
        <Button variant="outline" onClick={() => router.push("/")}>
          Home
        </Button>
      </div>
    </div>
  );
}
