"use client";

import FileIcon from "@icons/file-icon";
import { Button } from "@ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@ui/avatar";
import { Tabs } from "./tabs";
import { toast } from "sonner";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useRouter } from "next/navigation";

type Props = {
  username: string;
};

export function ProfileScreen({ username }: Props) {
  const router = useRouter();
  const isMe = username === "me";

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-between items-center rounded-t-3xl p-4 md:p-9 bg-[url(/assets/bg-profile.webp)] bg-opacity-60 bg-no-repeat bg-cover md:max-h-[274px]">
        <div className="flex flex-wrap md:flex-nowrap md:-translate-y-[26px] gap-8 items-center">
          <div className="relative md:h-[270px] min-w-[200px] min-h-[200px] w-full h-full">
            <Avatar className="w-full h-full absolute rounded-3xl md:translate-y-6">
              <AvatarImage
                src="/assets/images-item-details.jpg"
                className="object-cover"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-start gap-4 ">
            <h2 className="text-lg md:text-4xl text-white">
              Mehdi Khanmohammadi
            </h2>
            <p>@{username}</p>
            <p className="max-w-lg text-xs leading-6 text-white">
              Exprience next generation of bots with us.
            </p>
            <ShareAddress />
          </div>
        </div>
        <div className="h-full flex pt-8">
          {isMe ? (
            <Button
              variant="contained"
              onClick={() => router.push(`/profile/edit-profile`)}
            >
              Edit Profile
            </Button>
          ) : (
            <Button variant="contained">Follow</Button>
          )}
        </div>
      </div>
      <Tabs />
    </div>
  );
}

const ShareAddress = () => {
  const { copy } = useCopyToClipboard();

  const handleShare = () => {
    copy(window.location.href).then(() => {
      toast("Address copied");
    });
  };

  return (
    <Button variant="outline" onClick={handleShare}>
      DdzFFzCqrhshMSxABCdfrge <FileIcon />
    </Button>
  );
};
