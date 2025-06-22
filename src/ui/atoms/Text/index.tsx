import { type PropsWithChildren, type HTMLAttributes } from "react";
import styles from "./Text.module.scss";

interface TextProps extends PropsWithChildren, HTMLAttributes<HTMLParagraphElement> {
  variant?: "dark" | "light";
}

function Text({ children, variant = "dark", className, ...props }: TextProps) {
  const textClass = `${styles.text} ${styles[variant]} ${
    className || ""
  }`.trim();

  return <p className={textClass} {...props}>{children}</p>;
}

export default Text;
