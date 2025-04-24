import * as React from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className = "", variant = "default", size = "default", ...props },
    ref
  ) => {
    // Base styles
    let buttonStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ";

    // Variant styles
    if (variant === "default") {
      buttonStyles += "bg-black text-white hover:bg-gray-800 ";
    } else if (variant === "destructive") {
      buttonStyles += "bg-red-500 text-white hover:bg-red-600 ";
    } else if (variant === "outline") {
      buttonStyles += "border border-gray-300 bg-white hover:bg-gray-100 ";
    } else if (variant === "secondary") {
      buttonStyles += "bg-gray-200 text-gray-900 hover:bg-gray-300 ";
    } else if (variant === "ghost") {
      buttonStyles += "hover:bg-gray-100 ";
    } else if (variant === "link") {
      buttonStyles += "text-blue-600 underline-offset-4 hover:underline ";
    }

    // Size styles
    if (size === "default") {
      buttonStyles += "h-10 px-4 py-2 ";
    } else if (size === "sm") {
      buttonStyles += "h-9 rounded-md px-3 ";
    } else if (size === "lg") {
      buttonStyles += "h-11 rounded-md px-8 ";
    } else if (size === "icon") {
      buttonStyles += "h-10 w-10 ";
    }

    // Add custom className
    buttonStyles += className;

    return <button className={buttonStyles} ref={ref} {...props} />;
  }
);

Button.displayName = "Button";

export { Button };
