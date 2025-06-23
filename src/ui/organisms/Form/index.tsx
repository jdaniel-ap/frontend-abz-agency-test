import { Heading } from "@/ui/atoms";
import styles from "./Form.module.scss";
import Input from "@/ui/atoms/Input";

function Form() {
  return (
    <form className={styles.container}>
      <Heading>Working with POST request</Heading>
      <Input label="Your name" />
      <Input label="Email" type="email" error="Invalid email" />
      <Input label="Phone number" variant="filled" />
    </form>
  );
}

export default Form;
