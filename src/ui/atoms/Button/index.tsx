import { type PropsWithChildren } from "react";

function Button({ children }: PropsWithChildren) {
  return (
    <button className="button-primary" type="button">
      {children}
    </button>
  );
}

export default Button;
