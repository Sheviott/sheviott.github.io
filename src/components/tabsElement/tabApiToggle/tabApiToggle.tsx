import { Checkbox } from "@components/ui/checkbox/checkbox";
import styles from "./tabApiToggle.module.css";
import { useAppDispatch } from "@services/hooks";
import { setApiStatus } from "@store/catalog/colorPickerSlice";

export const TabApiToggle = () => {
    const dispatch = useAppDispatch();
  return (
    <div className={styles.wrapper}>
      <Checkbox
        onChange={() => {
          dispatch(setApiStatus());
        }}
      />
    </div>
  );
};