import classNames from "classnames";
import { Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {};

export default function FormButton({
  children,
  className,
  ...rest
}: ButtonProps) {
  const { pending } = useFormStatus();

  const classes = classNames(
    "px-4 rounded-md flex items-center justify-center gap-2 py-2 hover:bg-rose-800 hover:text-white ring-2 ring-rose-600",
    pending && "disabled:opacity-75",
    className
  );
  return (
    <button className={classes} type="submit" disabled={pending} {...rest}>
      {pending && <Loader size={16} className="animate-spin" />} {children}
    </button>
  );
}
