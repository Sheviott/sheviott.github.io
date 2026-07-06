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
    { label: "Каталог", path: "/catalog", icon: FaList },
    { label: "Страница", path: "/page", icon: FaFire },
    { label: "Топ", path: "/" },
    { label: "Новинки", path: "/" },
    { label: "О нас", path: "/" },
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
