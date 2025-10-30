import * as React from "react";

import { cn } from "@/lib/utils";

export const Button = ({ className, ...props }: React.ComponentProps<"button">) => (
  <button
    data-slot="button"
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
      "bg-primary text-primary-foreground shadow h-9 px-4 py-2",
      className
    )}
    {...props}
  />
);
