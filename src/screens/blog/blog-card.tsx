"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/avatar";
import { Button } from "@ui/button";

export function BlogCard() {
  const router = useRouter();
  return (
    <div className="p-4 grid gap-4 max-w-[450px] bg-[var(--card)] text-[var(--card-foreground)] rounded-2xl not-dark:shadow-sm">
      <div className="w-full h-[280px] relative">
        <Image
          src="/assets/blog-image.jpg"
          alt=""
          className="object-cover absolute left-0 top-0 w-full h-full rounded-2xl"
          width={0}
          height={0}
          objectFit="cover"
          unoptimized
        />
      </div>
      <div className="flex items-center">
        <div className="flex w-full gap-4">
          <Avatar className="w-11 h-11 rounded-2xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-1 items-center justify-between w-full">
            <h3 className="text-sm font-bold">John Doe</h3>
            <p className="text-sm text-muted-foreground">Feb 19</p>
          </div>
        </div>
      </div>
      <p className="line-clamp-2">
        Dolore officia sint incididunt non excepteur ea mollit commodo ut enim
        reprehenderit cupidatat labore ad laborum consectetur consequat
      </p>
      <Button variant="outline" onClick={() => router.push("/blog/asdf")}>
        Read More
      </Button>
    </div>
  );
}
