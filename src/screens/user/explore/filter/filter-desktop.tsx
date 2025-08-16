import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/accordion";
import { FilterOptions } from "./filter-options";
import { FILTER_CONFIG } from "./filter-config";
import { Skeleton } from "@ui/skeleton";

interface IFilterProps {
  handleParamChange: (key: string, value: string, checked: boolean) => void;
  paramState: Record<string, string[]>;
}

export default function Filter({
  handleParamChange,
  paramState,
  isPending,
}: IFilterProps & {
  isPending?: boolean;
}) {
  if (isPending) {
    return (
      <div className="w-[200px] h-[200px] py-2 gap-4 flex flex-col items-center justify-center">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10  w-full" />
        <Skeleton className="h-10  w-full" />
      </div>
    );
  }

  return (
    <div
      className="hidden md:flex flex-col gap-5 items-center w-[200px]"
      data-testid="explore-filter"
    >
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
    <AccordionTrigger data-testid={`filter-${config.key}`}>
      {config.key.charAt(0).toUpperCase() + config.key.slice(1)}
    </AccordionTrigger>
    <AccordionContent className="space-y-2">
      <FilterOptions {...{ config, handleParamChange, paramState }} />
    </AccordionContent>
  </AccordionItem>
);
