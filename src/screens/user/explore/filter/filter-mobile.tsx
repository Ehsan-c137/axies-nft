import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectValue,
} from "@ui/select";
import { FilterOptions } from "./filter-options";
import { FILTER_CONFIG } from "./filter-config";

interface IFilterProps {
  handleParamChange: (key: string, value: string, checked: boolean) => void;
  paramState: Record<string, string[]>;
  isDataPending?: boolean;
}

export default function FilterMobile({
  handleParamChange,
  paramState,
}: IFilterProps) {
  return (
    <div
      className="flex items-center gap-2 justify-between md:hidden"
      data-testid="explore-filter"
    >
      {FILTER_CONFIG.map((config, index) => (
        <Select key={index}>
          <SelectTrigger
            className="w-[180px]"
            data-testid={`filter-${config.key}`}
          >
            <SelectValue
              placeholder={
                config.key.charAt(0).toUpperCase() + config.key.slice(1)
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="flex flex-col gap-2 p-1">
              <FilterOptions {...{ config, handleParamChange, paramState }} />
            </SelectGroup>
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
