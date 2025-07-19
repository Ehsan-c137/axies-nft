"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@ui/button";
import { SelectFile } from "@/modules/item/forms/item-creation/select-file";
import ItemCreationPreview from "./item-creation-preview";
import MethodsView from "./methods/methods-view";

const formSchema = z.object({
  creator: z.string().min(3, "Creator is required"),
  price: z.number().min(0, "Price must be a positive number"),
  title: z.string().min(3, "Title is required"),
  description: z.string().min(3, "Description is required"),
  image: z
    .any()
    .refine((file) => !!file, "Image is required.")
    .refine(
      (file) => file?.size <= 200 * 1024 * 1024,
      "Max image size is 200MB.",
    ),
  imageUrl: z.string().url("Image URL must be a valid URL").optional(),
  royalties: z
    .number()
    .min(0, "Royalties must be a positive number")
    .max(100, "Royalties cannot exceed 100%"),
});

export type TForm = z.infer<typeof formSchema>;

export default function ItemCreationScreen() {
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    mode: "all",
    defaultValues: {
      price: 0,
      title: "",
      description: "",
      royalties: 0,
      creator: "",
      image: null,
      imageUrl: undefined,
    },
  });

  const { handleSubmit, watch } = form;

  const onSubmit = (values: TForm) => {
    console.log(values);
  };

  return (
    <section className="mx-auto container flex flex-col md:flex-row md:gap-10 gap-6">
      <ItemCreationPreview
        title={watch("title")}
        creator={watch("creator")}
        price={watch("price")}
        timeLeft={"5 : 23 : 22 : 08"}
        imageUrl={watch("imageUrl")}
      />
      <div className="flex flex-col gap-5 w-full">
        <SelectFile setValues={form.setValue} />
        <MethodsView form={form} />
        <div className="flex w-full justify-end">
          <Button
            variant="contained"
            onClick={handleSubmit(onSubmit)}
            disabled={!form.formState.isValid}
            aria-disabled={!form.formState.isValid}
          >
            Create Item
          </Button>
        </div>
      </div>
    </section>
  );
}
