import clsx from "clsx";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  dark?: boolean;
  error?: string[] | undefined;
};
export default function Input({
  label,
  className,
  placeholder = "Enter value",
  type = "text",
  error,
  dark,
  ...rest
}: InputProps) {
  return (
    <div>
      <div
        className={clsx("rounded-md shadow-sm border text-md", {
          "border-white text-white placeholder:text-red-50  hover:bg-white hover:text-indigo-900":
            dark,
          "border-gray-800 text-indigo-900": !dark,
          "border-red-600": error,
        })}
      >
        <input
          className={clsx("bg-transparent  outline-none p-2 w-full", {
            " placeholder:text-white hover:placeholder:text-indigo-200": dark,
            "placeholder:text-red-600": error,
          })}
          type={type}
          placeholder={placeholder}
          {...rest}
        />
      </div>
      {error && <p className="text-red-600 text-xs mt-2 block">{error}</p>}
    </div>
  );
}
