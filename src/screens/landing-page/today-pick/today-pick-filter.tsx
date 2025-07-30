import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectValue,
} from "@ui/select";
import { Checkbox } from "@ui/checkbox";
import { Label } from "@ui/label";

interface IProps {
  paramState: Record<string, string[]>;
  handleParamChange: (key: string, value: string, checked: boolean) => void;
}

export const FILTER_CONFIG = [
  {
    key: "category",
    value: ["art", "music", "virtual world", "sports", "utility"],
  },
  {
    key: "sort",
    value: ["desc", "asc"],
  },
];

export default function Filter({ paramState, handleParamChange }: IProps) {
  return (
    <div className="flex items-center justify-between gap-4 w-full">
      {FILTER_CONFIG.map((config, index) => {
        const configKey = `today_pick_${config.key}`;
        return (
          <Select key={index}>
            <SelectTrigger className="w-[180px] rounded-full">
              <SelectValue placeholder={config.key} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="flex flex-col gap-2 p-1">
                {config.value.map((value) => (
                  <Label
                    key={value}
                    className="w-full flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <Checkbox
                      onCheckedChange={(e: boolean) =>
                        handleParamChange(configKey, value, e)
                      }
                      checked={
                        !!paramState[configKey]?.includes(value) || false
                      }
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
        );
      })}
    </div>
  );
}
