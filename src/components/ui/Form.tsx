type FormProps = React.FormHTMLAttributes<HTMLFormElement> & {};
export default function Form({ children, ...rest }: FormProps) {
  return <form {...rest}>{children}</form>;
}
