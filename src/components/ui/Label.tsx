import classNames from "classnames";
export type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement> & {};
export default function Label({ children, className, ...rest }: LabelProps) {
  const classes = classNames("mb-2", className);

  return (
    <label className={classes} {...rest}>
      {children}
    </label>
  );
}
