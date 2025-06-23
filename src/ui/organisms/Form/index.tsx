import { Heading } from "@/ui/atoms";
import styles from "./Form.module.scss";
import Input from "@/ui/atoms/Input";

function Form() {
  return (
    <form className={styles.container}>
      <Heading>Working with POST request</Heading>
      <div className={styles.fields}>
        <Input label="Your name" name="name" />
        <Input label="Email" type="email" name="email" />
        <Input
          label="Phone"
          name="phone"
          helperText="+38 (XXX) XXX - XX - XX"
        />
      </div>
    </form>
  );
}

export default Form;
