"use client";

import FileIcon from "@icons/file-icon";
import { Button } from "@ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@ui/avatar";
import { Tabs } from "./tabs";
import { toast } from "sonner";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth/auth-provider";
import { useUserProfile } from "@/services/users/user-service";
import UnexpectedError from "@/components/common/errors/unexpected";
import { ProfileScreenPlaceholder } from "./profile-screen-placeholder";
import NotFoundContainer from "@/components/common/errors/404";

type Props = {
  username: string;
};

export function ProfileScreen({ username }: Props) {
  const router = useRouter();
  const { user } = useAuth();
  const isMe = user?.username === username;

  const { data, isError, isLoading, error } = useUserProfile(username);
  console.log({ isMe, data }, user?.username);
  if (isLoading) {
    return <ProfileScreenPlaceholder />;
  }

  if (isError) {
    return <UnexpectedError error={error} />;
  }

  if (!data || data?.status == 404) {
    return <NotFoundContainer />;
  }

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap justify-between items-center rounded-t-3xl p-4 md:p-9 bg-[url(/assets/bg-profile.webp)] bg-opacity-60 bg-no-repeat bg-cover md:max-h-[274px]">
        <div className="flex flex-wrap md:flex-nowrap gap-1 md:gap-8 items-center">
          <div className="relative md:h-[270px] min-w-[200px] min-h-[200px] w-full h-full">
            <Avatar className="w-full h-full absolute rounded-3xl">
              <AvatarImage src={data?.image} className="object-cover" />
              <AvatarFallback>{data?.name[0]}</AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col items-start gap-1 md:gap-4 ">
            <h2 className="text-lg md:text-4xl text-white">{data?.name}</h2>
            <p>@{username}</p>
            <p className="max-w-lg text-xs leading-6 text-white">
              Exprience next generation of bots with us.
            </p>
            <ShareAddress address={data?.walletAddress} />
          </div>
        </div>
        <div className="h-full flex justify-end md:justify-start pt-8">
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

const ShareAddress = ({ address }: { address: string }) => {
  const { copy } = useCopyToClipboard();

  const handleShare = () => {
    copy(window.location.href).then(() => {
      toast("Address copied");
    });
  };

  return (
    <Button variant="outline" onClick={handleShare}>
      {address} <FileIcon />
    </Button>
  );
};
