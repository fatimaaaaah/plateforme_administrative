import React from "react";

export function Form({ children, ...props }) {
  return <form {...props}>{children}</form>;
}

export function FormField({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function FormItem({ children }) {
  return <div>{children}</div>;
}

export function FormLabel({ children }) {
  return <label className="block mb-1 font-medium">{children}</label>;
}

export function FormControl({ children }) {
  return <div>{children}</div>;
}

export function FormMessage({ children }) {
  return (
    <p className="text-red-600 text-sm mt-1">
      {children || null}
    </p>
  );
}
