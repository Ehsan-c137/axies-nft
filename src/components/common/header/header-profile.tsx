import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Divider } from "@ui/divider";
import { Button } from "@ui/button";
import Link from "next/link";
import { useUserProfile } from "@/services/profile/profile-service";
import UserIcon from "@icons/user-icon";
import { toast } from "sonner";
import { useLogoutMutation } from "@/services/auth/auth-service";

export function Profile() {
  const { data: userProfileData, isPending, error, isError } = useUserProfile();

  const {
    mutate: logoutUser,
    isPending: isLogoutPending,
    error: logoutError,
  } = useLogoutMutation();

  const handleLogout = async () => {
    try {
      logoutUser();
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", logoutError?.message || error);
    }
  };

  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="w-10 h-10 p-2 rounded-full flex items-center justify-center border cursor-pointer"
      >
        <UserIcon />
      </PopoverTrigger>
      <PopoverContent className="w-[264px] bg-[var(--popover)] text-[var(--popover-foreground)]">
        {isPending && <Placeholder />}
        {isError && <ErrorPlaceholder message={error?.message} />}
        {!isPending && (
          <div className="flex flex-col gap-2">
            <h4 className="font-bold">{userProfileData?.name}</h4>
            <div className="flex items-center justify-between">
              <p>Balance</p>
              <p>{userProfileData?.balance}</p>
            </div>
            <Divider />
            <Link href={`/profile/${userProfileData?.username}`}>
              My Profile
            </Link>
            <Link href={"/wallet"}>Wallet</Link>
            <Button
              disabled={isLogoutPending}
              loading={isLogoutPending}
              variant="link"
              onClick={handleLogout}
              className="text-left px-0 py-0 h-auto justify-start"
            >
              Logout
            </Button>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

const Placeholder = () => {
  return (
    <div className="grid gap-2 w-[264px]">
      <div className="w-full h-10 bg-[rgba(0,0,0,0.3)] rounded-sm animate-pulse"></div>
      <div className="w-full h-10 bg-[rgba(0,0,0,0.3)] rounded-sm animate-pulse"></div>
      <div className="w-full h-10 bg-[rgba(0,0,0,0.3)] rounded-sm animate-pulse"></div>
      <div className="w-full h-10 bg-[rgba(0,0,0,0.3)] rounded-sm animate-pulse"></div>
      <div className="w-full h-10 bg-[rgba(0,0,0,0.3)] rounded-sm animate-pulse"></div>
    </div>
  );
};

const ErrorPlaceholder = ({ message }: { message: string }) => {
  return (
    <div className="flex items-center justify-center w-80">
      <div className="text-red-500">{message}</div>
    </div>
  );
};
