import { Header } from "@components/layout/header/header";
import { Footer } from "@components/layout/footer/footer";
import { Outlet } from "react-router-dom";
import styles from "./layout.module.css";
import { ColorPickerUI } from "@components/colorpicker/colorpicker";
import { useAppSelector } from "@services/hooks";
import { selectMainBg, selectMainText, selectMainBlocks, selectRootBg } from "@store/catalog/colorPickerSlice";
import { CSSProperties } from "react";

export const Layout = () => {

  const mainBgStyles = useAppSelector(selectMainBg);
  const mainTxStyles = useAppSelector(selectMainText);
  const mainBlStyles = useAppSelector(selectMainBlocks);
  const rootBgStyles = useAppSelector(selectRootBg);
  
  const mainStyle: CSSProperties = {
    backgroundColor: mainBgStyles || 'var(--bg-primary, #f8fafc)',
    color: mainTxStyles || 'var(--text-primary, #0f172a)',
    transition: 'all 0.2s ease',
  };
  const rootStyle: CSSProperties = {
    backgroundColor: rootBgStyles || 'var(--bg-primary, #f8fafc)',
    transition: 'all 0.2s ease',
  };
// ? подумать как зменить переменную
  const innerStyle = {
    '--bg': mainBlStyles || 'var(--card-bg, #ffffff)',
    padding: 'var(--spacing-4, 16px)',
    borderRadius: 'var(--radius-lg, 12px)',
    minHeight: '400px',
  } as CSSProperties;
  
  return (
    <>
      <div className={styles.wrapper} style={rootStyle}>
        
        <div className={styles.colorPicker}>
          <ColorPickerUI />
        </div>

        <div className={styles.mainblock}>
          <Header />
          <main className={styles.main} style={mainStyle}>
            <div className={styles.block} style={innerStyle} >
            <Outlet />
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};
