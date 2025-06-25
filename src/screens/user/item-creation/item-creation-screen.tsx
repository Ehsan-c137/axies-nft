"use client";

import { useRef, useState } from "react";
import { Label } from "@ui/label";
import { Button } from "@ui/button";
import { LiveAuctionsCard } from "@/components/common/cards/live-auctions-card";
import { FixedPriceTab } from "./fixed-price";
import { TimeAuctionsTab } from "./time-auctions";
import { OpenForBidsTab } from "./open-for-bids";
import clsx from "clsx";

const TABS = [
  {
    id: "Fixed-Price",
    label: "Fixed Price",
    component: FixedPriceTab,
  },
  {
    id: "Time-Auctions",
    label: "Time Auctions",
    component: TimeAuctionsTab,
  },
  {
    id: "Open-For-Bids",
    label: "Open For Bids",
    component: OpenForBidsTab,
  },
];

export default function ItemCreationScreen() {
  const [activeTabId, setActiveTabId] = useState(TABS[0].id);
  const ActiveTabComponent = TABS.find(
    (tab) => tab.id === activeTabId,
  )?.component;

  return (
    <section className="mx-auto container flex flex-col md:flex-row md:gap-10 gap-6 px-4 md:px-8 py-4 md:py-10">
      <div className="flex flex-col md:justify-center md:flex-1/3 gap-4">
        <h4 className="text-lg font-bold">Preview item</h4>
        <div className="w-full justify-center justify-items-center">
          <LiveAuctionsCard />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <SelectFile />
        <h4 className="text-lg font-bold">Select method</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
          {TABS.map((tab) => (
            <Button
              key={tab.id}
              variant={"contained"}
              onClick={() => setActiveTabId(tab.id)}
              className={clsx("flex-1 rounded-lg", {
                "bg-[var(--card-foreground)] text-[var(--primary)]":
                  activeTabId === tab.id,
              })}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        {ActiveTabComponent && <ActiveTabComponent />}
      </div>
    </section>
  );
}

const SelectFile = () => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-5 w-full">
      <h4 className="text-lg font-bold">Upload file</h4>
      <Label
        htmlFor="post-creation-input"
        className="border h-[100px] w-full flex items-center justify-between font-light cursor-pointer md:px-8 px-4 rounded-md"
      >
        PNG, JPG, GIF, WEBP or MP4. Max 200mb.
        <Button variant="outline" onClick={() => ref.current?.click()}>
          Upload File
        </Button>
        <input
          id="post-creation-input"
          type="file"
          className="hidden"
          ref={ref}
        />
      </Label>
    </div>
  );
};
