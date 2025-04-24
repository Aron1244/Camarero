"use client";

import * as React from "react";

interface ScrollAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  viewportRef?: React.RefObject<HTMLDivElement>;
}

const ScrollArea = React.forwardRef<HTMLDivElement, ScrollAreaProps>(
  ({ className = "", children, viewportRef, ...props }, ref) => {
    const internalViewportRef = React.useRef<HTMLDivElement>(null);
    const resolvedViewportRef = viewportRef || internalViewportRef;

    return (
      <div
        ref={ref}
        className={`relative overflow-hidden ${className}`}
        {...props}
      >
        <div
          ref={resolvedViewportRef}
          className="h-full w-full overflow-auto"
          style={{
            scrollbarWidth: "thin",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
);

ScrollArea.displayName = "ScrollArea";

export { ScrollArea };
