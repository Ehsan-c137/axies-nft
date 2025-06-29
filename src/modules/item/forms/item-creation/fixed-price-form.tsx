import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
  FormLabel,
} from "@ui/form";
import { Textarea } from "@ui/textarea";
import { Input } from "@ui/input";

export function FixedPriceForm() {
  return (
    <>
      <FormField
        name="price"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-xl">Price</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter price for one item ( ETH )"
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        name="title"
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
        render={({ field }) => (
          <FormItem>
            <FormLabel>Royalties in %</FormLabel>
            <FormControl>
              <Input
                placeholder="e.g. 10%"
                type="number"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
