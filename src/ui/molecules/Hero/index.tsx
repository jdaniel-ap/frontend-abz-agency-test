import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Heading, Text } from "@/ui/atoms";
import styles from "./Hero.module.scss";

function Hero() {
  const { t } = useTranslation();
  const [imageLoaded, setImageLoaded] = useState(false);

  useLayoutEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageLoaded(true);
    };
    img.src = "/src/assets/pexels-alexandr-podvalny-1227513-hd.jpeg";
  }, []);

  return (
    <section
      className={`${styles.hero} ${imageLoaded ? styles["hero--loaded"] : ""}`}
    >
      <div className={styles.hero__content}>
        <Heading variant="light">{t("hero.title")}</Heading>
        <Text variant="light">{t("hero.description")}</Text>
        <Button>{t("hero.button")}</Button>
      </div>
    </section>
  );
}

export default Hero;
