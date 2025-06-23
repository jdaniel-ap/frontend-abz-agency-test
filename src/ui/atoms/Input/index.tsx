import React, { forwardRef } from "react";
import styles from "./Input.module.scss";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  variant?: "normal" | "filled" | "error";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, error, helperText, variant = "normal", className, id, ...props },
    ref
  ) => {
    const inputVariant = error ? "error" : variant;
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return (
      <div className={`${styles.container} ${className || ""}`}>
        <div className={`${styles.inputWrapper} ${styles[inputVariant]}`}>
          <input
            ref={ref}
            id={inputId}
            className={styles.input}
            placeholder=" "
            {...props}
          />
          {label && (
            <label className={styles.floatingLabel} htmlFor={inputId}>
              {label}
            </label>
          )}
        </div>
        {(error || helperText) && (
          <div
            className={`${styles.helperText} ${error ? styles.errorText : ""}`}
          >
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
