import { FC } from "react";

type NativeDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type CardProps = NativeDivProps;

export const Card: FC<CardProps> = ({ children, className, ...rest }) => {
  return (
    <div className={"card " + (className ?? "")} {...rest}>
      {children}
    </div>
  );
};
