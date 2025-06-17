import React from "react";

export const Button = React.forwardRef(({ children, className = "", asChild = false, ...props }, ref) => {
  // asChild : si true, on passe les props au 1er enfant (ex: Link), sinon bouton classique
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      className: `inline-flex items-center justify-center px-4 py-2 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${className}`,
      ...props,
    });
  }

  return (
    <button
      ref={ref}
      className={`inline-flex items-center justify-center px-4 py-2 font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
