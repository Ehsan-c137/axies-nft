"use client";

import { LiveAuctionsCard } from "@/components/common/cards/live-auctions-card";
import { Button } from "@ui/button";
import { useState } from "react";

export function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <div className="w-full flex justify-end gap-4 bg-[var(--card)] text-[var(--card-foreground)] rounded-b-3xl p-2">
        <Button variant="link">Music</Button>
        <Button variant="link">Art</Button>
        <Button variant="link">Collections</Button>
        <Button variant="link">All</Button>
      </div>
      <div className="flex flex-wrap gap-4 justify-between py-8">
        <LiveAuctionsCard />
        <LiveAuctionsCard />
        <LiveAuctionsCard />
        <LiveAuctionsCard />
      </div>
    </>
  );
}
