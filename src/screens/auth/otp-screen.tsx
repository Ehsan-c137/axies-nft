"use client";

import { useState } from "react";
import OTPInput from "@/components/common/otp-input";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useVerifyOTPMutation } from "@/services/client/auth/auth-service";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export function OTPScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [otp, setOtp] = useState("");
  const otpMutation = useVerifyOTPMutation();

  const handleOTPVerify = () => {
    otpMutation.mutate(otp);

    if (otpMutation.isError) {
      toast.error("OTP verification failed");
    }

    if (otpMutation.isSuccess) {
      toast.success("OTP verified successfully");
      router.push(searchParams.get("callbackUrl") || "/");
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background border-none">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm font-bold">Enter sent code to your email</h3>
        <OTPInput valueLength={6} value={otp} onChange={setOtp} />
        <Button
          variant="outline"
          disabled={otp.length < 6}
          className="w-full"
          onClick={handleOTPVerify}
        >
          Verify
        </Button>
      </div>
      <GridPattern
        squares={[
          [4, 4],
          [5, 1],
          [8, 2],
          [5, 3],
          [5, 5],
          [10, 10],
          [12, 15],
          [15, 10],
          [10, 15],
          [15, 10],
          [10, 15],
          [15, 10],
        ]}
        className={cn(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />
    </div>
  );
}
