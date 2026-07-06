import { addColorsPreset, selectAllItems, selectColorsPresets, setColorsPreset } from "@store/catalog/colorPickerSlice";
import styles from "./tabPreset.module.css";
import { useAppDispatch, useAppSelector } from "@services/hooks";
import { PresetPreview } from "@components/presetPreview/presetPreview";
import Button from "@components/ui/button/button";

export const TabPresets = () => {
const items = useAppSelector(selectAllItems);
  const colorsPreset = useAppSelector(selectColorsPresets);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.presets}>
      <Button onClick={() => {dispatch(addColorsPreset(items))}}>Добавить пресет</Button>
      <div className={styles.row}>
        {colorsPreset.map((item) => (
          <PresetPreview key={item.id} colors={item} onClick={() => { dispatch(setColorsPreset(item.id)) }} />
        ))}
      </div>
    </div>
  );
};