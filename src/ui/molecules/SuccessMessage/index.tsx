import { Heading } from "@/ui/atoms";
import SuccessImage from "@/assets/success-image.svg?react";
import styles from "./SuccessMessage.module.scss";

function SuccessMessage() {
  return (
    <div className={styles.container}>
      <Heading>User successfully registered</Heading>
      <div className={styles.imageContainer}>
        <SuccessImage />
      </div>
    </div>
  );
}

export default SuccessMessage;
