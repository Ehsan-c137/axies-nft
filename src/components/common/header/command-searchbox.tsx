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
} from "@ui/command";
import { Button } from "@ui/button";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

export function CommandSearchBox() {
  const [isOpen, setIsOpen] = useState(false);
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
        className="flex lg:hidden"
      >
        <SearchIcon />
        <span className="sr-only">Search</span>
      </Button>
      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
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
}
