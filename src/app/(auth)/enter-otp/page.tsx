import { OTPScreen } from "@/screens/auth/otp-screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Enter OTP",
  description: "Enter the One-Time Password to continue",
};

export default function EnterOtpPage() {
  return <OTPScreen />;
}
