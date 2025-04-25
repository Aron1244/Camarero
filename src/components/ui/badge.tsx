import * as React from "react";

export interface BadgeProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  as?: "button" | "span";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

const Badge = React.forwardRef<HTMLElement, BadgeProps>(
  (
    {
      className = "",
      variant = "default",
      size = "default",
      as = "button",
      id, // Agregar id como una propiedad
      ...props
    },
    ref
  ) => {
    let baseStyles =
      "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ";

    if (variant === "default") {
      baseStyles += "bg-black text-white hover:bg-gray-800 ";
    } else if (variant === "destructive") {
      baseStyles += "bg-red-500 text-white hover:bg-red-600 ";
    } else if (variant === "outline") {
      baseStyles += "border border-gray-300 bg-white hover:bg-gray-100 ";
    } else if (variant === "secondary") {
      baseStyles += "bg-gray-200 text-gray-900 hover:bg-gray-300 ";
    } else if (variant === "ghost") {
      baseStyles += "hover:bg-gray-100 ";
    } else if (variant === "link") {
      baseStyles += "text-blue-600 underline-offset-4 hover:underline ";
    }

    if (size === "default") {
      baseStyles += "h-10 px-4 py-2 ";
    } else if (size === "sm") {
      baseStyles += "h-9 rounded-md px-3 ";
    } else if (size === "lg") {
      baseStyles += "h-11 rounded-md px-8 ";
    } else if (size === "icon") {
      baseStyles += "h-10 w-10 ";
    }

    const Element = as === "button" && props.onClick ? "span" : as; // Cambiar a "span" si ya hay un onClick

    return (
      <Element
        id={id} // Asignamos el id único
        className={`${baseStyles}${className}`}
        ref={ref as any}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
