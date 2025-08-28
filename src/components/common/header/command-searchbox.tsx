import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ui/command";
import { Button } from "@ui/button";
import { Newspaper, Folders, CreditCard, SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ROUTE_CONFIG } from "../../../lib/routes";

const navItems = [
  {
    title: "Explore",
    href: ROUTE_CONFIG.explore,
    icon: Newspaper,
    keywords: ["explore", "items", "nfts", "marketplace"],
  },
  {
    title: "Blog",
    href: ROUTE_CONFIG.blog,
    icon: Folders,
    keywords: ["blog", "news", "articles"],
  },
  {
    title: "Create item",
    href: ROUTE_CONFIG.items.itemCreation,
    icon: CreditCard,
    keywords: ["create", "item", "nft"],
  },
];

export function CommandSearchBox() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => unknown) => {
    setIsOpen(false);
    command();
  };

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
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
        onClick={() => setIsOpen(true)}
        variant="outline"
        size={"icon"}
        aria-label="search"
        className="flex sm:hidden"
      >
        <SearchIcon />
        <span className="sr-only">Search</span>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        <CommandInput placeholder="search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {navItems.map((item) => (
              <CommandItem
                key={item.href}
                value={item.title}
                keywords={item.keywords}
                onSelect={() => {
                  runCommand(() => router.push(item.href));
                }}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
