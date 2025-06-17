// Select.jsx
export const Select = ({ children, ...props }) => (
  <select {...props} className="border px-3 py-2 rounded w-full">
    {children}
  </select>
);

export const SelectItem = ({ children, value }) => (
  <option value={value}>{children}</option>
);

// Ajouts compatibles :

export const SelectTrigger = ({ children }) => (
  <div className="border px-3 py-2 rounded bg-white cursor-pointer">
    {children}
  </div>
);

export const SelectValue = ({ value }) => (
  <span className="text-gray-700">{value}</span>
);

export const SelectContent = ({ children }) => (
  <div className="border rounded mt-1 shadow-md bg-white">
    {children}
  </div>
);
