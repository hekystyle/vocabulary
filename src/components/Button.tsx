import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export type Theme =
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger"
  | "info";

type NativeButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export interface ButtonProps extends NativeButtonProps {
  /**
   * @default "primary"
   */
  theme?: Theme;
}

export function Button({ theme, children, className, ...rest }: ButtonProps) {
  return (
    <button
      {...rest}
      className={`btn-${theme ?? "primary"} ${className ?? ""}`}
    >
      {children}
    </button>
  );
}
