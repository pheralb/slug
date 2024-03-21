import { cn } from "@/utils";
import { forwardRef } from "react";

export const TypographyH1 = forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<"h1">
>(({ className, ...props }, ref) => {
  return (
    <h1
      ref={ref}
      className={cn(
        "mt-6 text-5xl font-bold tracking-tight lg:text-6xl",
        className,
      )}
      {...props}
    />
  );
});

TypographyH1.displayName = "TypographyH1";

export const TypographyH2 = forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<"h2">
>(({ className, ...props }, ref) => {
  return (
    <h2
      ref={ref}
      className={cn(
        "mt-6 text-4xl font-bold tracking-tight lg:text-5xl",
        className,
      )}
      {...props}
    />
  );
});

TypographyH2.displayName = "TypographyH2";

export const TypographyH3 = forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<"h3">
>(({ className, ...props }, ref) => {
  return (
    <h3
      ref={ref}
      className={cn(
        "mt-6 text-3xl font-bold tracking-tight lg:text-4xl",
        className,
      )}
      {...props}
    />
  );
});

TypographyH3.displayName = "TypographyH3";

export const TypographyH4 = forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<"h4">
>(({ className, ...props }, ref) => {
  return (
    <h4
      ref={ref}
      className={cn(
        "mt-2 text-2xl font-semibold tracking-tight lg:text-3xl",
        className,
      )}
      {...props}
    />
  );
});

TypographyH4.displayName = "TypographyH4";

export const TypographyP = forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<"p">
>(({ className, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  );
});

TypographyP.displayName = "TypographyP";
