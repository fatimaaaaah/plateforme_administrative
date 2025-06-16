import React from "react";
import clsx from "clsx";

export function Badge({ children, variant = "default", className = "" }) {
  const baseStyle =
    "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium";

  const variantStyles = {
    default: "bg-gray-200 text-gray-800",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-800",
    destructive: "bg-red-100 text-red-700",
    outline: "border border-gray-300 text-gray-700",
  };

  return (
    <span className={clsx(baseStyle, variantStyles[variant], className)}>
      {children}
    </span>
  );
}
