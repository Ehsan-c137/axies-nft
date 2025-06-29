import { Label } from "@ui/label";
import { Input } from "@ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FixedPriceForm } from "@/modules/item/forms/item-creation/fixed-price-form";

export function FixedPriceTab() {
  return (
    <div className="flex flex-col gap-5 w-full">
      <FixedPriceForm />
    </div>
  );
}
