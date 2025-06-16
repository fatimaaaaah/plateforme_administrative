import React from "react";

export function Table({ children, className, ...props }) {
  return (
    <table className={`min-w-full divide-y divide-gray-200 ${className || ""}`} {...props}>
      {children}
    </table>
  );
}

export function TableHeader({ children, className }) {
  return (
    <thead className={`bg-gray-50 ${className || ""}`}>
      {children}
    </thead>
  );
}

export function TableBody({ children, className }) {
  return (
    <tbody className={`bg-white divide-y divide-gray-200 ${className || ""}`}>
      {children}
    </tbody>
  );
}

export function TableRow({ children, className }) {
  return (
    <tr className={className || ""}>
      {children}
    </tr>
  );
}

export function TableHead({ children, className }) {
  return (
    <th
      scope="col"
      className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${className || ""}`}
    >
      {children}
    </th>
  );
}

export function TableCell({ children, className }) {
  return (
    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className || ""}`}>
      {children}
    </td>
  );
}
