import { cn } from "@/lib/cn";
import { type VariantProps, cva } from "class-variance-authority";
import { Slot } from "radix-ui";
import type * as React from "react";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap font-medium transition-[color,background-color,border-color,box-shadow,transform] duration-[var(--duration-interaction)] ease-[var(--ease-interaction)] disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-[var(--duration-interaction)] [&_svg]:ease-[var(--ease-interaction)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-accent",
  {
    variants: {
      variant: {
        default:
          "border border-accent bg-accent text-accent-foreground hover:border-accent-hover hover:bg-accent-hover active:translate-y-px",
        outline:
          "border border-line bg-paper-raised text-ink hover:border-line hover:bg-line-soft active:translate-y-px",
        ghost:
          "text-ink-3 hover:bg-ink/[0.06] hover:text-ink active:translate-y-px active:bg-ink/[0.09]",
        link: "text-accent underline-offset-4 hover:text-accent-hover hover:underline",
      },
      size: {
        default: "h-12 gap-2.5 rounded-[2px] px-[21px] text-[15px]",
        sm: "h-11 gap-2 rounded-[2px] px-3 text-sm",
        icon: "size-11 rounded-[var(--radius-control)] p-0",
        "icon-wide":
          "h-11 w-[60px] gap-1.5 rounded-[var(--radius-control)] p-0 text-xs font-semibold tracking-[0.02em]",
        link: "h-11 gap-2.5 rounded-[2px] px-0 text-sm",
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
  variant = "default",
  size = "default",
  asChild = false,
  type,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot.Root : "button";

  return (
    <Comp
      {...props}
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      type={asChild ? undefined : (type ?? "button")}
    />
  );
}

export { Button, buttonVariants };
