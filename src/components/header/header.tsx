// import { Logo }  from "@components/ui/logo/logo";
import { Nav } from "@components/ui/nav/nav";
import styles from "./header.module.css";
import { selectHeaderBg, selectHeaderText } from "@store/catalog/colorPickerSlice";
import { useAppSelector } from "@services/hooks";
import type { IconType } from "react-icons";
import { FaList, FaFire } from "react-icons/fa";

export type NavItem = {
    label: string;
    path: string;
    icon?: IconType;
  };

export const Header = () => {
  const headerBgStyles = useAppSelector(selectHeaderBg);
  const headerTxStyles = useAppSelector(selectHeaderText);

  const headerStyle = {
    "--header-text": headerTxStyles,
    "--header-bg": headerBgStyles,
  } as React.CSSProperties


  const navItems: NavItem[] = [
    { label: "Каталог", path: "/", icon: FaList },
    { label: "Блог", path: "/blog", icon: FaFire },
    { label: "Страница с котиком", path: "/cat", icon: FaFire },
  ];

  return (
    <header className={styles.header} style={headerStyle}>
      <nav className={styles.nav}>
        {/* <Logo /> */}
        <Nav nav={navItems} />
        <div className={styles.actions}>
          <div>
            <a>Закладки</a>
          </div>
          <div>
            <a>Войти</a>
          </div>
        </div>
      </nav>
    </header>
  );
};
