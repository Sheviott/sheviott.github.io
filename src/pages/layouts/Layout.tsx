import { Header } from "@components/header/header";
import { Footer } from "@components/footer/footer";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import { ColorPickerUI } from "@components/colorpicker/colorpicker";
import { useAppSelector } from "@services/hooks";
import { selectMainBg, selectMainText, selectLiBg, selectLiText, selectRootBg } from "@store/catalog/colorPickerSlice";

export const Layout = () => {
  const mainBgStyles = useAppSelector(selectMainBg);
  const mainTxStyles = useAppSelector(selectMainText);
  const liBgStyles = useAppSelector(selectLiBg);
  const liTxStyles = useAppSelector(selectLiText);
  const rootBgStyles = useAppSelector(selectRootBg);
  
  const mainStyle = {
  "--root-bg": rootBgStyles,
  "--main-text": mainTxStyles,
  "--main-bg": mainBgStyles,
  "--li-bg": liBgStyles,
  "--li-text": liTxStyles,
  } as React.CSSProperties

  return (
    <>
      <div className={styles.wrapper} style={mainStyle}>
        <div className={styles.colorPicker}>
          <ColorPickerUI />
        </div>

        <div className={styles.mainblock}>
          <Header />
          <main className={styles.main} >
            <div className={styles.outlet}>
            <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};
