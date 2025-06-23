import { Heading } from "@/ui/atoms";
import styles from "./Form.module.scss";

function Form() {
  return (
    <form className={styles.container}>
      <Heading>Working with POST request</Heading>
    </form>
  );
}

export default Form;
