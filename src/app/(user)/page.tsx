import LandingScreen from "@/screens/landing-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Axies NFT Marketplace",
  description: "Axies NFT Marketplace, Search & Discover Everthing",
};

export default function Page() {
  return <LandingScreen />;
}
