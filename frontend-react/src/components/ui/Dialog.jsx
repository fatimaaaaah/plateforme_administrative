import React, { useState } from "react";

export const DialogContext = React.createContext();

export function Dialog({ open: controlledOpen, onOpenChange, children }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = controlledOpen !== undefined ? controlledOpen : isOpen;
  const setOpen = onOpenChange || setIsOpen;

  return (
    <DialogContext.Provider value={{ open, setOpen }}>
      {children}
    </DialogContext.Provider>
  );
}

export function DialogTrigger({ asChild, children }) {
  const { open, setOpen } = React.useContext(DialogContext);

  const child = React.Children.only(children);

  const handleClick = () => {
    setOpen(!open);
  };

  if (asChild) {
    return React.cloneElement(child, {
      onClick: (e) => {
        if (child.props.onClick) child.props.onClick(e);
        handleClick();
      }
    });
  }

  return (
    <button onClick={handleClick}>
      {children}
    </button>
  );
}

export function DialogContent({ children, className }) {
  const { open, setOpen } = React.useContext(DialogContext);

  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center ${className || ""}`}
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white rounded p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function DialogHeader({ children }) {
  return <div className="mb-4">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h2 className="text-xl font-semibold">{children}</h2>;
}

export function DialogDescription({ children }) {
  return <p className="text-sm text-gray-600">{children}</p>;
}
