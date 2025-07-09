export const Checkbox = ({ label, ...props }) => (
  <label className="flex items-center gap-2">
    <input type="checkbox" {...props} />
    {label}
  </label>
);
