import Link from "next/link";

export type AuthtitleProps = {
  title?: string;
  subtitle?: string;
  href?: string;
  linkLabel?: string;
};
export default function AuthTitle({
  href = "/login",
  linkLabel = "Login",
  subtitle = "If you already have an account, please",
  title = "Register",
}: AuthtitleProps) {
  return (
    <div className="mb-7">
      <h1 className="text-white text-2xl">{title}</h1>
      <p className="text-sm text-white">
        {subtitle}{" "}
        <Link href={href} className="hover:text-rose-600">
          {linkLabel}
        </Link>
      </p>
    </div>
  );
}
