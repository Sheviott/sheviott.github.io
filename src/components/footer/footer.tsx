import { useAppSelector } from "@services/hooks";
import styles from "./footer.module.css";
import { selectFooterBg, selectFooterText } from "@store/catalog/colorPickerSlice";

export const Footer = () => {
  const footerBgStyles = useAppSelector(selectFooterBg);
  const footerTxStyles = useAppSelector(selectFooterText);

  const footerStyle = {
    "--footer-text": footerTxStyles,
    "--footer-bg": footerBgStyles,
  } as React.CSSProperties
  
  return (
    <footer className={styles.footer} style={footerStyle}>
      <div className={styles.nav}>
        <p>2026</p>
      </div>
    </footer>
  );
};
