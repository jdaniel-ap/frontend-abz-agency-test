import { Heading } from "@/ui/atoms";
import SuccessImage from "@/assets/success-image.svg?react";
import styles from "./SuccessMessage.module.scss";
import { useTranslation } from "react-i18next";

function SuccessMessage() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Heading>{t("success.title")}</Heading>
      <div className={styles.imageContainer}>
        <SuccessImage />
      </div>
    </div>
  );
}

export default SuccessMessage;
