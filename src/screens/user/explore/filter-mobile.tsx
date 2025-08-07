import { FILTER_CONFIG } from "./filter-desktop";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectValue,
} from "@ui/select";
import { Checkbox } from "@ui/checkbox";
import { Label } from "@radix-ui/react-label";

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
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={config.key} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup className="flex flex-col gap-2 p-1">
              {config.value.map((value) => (
                <Label
                  key={value}
                  className="w-full flex items-center gap-2 text-sm"
                >
                  <Checkbox
                    onCheckedChange={(e: boolean) =>
                      handleParamChange(config.key, value, e)
                    }
                    checked={!!paramState[config.key]?.includes(value) || false}
                    value={value}
                    name={value}
                  >
                    {value}
                  </Checkbox>
                  {value}
                </Label>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      ))}
    </div>
  );
}
