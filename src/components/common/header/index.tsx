"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import clsx from "clsx";
import { ThemedImage } from "@ui/image";
import { useTheme } from "@/context/theme/theme-context";
import { HEADER_HEIGHT } from "@/lib/constant/sizes";
import { Button } from "@ui/button";
import SearchIcon from "@icons/search-icon";
import WalletIcon from "@icons/wallet-icon";
import BlurShape from "@/components/illustrations/blur-shape";
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
import { Profile } from "./header-profile";

const ThemeSwitch = dynamic(() => import("../theme-switcher"), {
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
    name: "item",
    href: "/item/adsf",
  },

  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "profile",
    href: "/profile/adsf",
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
            "fixed w-full animate-fade-in-translate px-1": isScrolled,
            "translate-y-0": !isScrolled,
          },
        )}
      >
        <div
          className={clsx(
            "container flex items-center justify-between mx-auto px-4 md:px-8 py-2 backdrop-blur-xs",
            {
              "border rounded-3xl dark:bg-[rgba(0,0,0,0.4)] bg-[rgba(255,255,255,0.4)] shadow-2xl":
                isScrolled,
            },
          )}
        >
          <div className="flex items-center gap-8 lg:gap-10">
            <div className="h-[40px] relative">
              <Link href="/">
                <ThemedImage
                  srcLight="/assets/logo/logo_light.webp"
                  srcDark="/assets/logo/logo_dark.webp"
                  alt="axies nft logo"
                  width={0}
                  height={0}
                  className="w-full h-full top-0 left-0 object-cover"
                  unoptimized
                />
              </Link>
            </div>
            <nav className="hidden items-center gap-6 lg:gap-8 -translate-x-1/2 left-1/2 absolute md:flex">
              {NAV_CONFIG.map((nav) => (
                <Link
                  key={nav.name}
                  href={nav.href}
                  className="text-lg font-semibold text-gray-800 dark:text-gray-200 hover:text-blue-500 transition-colors"
                >
                  {nav.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-2">
            <CommandSearchBox
              open={isCommandBoxOpen}
              setOpen={setCommandBoxOpen}
            />
            <Button variant="outline" size="lg" className="hidden lg:flex">
              <WalletIcon />
              Connect Wallet
            </Button>
            <ThemeSwitch />
            <Profile />
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
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size={"lg"}
        className="hidden lg:flex"
        aria-label="search"
      >
        <SearchIcon />
        Search
        <span className="sr-only">Search</span>
      </Button>
      <Button
        onClick={() => setOpen(true)}
        variant="outline"
        size={"icon"}
        aria-label="search"
        className="flex lg:hidden"
      >
        <SearchIcon />
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
