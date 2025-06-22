import { Button } from "@/ui/atoms";
import Logo from "@/assets/Logo.svg?react";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header} role="banner">
      <Logo className={styles.logo} role="img" aria-label="ABZ Agency Logo" />
      <nav className={styles.menu} aria-label="Main navigation">
        <ul>
          <li className={styles.menuItem}>
            <Button aria-label="View users list">Users</Button>
          </li>
          <li className={styles.menuItem}>
            <Button aria-label="Sign up for new account">Sign up</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
