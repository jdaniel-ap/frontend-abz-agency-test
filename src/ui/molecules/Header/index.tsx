import { Button } from "@/ui/atoms";
import Logo from "@/assets/Logo.svg?react";
import styles from "./Header.module.scss";

function Header() {
  return (
    <header className={styles.header}>
      <Logo className={styles.logo} />
      <menu className={styles.menu}>
        <li className={styles.menuItem}>
          <Button>Users</Button>
        </li>
        <li className={styles.menuItem}>
          <Button>Sign up</Button>
        </li>
      </menu>
    </header>
  );
}

export default Header;
