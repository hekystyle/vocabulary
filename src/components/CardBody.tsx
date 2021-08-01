import { FC } from "react";

type NativeDivProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export type CardBodyProps = NativeDivProps;

export const CardBody: FC<CardBodyProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <div className={"card-body " + (className ?? "")} {...rest}>
      {children}
    </div>
  );
};
