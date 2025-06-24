"use client";

import Image from "next/image";
import { Button } from "@ui/button";
import { Label } from "@ui/label";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";
import { useRef } from "react";

export default function Profile() {
  return (
    <div className="flex flex-wrap gap-8 mx-auto container py-10 px-4">
      <ProfileImage />
      <div className="flex-1/4 flex flex-col gap-4">
        <CoverImage />
        <div className="flex">
          <AccountInfo />
        </div>
        <Button variant="outline" className="w-fit">
          Update profile
        </Button>
      </div>
    </div>
  );
}

const ProfileImage = () => {
  return (
    <div className="max-h-[460px] p-4 flex flex-col gap-4 bg-[var(--card)] rounded-2xl not-dark:shadow-sm">
      <div className="w-full h-full relative">
        <Image
          src="/assets/Rectangle.png"
          alt="avatar"
          unoptimized
          width={0}
          height={0}
          className="w-full h-full top-0 left-0 object-cover rounded-2xl"
        />
      </div>
      <Button variant="outline">Upload new photo</Button>
      <Button variant="outline" className="hover:bg-[var(--destructive)]">
        Delete
      </Button>
    </div>
  );
};

const CoverImage = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ImageSrc = ["/assets/bg-profile.webp", "/assets/bg-profile.webp"];
  return (
    <section>
      <h4 className="text-xl font-semibold mb-4">Choose your cover image</h4>
      <div className="flex flex-wrap gap-4">
        <Label
          htmlFor="fileInput"
          className="h-[100px] border-1 rounded-lg flex items-center justify-center cursor-pointer min-w-[345px]"
        >
          <Input
            ref={fileInputRef}
            id="fileInput"
            type="file"
            className="w-[152px] rounded-full border-2 hidden"
            accept="image/png, image/jpeg"
            placeholder="Upload file"
          />
          <Button
            variant="outline"
            className="w-[152px]"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload file
          </Button>
        </Label>

        {ImageSrc.map((src, index) => (
          <Label
            key={index}
            className={`bg-[url(${src})] rounded-lg min-h-10 w-[345px] relative`}
          >
            <Image
              src={src}
              alt="avatar"
              unoptimized
              width={0}
              height={0}
              className="h-full top-0 left-0 object-cover rounded-2xl"
            />
          </Label>
        ))}
      </div>
    </section>
  );
};

const AccountInfo = () => {
  return (
    <div className="flex flex-col gap-4 flex-1 max-w-[460px]">
      <h4 className="text-xl font-semibold">Account Info</h4>
      <div className="flex flex-col gap-4 font-medium">
        <Label htmlFor="displayname" className="font-medium">
          Display Name
        </Label>
        <Input id="displayname" placeholder="Enter your display name" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="customurl" className="font-medium">
          Custom URL
        </Label>
        <Input id="customurl" placeholder="Enter your custom URL" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="email" className="font-medium">
          Email
        </Label>
        <Input id="email" placeholder="Enter your email" />
      </div>
      <div className="flex flex-col gap-2">
        <Label htmlFor="bio" className="font-medium">
          Bio
        </Label>
        <Textarea id="bio" placeholder="Enter your bio" />
      </div>
    </div>
  );
};
