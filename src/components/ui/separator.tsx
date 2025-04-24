import type * as React from "react";

interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

function Separator({
  className = "",
  orientation = "horizontal",
  decorative = true,
  ...props
}: SeparatorProps) {
  const ariaOrientation = orientation === "vertical" ? "vertical" : undefined;

  const separatorStyles = `shrink-0 bg-gray-200 ${
    orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]"
  } ${className}`;

  return (
    <div
      role={decorative ? "none" : "separator"}
      aria-orientation={ariaOrientation}
      className={separatorStyles}
      {...props}
    />
  );
}

export { Separator };
