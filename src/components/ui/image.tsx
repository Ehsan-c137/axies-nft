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
  const { srcLight, srcDark, alt, ...rest } = props;
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const src = resolvedTheme === "light" ? srcLight : srcDark;

  if (!isMounted) {
    return <span className="animate-pulse h-10">{alt}</span>;
  }

  return (
    <Image src={src} alt={alt} loading="lazy" priority={false} {...rest} />
  );
}
