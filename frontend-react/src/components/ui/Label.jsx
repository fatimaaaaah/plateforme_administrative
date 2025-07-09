export const Label = ({ children, htmlFor }) => (
  <label htmlFor={htmlFor} className="block mb-1 font-medium">
    {children}
  </label>
);
