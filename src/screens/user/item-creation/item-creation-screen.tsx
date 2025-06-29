"use client";

import { useState } from "react";
import { Button } from "@ui/button";
import { FixedPriceTab } from "./methods/fixed-price";
import { TimeAuctionsTab } from "./methods/time-auctions";
import { OpenForBidsTab } from "./methods/open-for-bids";
import clsx from "clsx";
import { ExploreCard } from "@/components/common/cards/explore-card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form } from "@ui/form";
import { SelectFile } from "@/modules/item/forms/item-creation/select-file";

const formSchema = z.object({
  creator: z.string().min(3, "Creator is required"),
  price: z.number().min(0, "Price must be a positive number"),
  title: z.string().min(3, "Title is required"),
  description: z.string().min(3, "Description is required"),
  image: z.any().refine((file) => file.size <= 200 * 1024 * 1024, {
    message: "Image must be less than 200MB",
  }),
  imageUrl: z.string().url("Image URL must be a valid URL").optional(),
  royalties: z
    .number()
    .min(0, "Royalties must be a positive number")
    .max(100, "Royalties cannot exceed 100%"),
});

export type TForm = z.infer<typeof formSchema>;

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

  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    mode: "all",
    reValidateMode: "onChange",
    defaultValues: {
      price: 0,
      title: "",
      description: "",
      royalties: 0,
      creator: "",
      image: null,
      imageUrl: undefined,
    },
  });

  const { handleSubmit, watch } = form;

  const onSubmit = (values: TForm) => {
    console.log(values);
  };

  return (
    <section className="mx-auto container flex flex-col md:flex-row md:gap-10 gap-6">
      <div className="flex flex-col md:justify-start md:flex-1/3 gap-4">
        <h4 className="text-lg font-bold">Preview item</h4>
        <div className="w-full flex justify-center md:justify-start">
          <ExploreCard
            title={watch("title")}
            creator={watch("creator")}
            price={watch("price")}
            timeLeft={"5 : 23 : 22 : 08"}
            imageUrl={watch("imageUrl") || "/assets/Rectangle.png"}
          />
        </div>
      </div>
      <div className="flex flex-col gap-5 w-full">
        <SelectFile setValues={form.setValue} />
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
        <div className="flex w-full justify-end">
          <Button variant="contained" onClick={handleSubmit(onSubmit)}>
            Create Item
          </Button>
        </div>
      </div>
    </section>
  );
}
