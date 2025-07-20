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

const MAX_FILE_SIZE_MB = 10;

export const SelectFile = ({ setValues }: Props) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files[0];
    if (!files) {
      return;
    }
    setValues("image", files);
    setValues("imageUrl", URL.createObjectURL(files));
  };

  return (
    <div className="flex flex-col gap-5 w-full">
      <h4 className="text-lg font-bold">Upload file</h4>
      <Label
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        htmlFor="post-creation-input"
        className="border h-[100px] w-full flex items-center justify-between font-light cursor-pointer md:px-8 px-4 rounded-md"
      >
        PNG, JPG, GIF, WEBP. Max 10mb.
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
            if (!file) {
              return;
            }

            const maxFileSizeInBytes = MAX_FILE_SIZE_MB * 1024 * 1024;
            if (file.size > maxFileSizeInBytes) {
              toast.error("File size exceeds 10MB limit.");
              if (ref.current) {
                setValues("image", null);
                setValues("imageUrl", "");
                ref.current.value = "";
              }
              return;
            }

            setValues("image", file);
            setValues("imageUrl", URL.createObjectURL(file));
          }}
        />
      </Label>
    </div>
  );
};
