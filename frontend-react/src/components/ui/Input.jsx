import React from "react";

export const Input = React.forwardRef(({ ...props }, ref) => {
  return (
    <input
      ref={ref}
      className="border px-3 py-2 rounded w-full focus:outline-none focus:ring"
      {...props}
    />
  );
});
