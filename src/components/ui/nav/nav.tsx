import { NavItem } from "@components/header/header";
import styles from "./nav.module.css";
import { NavLink } from "react-router-dom";

type NavProps = {
  nav: NavItem[];
};

export const Nav = ({nav}: NavProps) => {
  return (
        <ul className={styles.ul}>
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.label} className={styles.li}>
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
