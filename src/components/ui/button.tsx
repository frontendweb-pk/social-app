import clsx from "clsx";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  dark?: boolean;
  fullWidth?: boolean;
};
export default function Button({
  className,
  type = "button",
  dark,
  children,
  fullWidth,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={clsx(
        " text-white font-bold py-2 px-4 rounded",
        {
          "bg-indigo-600 hover:bg-indigo-700": !dark,
          "bg-white text-indigo-900 hover:bg-indigo-100": dark,
          "w-full": fullWidth,
        },
        className
      )}
      type={type}
      {...rest}
    >
      {children}
    </button>
  );
}
