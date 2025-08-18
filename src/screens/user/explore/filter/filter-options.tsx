import { Checkbox } from "@ui/checkbox";
import { Label } from "@ui/label";

interface IFilterProps {
  handleParamChange: (key: string, value: string, checked: boolean) => void;
  paramState: Record<string, string[]>;
}

interface IFilterOptionsProps extends IFilterProps {
  config: {
    key: string;
    value: string[];
  };
}

export const FilterOptions = ({
  config,
  handleParamChange,
  paramState,
}: IFilterOptionsProps) => {
  return (
    <>
      {config.value.map((value) => (
        <Label
          key={value}
          htmlFor={`${config.key}-${value}`}
          className="w-full flex items-center gap-2 text-sm cursor-pointer p-2 rounded-md hover:bg-accent"
        >
          <Checkbox
            id={`${config.key}-${value}`}
            onCheckedChange={(e: boolean) =>
              handleParamChange(config.key, value, e)
            }
            data-testid={`filter-option-${value}`}
            checked={paramState[config.key]?.includes(value) ?? false}
          />
          {value}
        </Label>
      ))}
    </>
  );
};
