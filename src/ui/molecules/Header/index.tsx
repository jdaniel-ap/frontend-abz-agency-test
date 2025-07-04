import { Button } from "@/ui/atoms";
import Logo from "@/assets/Logo.svg?react";
import styles from "./Header.module.scss";
import { useTranslation } from "react-i18next";
import { scrollToElement } from "@/utils/scroll";

function Header() {
  const { t } = useTranslation();

  const handleUsersClick = () => {
    scrollToElement("users");
  };

  const handleSignUpClick = () => {
    scrollToElement("signup");
  };

  return (
    <header className={styles.container}>
      <section className={styles.header} role="banner">
        <Logo
          className={styles.logo}
          role="img"
          aria-label={t("header.logoAlt")}
        />
        <nav className={styles.menu} aria-label={t("header.navigation")}>
          <ul className={styles.menuList}>
            <li className={styles.menuItem}>
              <Button
                aria-label={t("header.usersButtonAria")}
                onClick={handleUsersClick}
              >
                {t("header.usersButton")}
              </Button>
            </li>
            <li className={styles.menuItem}>
              <Button
                aria-label={t("header.signUpButtonAria")}
                onClick={handleSignUpClick}
              >
                {t("header.signUpButton")}
              </Button>
            </li>
          </ul>
        </nav>
      </section>
    </header>
  );
}

export default Header;
