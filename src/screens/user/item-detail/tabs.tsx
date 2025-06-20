"use client";
import { useState } from "react";
import { Button } from "@ui/button";
import clsx from "clsx";
import { Avatar, AvatarImage, AvatarFallback } from "@ui/avatar";

const TABS = ["Bid History", "Info", "Provenance"];

export const Tabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="border-b">
        {TABS.map((tab, index) => (
          <Button
            onClick={() => setActiveTab(index)}
            key={index}
            className={clsx({
              "border-b border-[var(--border-color)]": activeTab === index,
            })}
          >
            {tab}
          </Button>
        ))}
      </div>
      <BidHistory isActive={activeTab === 0} />
      <Info isActive={activeTab === 1} />
      <Provenance isActive={activeTab === 2} />
    </div>
  );
};

const BidHistory = ({ isActive }: { isActive: boolean }) => {
  return (
    <TabItem active={isActive}>
      <BidItem />
    </TabItem>
  );
};

const Info = ({ isActive }: { isActive: boolean }) => {
  return (
    <TabItem active={isActive}>
      <InfoItem />
    </TabItem>
  );
};

const Provenance = ({ isActive }: { isActive: boolean }) => {
  return (
    <TabItem active={isActive}>
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
    </TabItem>
  );
};

const TabItem = ({
  active,
  children,
}: {
  active: boolean;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={clsx("py-4", {
        hidden: !active,
      })}
    >
      {children}
    </div>
  );
};

const BidItem = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p>Mason Woodward place a bid</p>
          <p>8 hours ago</p>
        </div>
      </div>
      <div className="flex flex-col">
        <p>4.89 ETH</p>
        <p>= $12.246</p>
      </div>
    </div>
  );
};

const InfoItem = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p>Mason Woodward place a bid</p>
          <p>8 hours ago</p>
        </div>
      </div>
    </div>
  );
};
