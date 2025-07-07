import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion";
import { Checkbox } from "@ui/checkbox";
import { Label } from "@ui/label";

export const FILTER_CONFIG = [
  {
    key: "category",
    value: ["art", "music", "virtual world", "sports", "utility"],
  },
  {
    key: "chains",
    value: ["ethereium", "polygon", "klaytn"],
  },
  {
    key: "collections",
    value: ["abstraction", "Patternlicious", "Cartoonism"],
  },
];

interface IFilterProps {
  handleParamChange: (key: string, value: string, checked: boolean) => void;
  paramState: Record<string, string[]>;
}

export default function Filter({
  handleParamChange,
  paramState,
}: IFilterProps) {
  return (
    <div className="hidden md:flex flex-col gap-5 items-center w-[200px]">
      <Accordion type="multiple" className="w-full">
        {FILTER_CONFIG.map((config) => {
          return (
            <FilterSection
              config={config}
              handleParamChange={handleParamChange}
              paramState={paramState}
              key={config.key}
            />
          );
        })}
      </Accordion>
    </div>
  );
}

interface IFilterSectionProps extends IFilterProps {
  config: {
    key: string;
    value: string[];
  };
}

const FilterSection = ({
  config,
  handleParamChange,
  paramState,
}: IFilterSectionProps) => (
  <AccordionItem value={config.key} key={config.key}>
    <AccordionTrigger>
      {config.key.charAt(0).toUpperCase() + config.key.slice(1)}
    </AccordionTrigger>
    <AccordionContent className="space-y-2">
      {config.value.map((value: string) => (
        <div className="flex items-center gap-2" key={value}>
          <Checkbox
            id={value}
            onCheckedChange={(e: boolean) =>
              handleParamChange(config.key, value, e)
            }
            checked={!!paramState[config.key]?.includes(value) || false}
          />
          <Label htmlFor={value} className="cursor-pointer text-sm">
            {value}
          </Label>
        </div>
      ))}
    </AccordionContent>
  </AccordionItem>
);
