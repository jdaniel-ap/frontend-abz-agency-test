import { useLayoutEffect, useState } from "react";
import { Button, Heading, Text } from "@/ui/atoms";
import styles from "./Hero.module.scss";

function Hero() {
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
        <Heading variant="light">
          Test assignment for front-end developer
        </Heading>
        <Text variant="light">
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </Text>
        <Button>Sign up</Button>
      </div>
    </section>
  );
}

export default Hero;
