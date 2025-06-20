"use client";

import Image from "next/image";
import type { ImageProps } from "next/image";
import { useTheme } from "@/context/theme/theme-context";
import { useEffect, useState } from "react";

type Props = Omit<ImageProps, "src" | "priority" | "loading"> & {
  srcLight: string;
  srcDark: string;
};

export function ThemedImage(props: Props) {
  const [isMounted, setIsMounted] = useState(false);
  const { srcLight, srcDark, ...rest } = props;
  const { resolvedTheme } = useTheme();
  let src;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  switch (resolvedTheme) {
    case "light":
      src = srcLight;
      break;
    case "dark":
      src = srcDark;
      break;
    default:
      src = srcDark;
      break;
  }

  if (!isMounted) {
    return <span className="sr-only h-10">{rest?.alt}</span>;
  }

  return <Image src={src} loading="lazy" priority={false} {...rest} />;
}
