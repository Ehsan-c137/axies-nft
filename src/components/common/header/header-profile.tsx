import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { Divider } from "@ui/divider";
import { Button } from "@ui/button";
import Link from "next/link";
import UserIcon from "@icons/user-icon";
import { toast } from "sonner";
import { useLogoutMutation } from "@/services/client/auth/auth-service";
import { useAuth } from "@/context/auth/auth-provider";
import { usePathname } from "next/navigation";

export function Profile() {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="w-10 h-10 p-2 rounded-full flex items-center justify-center border cursor-pointer"
      >
        <UserIcon width={40} />
      </PopoverTrigger>
      <PopOverContentContainer />
    </Popover>
  );
}

const PopOverContentContainer = () => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const currentPath = usePathname();

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

  if (isLoading) {
    return (
      <PopoverContent className="w-[200px] bg-[var(--popover)] text-[var(--popover-foreground)]">
        <Placeholder />
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
      {!isLoading && (
        <div className="flex flex-col gap-2">
          <h4 className="font-bold">{user?.name}</h4>
          <div className="flex items-center justify-between">
            <p>Balance</p>
            <p>{user?.balance}</p>
          </div>
          <Divider />
          <Link href={`/profile/${user?.username}`}>My Profile</Link>
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
