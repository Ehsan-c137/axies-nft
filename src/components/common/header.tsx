"use client";
import { Suspense, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import clsx from "clsx";
import { Image } from "@ui/image";
import { HEADER_HEIGHT } from "@/lib/constant/sizes";
import { Button } from "@ui/button";
import SearchIcon from "@icons/search-icon";
import WalletIcon from "@icons/wallet-icon";
import BlurShape from "@/components/illustrations/blur-shape";
// import { ThemeSwitcher } from "./theme-switcher";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

const ThemeSwitch = dynamic(() => import("./theme-switcher"), {
  ssr: false,
  loading: () => (
    <div
      className="w-10 h-10 bg-[rgba(0,0,0,0.3)] border rounded-full animate-pulse"
      aria-label="loading"
    ></div>
  ),
});

const NAV_CONFIG: Array<{ name: string; href: string }> = [
  {
    name: "Explore",
    href: "/explore",
  },
  {
    name: "Activity",
    href: "/activity",
  },

  {
    name: "Community",
    href: "/community",
  },
  {
    name: "About",
    href: "/about",
  },
];

export function Header() {
  const [isCommandBoxOpen, setCommandBoxOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <>
      <header
        style={{ height: `${HEADER_HEIGHT}px` }}
        className={clsx(
          "absolute top-4 left-0 translate-y-0 w-full transition z-2",
          {
            "fixed w-full animate-fade-in-translate": isScrolled,
            "translate-y-0": !isScrolled,
          },
        )}
      >
        <div
          className={clsx(
            "container flex items-center justify-between mx-auto px-8 py-2",
            {
              "border rounded-3xl bg-[rgba(0,0,0,0.4)]  shadow-2xl": isScrolled,
            },
          )}
        >
          <div className="flex items-center gap-8">
            <div className="h-[40px] relative">
              <Link href="/">
                <Image
                  src="/assets/logo/logo-dark.png"
                  alt="axies nft logo"
                  width={0}
                  height={0}
                  className="w-full h-full top-0 left-0 object-cover"
                  unoptimized
                  priority={false}
                />
              </Link>
            </div>
            {/* <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" passHref legacyBehavior>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {NAV_CONFIG.map((item) => (
              <NavigationMenuItem key={item.name}>
                <NavigationMenuTrigger>{item.name}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink href={item.href}>
                    {item.name}
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu> */}
          </div>
          <div className="flex items-center gap-4">
            <CommandSearchBox
              open={isCommandBoxOpen}
              setOpen={setCommandBoxOpen}
            />
            <Button variant="outline" size="lg">
              <WalletIcon /> Connect Wallet
            </Button>

            <ThemeSwitch />
            {!isScrolled && (
              <BlurShape
                tabIndex={-1}
                className="absolute right-0 -top-20 -z-1 select-none pointer-events-none"
                width={180}
                height={180}
              />
            )}
          </div>
        </div>
      </header>
    </>
  );
}

const CommandSearchBox = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" size="lg">
        <SearchIcon />
        Search
        <span className="sr-only">Search</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>Calendar</CommandItem>
            <CommandItem>Search Emoji</CommandItem>
            <CommandItem>Calculator</CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
};
