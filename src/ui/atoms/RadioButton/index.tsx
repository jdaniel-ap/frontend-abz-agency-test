import React from "react";
import styles from "./RadioButton.module.scss";

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value: string;
}

function RadioButton({ label, name, value, id, ...props }: RadioButtonProps) {
  const radioId = id || `radio-${name}-${value}`;

  return (
    <label className={styles.container} htmlFor={radioId}>
      <input
        type="radio"
        id={radioId}
        name={name}
        value={value}
        className={styles.input}
        {...props}
      />
      <span className={styles.checkmark}></span>
      <span className={styles.label}>{label}</span>
    </label>
  );
}

export default RadioButton;
