"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";
import { Spinner } from "./spinner";

const buttonVariants = cva(
  "h-[46px] px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "relative h-10 overflow-hidden rounded-full border bg-background shadow-xs dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50 border-none outline-none",
        link: "text-primary underline-offset-4",
        contained:
          "not-dark:shadow-sm not-dark:hover:text-white bg-opacity-75 hover:bg-[var(--card-foreground)] bg-[var(--card)] hover:text-[var(--primary)] rounded-full",
      },
      size: {
        default: "h-10 px-6 has-[>svg]:px-4 py-2",
        sm: "h-8 rounded-full gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-full px-6 has-[>svg]:px-4",
        icon: "w-10 h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant,
  size,
  loading,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    loading?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const flairRef = React.useRef<HTMLSpanElement>(null);

  React.useLayoutEffect(() => {
    if (variant !== "outline" || !buttonRef.current) {
      return;
    }

    const button = buttonRef.current;
    const flair = flairRef.current;

    if (!flair) return;

    const xSet = gsap.quickSetter(flair, "x", "px");
    const ySet = gsap.quickSetter(flair, "y", "px");

    const getRelativeXY = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const { x, y } = getRelativeXY(e);
      xSet(x);
      ySet(y);
      gsap.to(flair, { scale: 1, duration: 0.4, ease: "power2.out" });
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const { x, y } = getRelativeXY(e);
      const { width, height } = button.getBoundingClientRect();
      const xPercent = (x / width) * 100;
      const yPercent = (y / height) * 100;

      gsap.killTweensOf(flair);
      gsap.to(flair, {
        x: xPercent > 90 ? x + 20 : xPercent < 10 ? x - 20 : x,
        y: yPercent > 90 ? y + 20 : yPercent < 10 ? y - 20 : y,
        scale: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const { x, y } = getRelativeXY(e);
      gsap.to(flair, { x, y, scale: 1.8, duration: 0.4, ease: "power2" });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mousemove", handleMouseMove);

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mousemove", handleMouseMove);
      gsap.killTweensOf(flair);
    };
  }, [variant]);

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      ref={buttonRef}
      disabled={loading || props.disabled}
    >
      {variant == "outline" ? (
        <>
          <span
            ref={flairRef}
            className="button__flair bottom-0 left-0 right-0 top-0 scale-0 pointer-events-none absolute h-12 rounded-full bg-[var(--theme-primary)] before:aspect-square before:left-0 before:top-0 before:-transform-x-1/2 before:-translate-y-1/2 before:w-[200%]"
          />
          <span className="relative flex items-center justify-center gap-1">
            {children}
          </span>
        </>
      ) : (
        <>
          {children}
          {loading && <Spinner size={"small"} />}
        </>
      )}
    </Comp>
  );
}

export { Button, buttonVariants };
