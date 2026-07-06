import { ColorPreset } from "@store/catalog/colorPickerSlice";
import styles from "./presetPreview.module.css";

type PresetProps = {
  onClick: () => void;
  colors: ColorPreset;
};

export const PresetPreview = ({ onClick, colors }: PresetProps) => {
  const root = colors.design.find((item) => item.key === "root")?.property;
  const header = colors.design.find((item) => item.key === "header")?.property;
  const main = colors.design.find((item) => item.key === "main")?.property;
  const li = colors.design.find((item) => item.key === "li")?.property;
  const footer = colors.design.find((item) => item.key === "footer")?.property;

  const wrapperStyle: React.CSSProperties = {
    backgroundColor: root?.bg ?? "#fff",
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: header?.bg ?? "#fff",
    color: header?.text ?? "#000",
  };

  const mainStyle: React.CSSProperties = {
    backgroundColor: main?.bg ?? "#fff",
    color: main?.text ?? "#000",
  };

  const liStyle: React.CSSProperties = {
    backgroundColor: li?.bg ?? "#fff",
    color: li?.text ?? "#000",
  };

  const footerStyle: React.CSSProperties = {
    backgroundColor: footer?.bg ?? "#fff",
    color: footer?.text ?? "#000",
  };

  return (
    <button type="button" onClick={onClick}>
      <div className={styles.wrapper} style={wrapperStyle}>
        <div className={styles.header} style={headerStyle}></div>
        <div className={styles.main} style={mainStyle}>
          <div className={styles.blocks}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={styles.block} style={liStyle}></div>
            ))}
          </div>
        </div>
        <div className={styles.footer} style={footerStyle}></div>
      </div>
    </button>
  );
};