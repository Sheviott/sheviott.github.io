import { selectColorsPresets, setColorsPreset } from "@store/catalog/colorPickerSlice";
import styles from "./tabPreset.module.css";
import { useAppDispatch, useAppSelector } from "@services/hooks";
import { PresetPreview } from "@components/presetPreview/presetPreview";

export const TabPresets = () => {
  const colorsPreset = useAppSelector(selectColorsPresets);
  const dispatch = useAppDispatch();
  return (
    <div className={styles.presets}>
      <p className={styles.subtitle}>Готовые пресеты:</p>
      <div className={styles.row}>
        {colorsPreset.map((item) => (
          <PresetPreview key={item.color} colors={item} onClick={() => { dispatch(setColorsPreset(item.color)) }} />
        ))}
      </div>
    </div>
  );
};