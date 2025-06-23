import { useState } from "react";
import type { ReactNode } from "react";
import styles from "./Tooltip.module.scss";

interface TooltipProps {
  content: string;
  children: ReactNode;
}

function Tooltip({ content, children }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className={styles.tooltip}>
          {content}
          <div className={styles.arrow} />
        </div>
      )}
    </div>
  );
}

export default Tooltip;
