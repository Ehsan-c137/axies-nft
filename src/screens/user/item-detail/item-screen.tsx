"use client";

import Image from "next/image";
import { Button } from "@ui/button";
import { Tabs } from "./tabs";
import EyeIcon from "@icons/eye-icon";
import EllipsisIcon from "@icons/ellipsis-icon";
import { useGetItemDetail, TItem } from "@/services/item/item-service";
import ItemScreenPlaceholder from "./item-screen-placeholder";
import ShareCurrentUrlButton from "@/components/common/share-current-url-button";
import NotFound from "@/components/common/errors/404";
import UnexpectedError from "@/components/common/errors/unexpected";
import CountdownCard from "@/modules/item/countdown-card";
import UserInfoCard from "@/modules/item/user-info-card";
import CurrentBidCard from "@/modules/item/currentbid-card";
import StatusBox from "@/modules/item/status-box";
import LikeBox from "@/modules/item/like-box";

export default function ItemDetailView({
  id,
  initialData,
}: {
  id: string;
  initialData: TItem;
}) {
  const {
    data: itemDetail,
    error,
    isPending,
    isError,
    isPlaceholderData,
  } = useGetItemDetail(id, {
    initialData: initialData,
  });

  if (isPending && !isPlaceholderData) {
    return <ItemScreenPlaceholder />;
  }

  if (isError) {
    return <UnexpectedError error={error} />;
  }

  if (!itemDetail) {
    return <NotFound />;
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:justify-between container mx-auto gap-5">
        <div className="max-w-[690px] max-h-[690px]">
          <Image
            unoptimized
            src={itemDetail?.image}
            alt={`${itemDetail.name} image`}
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-6 max-w-[620px]">
          <h2 className="font-bold lg:text-4xl text-2xl">{itemDetail.name}</h2>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <StatusBox icon={<EyeIcon />} count={itemDetail.seen} />
              <LikeBox
                count={itemDetail.likes}
                itemId={id}
                isLiked={itemDetail.isFavorite}
              />
            </div>
            <div className="flex items-center gap-2">
              <ShareCurrentUrlButton />
              <Button
                variant="contained"
                className="rounded-full shadow-2xl w-9 h-9 bg-[var(--card)] text-[var(--card-foreground)]"
              >
                <EllipsisIcon />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <UserInfoCard
              title="Owned by"
              image={itemDetail?.ownedBy?.image}
              name={itemDetail?.ownedBy?.name}
              profileLink={itemDetail?.ownedBy?.id}
            />
            <UserInfoCard
              title="Created by"
              image={itemDetail?.createdBy?.image}
              name={itemDetail?.createdBy?.name}
              profileLink={itemDetail?.createdBy?.id}
            />
          </div>
          <p className="text-sm">{itemDetail?.description}</p>
          <div className="flex items-center justify-between gap-4">
            <CurrentBidCard currentbid={Number(itemDetail?.currentBid)} />
            <CountdownCard countdown={itemDetail?.countdown} />
          </div>
          <Button className="h-[50px] font-semibold" variant="outline">
            Place a bid
          </Button>
          <Tabs />
        </div>
      </div>
    </>
  );
}
