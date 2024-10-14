import classNames from "classnames";
export type FormGroupProps = React.HtmlHTMLAttributes<HTMLDivElement> & {};
export default function FormGroup({
  children,
  className,
  ...rest
}: FormGroupProps) {
  const classes = classNames("mb-2", className);

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
}
