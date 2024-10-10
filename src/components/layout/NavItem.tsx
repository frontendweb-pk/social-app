"use client";
import Link, { LinkProps } from "next/link";
import { usePathname } from "next/navigation";

type NavItemProps = LinkProps &
  React.LinkHTMLAttributes<HTMLAnchorElement> & {};
export default function NavItem({ href, children, ...rest }: NavItemProps) {
  const pathname = usePathname();

  return (
    <Link href={href} {...rest} className={pathname == href ? "active" : ""}>
      {children}
    </Link>
  );
}
