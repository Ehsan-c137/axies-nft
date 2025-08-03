import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Divider } from "@ui/divider";
import { Button } from "@ui/button";
import Link from "next/link";
import { useUserProfile } from "@/services/users/user-service";
import UserIcon from "@icons/user-icon";
import { toast } from "sonner";
import { useLogoutMutation } from "@/services/auth/auth-service";
import { useAuth } from "@/context/auth/auth-provider";
import { usePathname } from "next/navigation";

export function Profile() {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="w-10 h-10 p-2 rounded-full flex items-center justify-center border cursor-pointer"
      >
        <UserIcon />
      </PopoverTrigger>
      <PopOverContentContainer />
    </Popover>
  );
}

const PopOverContentContainer = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const currentPath = usePathname();
  const {
    data: userProfileData,
    isPending,
    error,
    isError,
  } = useUserProfile(2);

  const {
    mutate: logoutUser,
    isPending: isLogoutPending,
    error: logoutError,
  } = useLogoutMutation(1);

  const handleLogout = async () => {
    try {
      logoutUser();
    } catch (error) {
      toast.error("Logout failed. Please try again.");
      console.error("Logout error:", logoutError?.message || error);
    }
  };

  if (isLoading || isPending) {
    return (
      <PopoverContent className="w-[200px] bg-[var(--popover)] text-[var(--popover-foreground)]">
        <Placeholder />
      </PopoverContent>
    );
  }

  if (isError) {
    return (
      <PopoverContent className="w-[200px] bg-[var(--popover)] text-[var(--popover-foreground)]">
        <ErrorPlaceholder message={error?.message} />
      </PopoverContent>
    );
  }

  if (!isAuthenticated) {
    return (
      <PopoverContent className="w-[200px] bg-[var(--popover)] text-[var(--popover-foreground)]">
        <Link href={`/login?callbackUrl=${currentPath}`}>Login</Link>
      </PopoverContent>
    );
  }

  return (
    <PopoverContent className="w-[200px] bg-[var(--popover)] text-[var(--popover-foreground)]">
      {!isPending && !isError && !isLoading && (
        <div className="flex flex-col gap-2">
          <h4 className="font-bold">{userProfileData?.name}</h4>
          <div className="flex items-center justify-between">
            <p>Balance</p>
            <p>{userProfileData?.balance}</p>
          </div>
          <Divider />
          <Link href={`/profile/${userProfileData?.username}`}>My Profile</Link>
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
  );
};

const Placeholder = () => {
  return (
    <div className="grid gap-2 w-full">
      <div className="w-full h-10 bg-[rgba(0,0,0,0.3)] rounded-sm animate-pulse"></div>
      <div className="w-full h-10 bg-[rgba(0,0,0,0.3)] rounded-sm animate-pulse"></div>
      <div className="w-full h-10 bg-[rgba(0,0,0,0.3)] rounded-sm animate-pulse"></div>
      <div className="w-full h-10 bg-[rgba(0,0,0,0.3)] rounded-sm animate-pulse"></div>
      <div className="w-full h-10 bg-[rgba(0,0,0,0.3)] rounded-sm animate-pulse"></div>
    </div>
  );
};

const ErrorPlaceholder = ({ message }: { message: string }) => {
  console.error(message);
  return (
    <div className="flex items-center justify-center w-full">
      <div className="text-red-500">Something went wrong</div>
    </div>
  );
};
