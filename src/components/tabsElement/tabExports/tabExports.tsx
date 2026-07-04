import Button from "@components/ui/button/button";
import styles from "./tabExports.module.css";
import { useAppSelector } from "@services/hooks";
import { selectAllItems } from "@store/catalog/colorPickerSlice";


const toCssValue = (key: string) => {
  const map: Record<string, string> = {
    text: "color",
    bg: "background-color",
  };
  
  return map[key] ?? key;
};

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Скопировано");
  } catch (error) {
    console.error("Не удалось скопировать", error);
  }
};

export const TabExports = () => {
  const items = useAppSelector(selectAllItems);
  const cssText = items
    .map((item) => {
      const props = Object.entries(item.property)
        .filter(([, value]) => value !== null)
        .map(([prop, value]) => `  ${toCssValue(prop)}: ${value};`)
        .join("\n");

      return `.${item.elem} {\n${props}\n}`;
    })
    .join("\n\n");

console.log(items)

  return (
    <div className={styles.presets}>
      <div className={styles.row}>
        <textarea
          className={styles.textarea}
          readOnly
          id="message"
          name="message"
          value={cssText}
        />
        <div className={styles.actions}>
          <Button onClick={() => { copyToClipboard(cssText) }}>Копировать</Button>
          <Button>Экспорт</Button>
        </div>
      </div>
    </div>
  );
};