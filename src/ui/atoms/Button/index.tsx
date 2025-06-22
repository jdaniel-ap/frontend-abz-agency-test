import { type PropsWithChildren, type ButtonHTMLAttributes } from "react";

interface ButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {}

function Button({ children, ...props }: ButtonProps) {
  return (
    <button className="button-primary" type="button" {...props}>
      {children}
    </button>
  );
}

export default Button;
