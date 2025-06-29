"use client";

import { useRef } from "react";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { toast } from "sonner";
import { UseFormSetValue } from "react-hook-form";
import { TForm } from "@/screens/user/item-creation/item-creation-screen";

type Props = {
  setValues: UseFormSetValue<TForm>;
};

export const SelectFile = ({ setValues }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-col gap-5 w-full">
      <h4 className="text-lg font-bold">Upload file</h4>
      <Label
        htmlFor="post-creation-input"
        className="border h-[100px] w-full flex items-center justify-between font-light cursor-pointer md:px-8 px-4 rounded-md"
      >
        PNG, JPG, GIF, WEBP or MP4. Max 200mb.
        <Button variant="outline" onClick={() => ref.current?.click()}>
          Upload File
        </Button>
        <input
          id="post-creation-input"
          type="file"
          className="hidden"
          ref={ref}
          accept="image/png, image/jpeg, image/gif, image/webp, video/mp4"
          multiple={false}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file!.size > 200 * 1024 * 1024) {
              toast.error("File size exceeds 200MB limit.");
              return;
            }
            if (file) {
              setValues("image", file);
              setValues("imageUrl", URL.createObjectURL(file));
            }
          }}
        />
      </Label>
    </div>
  );
};
