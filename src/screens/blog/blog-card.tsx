"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { Button } from "@ui/button";

interface IProps {
  slug: string;
  title: string;
  authorName: string;
  date: string;
  thumbnail: string;
  authorImage: string;
  description: string;
}

export function BlogCard({
  title,
  authorName,
  date,
  thumbnail,
  description,
  slug,
  authorImage,
}: IProps) {
  const router = useRouter();
  return (
    <div className="p-4 grid gap-4 max-w-[450px] bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl not-dark:shadow-sm">
      <div className="w-full h-[280px] relative">
        <Image
          src={thumbnail}
          alt={title}
          className="object-cover absolute left-0 top-0 w-full h-full rounded-2xl"
          width={0}
          height={0}
          unoptimized
        />
      </div>
      <div className="flex items-center">
        <div className="flex w-full gap-4">
          <Avatar className="w-11 h-11 rounded-2xl">
            <AvatarImage src={authorImage} />
            <AvatarFallback>
              {authorName?.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-1 items-center justify-between w-full">
            <h3 className="text-sm font-bold">{title}</h3>
            <p className="text-sm text-muted-foreground">{date}</p>
          </div>
        </div>
      </div>
      <p className="line-clamp-2">{description}</p>
      <Button
        variant="outline"
        onClick={() => router.push(`/blog/detail/${slug}`)}
      >
        Read More
      </Button>
    </div>
  );
}
