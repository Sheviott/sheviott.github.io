import { useAppSelector } from "@services/hooks";
import { selectApiStatus } from "@store/catalog/colorPickerSlice";
type CheckboxProps = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
};

export const Checkbox = ({ onChange, children } : CheckboxProps)  => {
  const checked = useAppSelector(selectApiStatus);

  return (
    <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <span>{children}</span>
    </label>
  );
};