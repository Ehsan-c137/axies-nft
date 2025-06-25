import { Label } from "@ui/label";
import { Input } from "@ui/input";
import { Textarea } from "@/components/ui/textarea";

export function FixedPriceTab() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="flex flex-col gap-3 w-full">
        <Label htmlFor="fixed-price-input" className="w-full text-xl">
          Price
        </Label>
        <Input
          id="fixed-price-input"
          type="number"
          placeholder="Enter price for one item in ETH"
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Label htmlFor="item-name" className="w-full text-xl">
          Title
        </Label>
        <Input
          id="item-name"
          type="text"
          placeholder="Enter item name"
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-3 w-full">
        <Label htmlFor="item-name" className="w-full text-xl">
          Description
        </Label>
        <Textarea
          id="item-description"
          placeholder="e.g. This is a limited item!"
          className="w-full"
        />
      </div>
      <div className="flex flex-wrap">
        <div className="flex flex-col gap-3">
          <Label htmlFor="item-name" className="w-full text-xl">
            Royalties
          </Label>
          <Input
            type="number"
            id="item-description"
            placeholder="eg. 5%"
            className="w-full"
          />
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
