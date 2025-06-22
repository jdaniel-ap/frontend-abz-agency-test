import { Button } from "@/ui/atoms";
import Logo from "@/assets/Logo.svg?react";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header} role="banner">
      <Logo className={styles.logo} role="img" aria-label="ABZ Agency Logo" />
      <nav
        className={styles.menu}
        role="navigation"
        aria-label="Main navigation"
      >
        <ul role="menubar">
          <li className={styles.menuItem} role="none">
            <Button role="menuitem" aria-label="View users list" tabIndex={0}>
              Users
            </Button>
          </li>
          <li className={styles.menuItem} role="none">
            <Button
              role="menuitem"
              aria-label="Sign up for new account"
              tabIndex={0}
            >
              Sign up
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
