"use client";

import { useState } from "react";
import HeartIcon from "@icons/heart-icon";
import { usePutItemMutation } from "@/services/client/item/item-service";
import { useQueryClient } from "@tanstack/react-query";
import { ITEM_QUERY } from "@/services/client/item/item-service";

interface IProps {
  count: number;
  itemId: string;
  isLiked: boolean;
}

export default function LikeBox({
  count,
  itemId,
  isLiked: initialIsLiked,
}: IProps) {
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [like, setLike] = useState(count);

  const queryClinet = useQueryClient();

  const { mutate, isPending } = usePutItemMutation({
    onSettled: () => {
      queryClinet.invalidateQueries({
        queryKey: ITEM_QUERY.items(),
      });
    },
  });

  const handleClick = () => {
    const newIsLiked = !isLiked;
    const newLikeCount = newIsLiked ? like + 1 : like - 1;

    setLike(newLikeCount);
    setIsLiked(newIsLiked);
    mutate({ id: itemId, body: { likes: newLikeCount } });
  };

  return (
    <button
      className={
        "items-center gap-2 flex px-2 py-1 rounded-full bg-[var(--accent)] color-[var(accent-foreground)] cursor-pointer"
      }
      disabled={isPending}
      aria-disabled={isPending}
      onClick={handleClick}
    >
      <HeartIcon />
      {like}
    </button>
  );
}
