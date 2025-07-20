import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@ui/form";
import { Textarea } from "@ui/textarea";
import { Input } from "@ui/input";
import { useFormContext } from "react-hook-form";

export function FixedPriceForm() {
  const { control } = useFormContext();
  return (
    <>
      <FormField
        name="price"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl">Price</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter price for one item ( ETH )"
                type="number"
                min={0}
                step={0.01}
                {...field}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="title"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl">Title</FormLabel>
            <FormControl>
              <Input placeholder="Title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="description"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl">Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="royalties"
        control={control}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Royalties in %</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. 10%"
                type="number"
                {...field}
                onChange={(e) =>
                  field.onChange(
                    e.target.value === "" ? "" : Number(e.target.value),
                  )
                }
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
