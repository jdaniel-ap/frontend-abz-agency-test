import { Heading, Text } from "@/ui/atoms";
import styles from "./Hero.module.scss";

function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
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
      </div>
    </section>
  );
}

export default Hero;
