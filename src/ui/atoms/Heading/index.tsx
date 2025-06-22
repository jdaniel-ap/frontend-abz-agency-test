import { type PropsWithChildren, type HTMLAttributes } from "react";
import styles from "./Heading.module.scss";

interface HeadingProps
  extends PropsWithChildren,
    HTMLAttributes<HTMLHeadingElement> {
  variant?: "dark" | "light";
}

function Heading({
  children,
  variant = "dark",
  className,
  ...props
}: HeadingProps) {
  const headingClass = `${styles.heading} ${styles[variant]} ${
    className || ""
  }`.trim();

  return (
    <h1 className={headingClass} {...props}>
      {children}
    </h1>
  );
}

export default Heading;
