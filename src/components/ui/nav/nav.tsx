import styles from "./nav.module.css";
import { NavLink } from "react-router-dom";
import { FaList, FaFire } from "react-icons/fa";

import type { IconType } from "react-icons";

type NavItem = {
  label: string;
  path: string;
  icon?: IconType;
};

const navItems: NavItem[] = [
  { label: "Каталог", path: "/catalog", icon: FaList },
  { label: "Страница", path: "/genres", icon: FaFire },
  { label: "Топ", path: "/top" },
  { label: "Новинки", path: "/new" },
  { label: "О нас", path: "/about" },
];

export const Nav = () => {
  return (
        <ul className={styles.ul}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path} className={styles.li}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive ? styles.activeLink : styles.link
                  }
                >
                  {Icon && <Icon className={styles.icon} />}
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
  );
};
