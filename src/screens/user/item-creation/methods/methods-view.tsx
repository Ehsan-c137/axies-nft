"use client";

import { useState } from "react";
import clsx from "clsx";
import { FixedPriceTab } from "./fixed-price";
import { TimeAuctionsTab } from "./time-auctions";
import { OpenForBidsTab } from "./open-for-bids";
import { Button } from "@ui/button";
import { Form } from "@ui/form";
import { UseFormReturn } from "react-hook-form";

type ItemCreationFormValues = {
  price?: string;
  startingBid?: string;
  endDate?: Date;
};

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

export default function MethodsView({
  form,
}: {
  form: UseFormReturn<ItemCreationFormValues>;
}) {
  const [activeTabId, setActiveTabId] = useState(TABS[0].id);
  const ActiveTabComponent = TABS.find(
    (tab) => tab.id === activeTabId,
  )?.component;
  return (
    <>
      <h4 className="text-lg font-bold">Select method</h4>
      <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-4">
        {TABS.map((tab) => (
          <Button
            key={tab.id}
            variant={"contained"}
            onClick={() => setActiveTabId(tab.id)}
            className={clsx("flex-1 rounded-lg", {
              "bg-[var(--card-foreground)] text-[var(--primary)] not-dark:text-white":
                activeTabId === tab.id,
            })}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <Form {...form}>{ActiveTabComponent && <ActiveTabComponent />}</Form>
    </>
  );
}
