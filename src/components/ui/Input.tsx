import classNames from "classnames";
import FormGroup, { FormGroupProps } from "./FormGroup";
import Label from "./Label";
import type { LabelProps } from "./Label";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  labelProps?: LabelProps;
  formGroupProps?: FormGroupProps;
};

export default function Input({
  type = "text",
  label,
  labelProps,
  formGroupProps,
  className,
  placeholder = "Enter value",
  ...rest
}: InputProps) {
  const classes = classNames(
    "py-3 px-2 rounded-md ring-1 text-sm w-full outline-none focus:ring-sky-500 focus:shadow-md",
    className
  );

  return (
    <FormGroup {...formGroupProps}>
      <div>
        {label && <Label {...labelProps}>{label}</Label>}
        <input
          type={type}
          className={classes}
          placeholder={placeholder}
          {...rest}
        />
      </div>
    </FormGroup>
  );
}
