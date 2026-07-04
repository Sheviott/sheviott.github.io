
import { ColorPresets } from "@store/catalog/colorPickerSlice";
import styles from "./presetPreview.module.css";

type PreserProps = {
  onClick: () => void
  colors: ColorPresets;
};

export const PresetPreview = ({ onClick, colors }: PreserProps) => {
  // console.log(colors.design)

  const root = colors.design.find((item) => item.key === "root")?.property;
  const header = colors.design.find((item) => item.key === "header")?.property;
  const main = colors.design.find((item) => item.key === "main")?.property;
  const footer = colors.design.find((item) => item.key === "footer")?.property;

  console.log(root, header, main, footer)
  const wrapperStyle: React.CSSProperties = {
    backgroundColor: root?.bg ?? "#fff",
  };

  const headerStyle: React.CSSProperties = {
    backgroundColor: header?.bg ?? "#fff",
  };

  const mainStyle: React.CSSProperties = {
    backgroundColor: main?.bg ?? "#fff",
  };

  const blockStyle: React.CSSProperties = {
    backgroundColor: main?.blocks ?? "#fff",
  };

  const footerStyle: React.CSSProperties = {
    backgroundColor: footer?.bg ?? "#fff",
  };


  return (
    <button type="button" onClick={onClick}>
      <div className={styles.wrapper} style={wrapperStyle} >
        <div className={styles.header} style={headerStyle} ></div>
        <div className={styles.main} style={mainStyle} >
          <div className={styles.blocks}>
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={styles.block} style={blockStyle} ></div>
            ))}
          </div>
        </div>
        <div className={styles.footer} style={footerStyle} ></div>
      </div>
    </button>
  );
};